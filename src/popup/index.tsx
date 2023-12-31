import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Content from './Content';
import '../styles/tailwind.css';
import tw from 'tailwind-styled-components';
import CustomToastContainer from '../CustomToastContainer';

const Popup = () => {
  return (
    <>
      <Container>
        <Header>
          <h1 className="font-medium">PromptGPT</h1>
          <a target="_blank" href="https://github.com/SilenNaihin/PromptGPT">
            <Github src="github.png" />
          </a>
        </Header>
        <Content />
      </Container>
      <CustomToastContainer />
    </>
  );
};

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);

const Container = tw.div`
  flex 
  flex-col
  items-center
  justify-center
  py-2
  w-96
`;

const Header = tw.div`
  flex
  justify-between
  items-center
  pb-2
  w-full
`;

const Github = tw.img`
  h-4
`;
