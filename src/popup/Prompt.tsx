import React from 'react';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';

import tw from 'tailwind-styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCopy, faGear } from '@fortawesome/free-solid-svg-icons';

import PromptInputs from './PromptInputs';
import { AddPromptButton } from './Content';

export interface PromptProps {
  title: string;
  prompt: string;
  dateCreated: string;
  dateUpdated: string;
}

interface PromptBoxProps extends PromptProps {
  onRemove: (e: React.MouseEvent, index: number) => void;
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

    toast.success('Copied prompt to clipboard!');
  };

  const handleOpenAIPaste = () => {
    if (isEditing) return;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];

      if (currentTab && currentTab.url?.includes('chat.openai.com')) {
        console.log(prompt);
        chrome.runtime.sendMessage(
          {
            action: 'executeScript',
            prompt: prompt,
          },
          (response) => {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError.message);
              // Maybe show an error toast here
            } else {
              // Check response for success, it depends on how your background script handles this
              if (response.success) {
                toast.success('Prompt pasted successfully!');
              } else {
                // Maybe show an error toast here, if the background script reports an error
              }
            }
          }
        );
      } else {
        toast.error('Cannot paste prompt, please navigate to chat.openai.com');
      }
    });
  };

  return (
    <>
      <PromptBox $editing={isEditing} onClick={handleOpenAIPaste}>
        {isEditing ? (
          <>
            <PromptInputs
              title={newTitle}
              setTitle={setNewTitle}
              prompt={newPrompt}
              setPrompt={setNewPrompt}
              handleEdit={() => handleEdit(index, newTitle, newPrompt)}
            />
            <AddPromptButton
              onClick={(e) => {
                e.stopPropagation();
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
              <ClickFAWrapper
                icon={faXmark}
                onClick={(e) => onRemove(e, index)}
              />
            </Top>
            <PromptText children={prompt} />
            <Bottom>
              <ClickFAWrapper
                icon={faGear}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  setEditing(true);
                }}
              />
              <ClickFAWrapper icon={faCopy} onClick={(e) => handleCopy(e)} />
            </Bottom>
          </>
        )}
      </PromptBox>
    </>
  );
};

export default Prompt;

// have to do all of the below in order to get transient props to work with ts
type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

interface EditingProp {
  $editing: boolean;
}

const PromptBoxBase = tw.div<DivProps>`
  px-2
  py-1
  mt-2
  border
  rounded-xl
  w-full
  cursor-pointer
  overflow-y-auto
`;

const PromptBox: React.FC<DivProps & EditingProp> = ({
  $editing,
  ...props
}) => {
  return $editing ? (
    <PromptBoxBase {...props} className="h-fit" />
  ) : (
    <PromptBoxBase {...props} className="max-h-28" />
  );
};

const Top = tw.div`
  flex
  justify-between
  items-center
`;

const Title = tw.h2`
  text-lg
  font-medium
`;

const PromptText = tw(ReactMarkdown)`
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
