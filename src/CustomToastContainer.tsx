import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomToastContainer: React.FC = () => {
  return (
    <ToastContainer
      pauseOnHover={false}
      position="top-right"
      autoClose={1000}
      hideProgressBar={true}
      pauseOnFocusLoss={false}
      draggable
      newestOnTop={true}
    />
  );
};

export default CustomToastContainer;
