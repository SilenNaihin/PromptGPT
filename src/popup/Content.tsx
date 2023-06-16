import React, { useEffect, useState } from 'react';
import Prompt, { PromptProps } from './Prompt';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import tw from 'tailwind-styled-components';

import PromptInputs from './PromptInputs';

const Content: React.FC = () => {
  const [prompts, setPrompts] = useState<PromptProps[]>([]);

  const [title, setTitle] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Attempt to load the prompts from storage
    chrome.storage.local.get(['prompts'], function (result) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        setError('Error retrieving the prompts');
        return;
      }

      if ('prompts' in result) {
        // The 'prompts' key exists in the storage, use the stored value
        setPrompts(result.prompts);
      } else {
        // The 'prompts' key does not exist, create it
        chrome.storage.local.set({ prompts: [] }, function () {
          console.log('Prompts key is created');
        });
      }

      setIsLoaded(true);
    });
  }, []);

  const handleButtonClick = () => {
    if (!title || !prompt) {
      console.log('Title or prompt is empty');
      setError('Please enter a title *and* a prompt');
      return;
    }

    // Check if the prompt already exists based on its title
    const promptExists = prompts.some((p) => p.title === title);

    if (promptExists) {
      toast.error('This prompt already exists!');
      return;
    }

    const newPrompt: PromptProps = {
      prompt: prompt,
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString(),
      title: title,
    };

    const updatedPrompts = [...prompts, newPrompt];

    chrome.storage.local.set({ prompts: updatedPrompts }, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        setError('Error adding the prompt');
        return;
      }
      setPrompts(updatedPrompts);
      setTitle('');
      setPrompt('');
      setError('');
    });

    toast.success('Prompt successfully added!');
    setDropdownOpen(false);
  };

  const handleRemovePrompt = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    const updatedPrompts = prompts.filter((_, i) => i !== index);

    chrome.storage.local.set({ prompts: updatedPrompts }, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        setError('Error removing the prompt');
        return;
      }

      setPrompts(updatedPrompts);
    });

    toast.success('Prompt successfully removed!');
  };

  const handleEditPrompt = (
    index: number,
    newTitle: string,
    newPrompt: string
  ) => {
    const promptsCopy = [...prompts];
    promptsCopy[index].dateUpdated = new Date().toISOString();
    promptsCopy[index].prompt = newPrompt;
    promptsCopy[index].title = newTitle;

    chrome.storage.local.set({ prompts: promptsCopy }, () => {
      console.log('Prompt has been edited');

      setPrompts(promptsCopy);
    });

    toast.success('Prompt successfully edited!');
  };

  useEffect(() => {
    if (!error && !error.length) return;
    toast.error(error);
    setError('');
  }, [error]);

  if (!isLoaded) {
    return <div>{error || 'Loading...'}</div>;
  }

  return (
    <>
      {isDropdownOpen || !prompts.length ? (
        <>
          <PromptInputs
            title={title}
            setTitle={setTitle}
            prompt={prompt}
            setPrompt={setPrompt}
            handleButtonClick={handleButtonClick}
          />
          <AddPromptButton onClick={handleButtonClick}>
            {prompts.length ? 'Add' : 'Add to get started'}
          </AddPromptButton>
        </>
      ) : (
        <AddPromptButton onClick={() => setDropdownOpen(true)}>
          Add prompt
        </AddPromptButton>
      )}

      {prompts.length ? (
        <>
          <SearchInput
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title..."
          />
          <PromptContainer>
            {prompts
              .filter((prompt) =>
                prompt.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((prompt, index) => (
                <Prompt
                  key={index}
                  onRemove={handleRemovePrompt}
                  handleEdit={handleEditPrompt}
                  index={index}
                  handleButtonClick={handleButtonClick}
                  {...prompt}
                />
              ))}
          </PromptContainer>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Content;

const PromptContainer = tw.div`
  flex
  flex-col
  items-center
  justify-center
  w-full
`;

const SearchInput = tw.input`
  w-full
  py-1
  px-4
  rounded-xl
  border
  mt-2
`;

export const AddPromptButton = tw.button`
  bg-gradient-to-br from-purple-400 to-pink-500
  mr-auto
  py-1
  px-3
  rounded-xl
  mt-2
  w-full
  font-medium
  text-white
`;
