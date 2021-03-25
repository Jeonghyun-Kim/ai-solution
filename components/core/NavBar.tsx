import React from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';

import { Avatar, Link } from '@components/ui';

const menuItems = ['dash board', 'data', 'model', 'marketplace'];

const NavBar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto px-10 2xl:px-12">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link
              className="text-3xl font-extrabold rounded-md font-serif"
              href="/"
            >
              AISolution
            </Link>
          </div>
          <div className="flex">
            <div className="ml-6 flex space-x-4">
              {menuItems.map((item, idx) => (
                <Link
                  key={`desktop-menu-item-${idx}`}
                  href={`/${item.split(' ').join('-')}`}
                  className={cn(
                    'inline-flex items-center px-2 pt-1 border-b-4 text-md font-medium capitalize',
                    {
                      'border-lightBlue-500 text-gray-900':
                        router.asPath === `/${item.split(' ').join('-')}`,
                      'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700':
                        router.asPath !== `/${item.split(' ').join('-')}`,
                    },
                  )}
                >
                  {item}
                </Link>
              ))}
            </div>
            <div className="ml-6 flex items-center">
              <div className="ml-3 relative">
                <div>
                  <button
                    type="button"
                    className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    id="user-menu"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open user menu</span>
                    <Avatar size="sm" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
