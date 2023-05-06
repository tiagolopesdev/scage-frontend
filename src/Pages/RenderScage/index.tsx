import React from 'react';
import { NavBar } from '../../Components/Navbar';
import { SideBar } from '../../Components/SideBar';

export const RenderScale = () =>  {
  return ( 
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <NavBar/>
      <SideBar/>
    </div>
  );
}
