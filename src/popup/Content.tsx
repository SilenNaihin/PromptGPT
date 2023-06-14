import React, { useEffect, useState } from 'react';
import Prompt, { PromptProps } from './Prompt';
import tw from 'tailwind-styled-components';

import PromptInputs from './PromptInputs';

const Content: React.FC = () => {
  const [prompts, setPrompts] = useState<PromptProps[]>([]);

  const [title, setTitle] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [error, setError] = useState<string>('');

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    // Attempt to load the prompts from storage
    chrome.storage.local.get(['prompts'], function (result) {
      if (chrome.runtime.lastError) {
        // An error occurred
        console.error(chrome.runtime.lastError);
        setError('There was an error retrieving the prompts');
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
      console.log('Prompt is added');
      // You can also update the state immediately to reflect changes
      setPrompts(updatedPrompts);
      // Clear the input fields after adding
      setTitle('');
      setPrompt('');
      setError('');
    });
  };

  const handleRemovePrompt = (index: number) => {
    const updatedPrompts = prompts.filter((_, i) => i !== index);

    chrome.storage.local.set({ prompts: updatedPrompts }, () => {
      console.log('Prompt is removed');
      // Update the state immediately to reflect changes
      setPrompts(updatedPrompts);
    });
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
  };

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
      <Error error={error}>{error}</Error>
      {prompts ? (
        <PromptContainer>
          {prompts.map((prompt, index) => (
            <Prompt
              key={index}
              onRemove={() => handleRemovePrompt(index)}
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

const Error = tw.div<ErrorProps>`
  text-red-500
  display: ${(props) => (props.error ? 'block' : 'none')};
`;

const NoPrompts = tw.div`
  text-center
  text-gray-500
  text-xl
  font-medium
`;
