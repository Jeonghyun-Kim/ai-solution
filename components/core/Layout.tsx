import React from 'react';
import cn from 'classnames';

import { useUI } from '@components/ui/context';
import { NavBar } from '@components/core';

import s from './Layout.module.css';

const Layout: React.FC = ({ children }) => {
  const { user } = useUI();

  return (
    <div className="h-full" style={{ minWidth: 1280, minHeight: 720 }}>
      <header className="sticky top-0 z-10">
        <NavBar />
      </header>
      <main
        className={cn(s.main, {
          [s['with-user']]: user,
        })}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
