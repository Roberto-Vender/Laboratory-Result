import React from 'react';
import Header from '../components/Header'; 
import { Outlet } from 'react-router-dom';

function DefaultLayout() {
  return (
    <>
      
 
        <Outlet /> {/* Render the content of the current page here */}
      
    </>
  );
}

export default DefaultLayout;