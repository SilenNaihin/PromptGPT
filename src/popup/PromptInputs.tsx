import React from 'react';
import tw from 'tailwind-styled-components';

interface PromptInputsProps {
  title: string;
  prompt: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  handleButtonClick: () => void;
}

const PromptInputs: React.FC<PromptInputsProps> = ({
  title,
  prompt,
  setTitle,
  setPrompt,
  handleButtonClick,
}) => {
  const pressedEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleButtonClick();
    }
  };

  return (
    <>
      <TitleInput
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title"
        onKeyDown={(e) => pressedEnter(e)}
      />
      <PromptArea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt"
        onKeyDown={(e) => pressedEnter(e)}
      />
    </>
  );
};

export default PromptInputs;

const TitleInput = tw.input`
  w-full
  py-1
  px-2
  border
  my-2
  rounded-xl
`;

const PromptArea = tw.textarea`
  w-full
  py-1
  px-2
  resize-none
  border
  rounded-xl
  h-24
`;
