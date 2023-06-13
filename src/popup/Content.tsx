import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';

const Content: React.FC = () => {
  return <Box>Content</Box>;
};

export default Content;

const Box = tw.div`
  flex
  flex-col
  items-center
  justify-center
  p-4
  h-14
  w-full
  border
  rounded-xl
`;
