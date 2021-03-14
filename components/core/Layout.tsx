import React from 'react';

import { NavBar } from '@components/core';

const Layout: React.FC = ({ children }) => {
  return (
    <div className="min-h-full">
      <header>
        <NavBar />
      </header>
      <main className="">{children}</main>
    </div>
  );
};

export default Layout;
