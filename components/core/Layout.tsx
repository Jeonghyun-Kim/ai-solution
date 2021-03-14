import React from 'react';

import { NavBar } from '@components/core';

import s from './Layout.module.css';

const Layout: React.FC = ({ children }) => {
  return (
    <div className="h-full">
      <header className="sticky top-0">
        <NavBar />
      </header>
      <main className={s.main}>{children}</main>
    </div>
  );
};

export default Layout;
