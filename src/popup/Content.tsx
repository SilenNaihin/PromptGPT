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

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

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
      <PromptInputs
        title={title}
        setTitle={setTitle}
        prompt={prompt}
        setPrompt={setPrompt}
        handleButtonClick={handleButtonClick}
      />
      <AddPromptButton onClick={handleButtonClick}>Add</AddPromptButton>
      {prompts.length ? (
        <PromptContainer>
          {prompts.map((prompt, index) => (
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
      ) : (
        <NoPrompts>No prompts yet, add one!</NoPrompts>
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

interface ErrorProps {
  error: string;
}

const NoPrompts = tw.div`
  text-center
  text-gray-500
  py-6
  font-medium
`;
// bg-gradient-to-br from-teal-400 to-blue-500
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
