import React from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';

import { Avatar, Link } from '@components/ui';

import s from './NavBar.module.css';

const menuItems = ['data', 'model', 'dash board', 'marketplace'];

const NavBar: React.FC = () => {
  const router = useRouter();
  const [profileOpen, setProfileOpen] = React.useState<boolean>(false);
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link className="text-xl font-extrabold" href="/">
              AIS
            </Link>
          </div>
          <div className="flex">
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {menuItems.map((item, idx) => (
                <Link
                  key={`desktop-menu-item-${idx}`}
                  href={`/${item.split(' ').join('-')}`}
                  className={cn(
                    'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium capitalize',
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
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {/* <!-- Profile dropdown --> */}
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
          <div className="-mr-2 flex items-center sm:hidden">
            {/* <!-- Mobile menu button --> */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
