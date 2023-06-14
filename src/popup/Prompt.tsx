import React from 'react';
import tw from 'tailwind-styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCopy, faGear } from '@fortawesome/free-solid-svg-icons';

import PromptInputs, { AddPromptButton } from './PromptInputs';

export interface PromptProps {
  title: string;
  prompt: string;
  dateCreated: string;
  dateUpdated: string;
}

interface PromptBoxProps extends PromptProps {
  onRemove: () => void;
  handleEdit: (index: number, newTitle: string, newPrompt: string) => void;
  handleButtonClick: () => void;
  index: number;
}

const Prompt: React.FC<PromptBoxProps> = ({
  title,
  prompt,
  dateCreated,
  dateUpdated,
  onRemove,
  handleEdit,
  handleButtonClick,
  index,
}) => {
  const [newTitle, setNewTitle] = React.useState<string>(title);
  const [newPrompt, setNewPrompt] = React.useState<string>(prompt);
  const [isEditing, setEditing] = React.useState<boolean>(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(prompt);
  };

  const handleOpenAIPaste = () => {
    chrome.runtime.sendMessage({
      action: 'executeScript',
      prompt: JSON.stringify(prompt),
    });
  };

  return (
    <PromptBox onClick={handleOpenAIPaste}>
      {isEditing ? (
        <>
          <PromptInputs
            title={newTitle}
            setTitle={setNewTitle}
            prompt={newPrompt}
            setPrompt={setNewPrompt}
            handleButtonClick={handleButtonClick}
            isEditing={isEditing}
          />
          <AddPromptButton
            onClick={() => {
              handleEdit(index, newTitle, newPrompt);
              setEditing(false);
            }}
          >
            Done
          </AddPromptButton>
        </>
      ) : (
        <>
          <Top>
            <Title>{title}</Title>
            <ClickFAWrapper icon={faXmark} onClick={onRemove} />
          </Top>
          <PromptText>{prompt}</PromptText>
          <Bottom>
            <ClickFAWrapper icon={faGear} onClick={() => setEditing(true)} />
            <ClickFAWrapper icon={faCopy} onClick={(e) => handleCopy(e)} />
          </Bottom>
        </>
      )}
    </PromptBox>
  );
};

export default Prompt;

const PromptBox = tw.div`
  px-2
  py-1
  mt-2
  max-h-22
  border
  rounded-xl
  w-full
  cursor-pointer
`;

const Top = tw.div`
  flex
  justify-between
  items-center
`;

const Title = tw.h2`
  text-lg
  font-medium
`;

const PromptText = tw.p`
  text-gray-600
`;

const ClickFAWrapper = tw(FontAwesomeIcon)`
  cursor-pointer
`;

const Bottom = tw.div`
  flex
  justify-between
  items-center
  py-2
`;
