import React from 'react';
import cn from 'classnames';

import { useUI } from '@components/ui/context';
import { NavBar, SubNavBar } from '@components/core';

import s from './Layout.module.css';

interface Props {
  variant?: 'user' | 'model' | 'dataset' | 'project';
}

const Layout: React.FC<Props> = ({ variant, children }) => {
  const { user } = useUI();
  const [sticky, setSticky] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handler = () => {
      setSticky(window.scrollY > 64);
    };

    handler();

    window.addEventListener('scroll', handler);

    return () => window.removeEventListener('scorll', handler);
  }, []);

  return (
    <div className="h-full" style={{ minWidth: 1280, minHeight: 720 }}>
      <header>
        <NavBar variant={variant} />
        <div
          className={cn('h-12', {
            hidden: !variant,
          })}
        >
          <SubNavBar
            className={cn('z-50 h-12')}
            sticky={sticky}
            variant={variant}
          />
        </div>
      </header>
      <main
        className={cn(s.main, {
          [s['with-variant']]: variant !== undefined,
        })}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
