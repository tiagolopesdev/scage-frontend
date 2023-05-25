import React from 'react';
import { NavBar } from '../../Components/Navbar';
import { UserListFloating } from '../../Components/Users/user-list-floating';

export const RenderScale = () =>  {
  return ( 
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <NavBar/>
      <UserListFloating/>
    </div>
  );
}
