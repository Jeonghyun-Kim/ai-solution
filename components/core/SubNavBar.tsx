import React from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { Transition } from '@headlessui/react';

import { Link } from '@components/ui';

interface Props {
  className?: string;
  sticky: boolean;
  variant?: 'user' | 'model' | 'dataset' | 'project';
}

const navArray = {
  user: [
    { label: 'overview', href: '/dashboard' },
    { label: 'project', href: '/project' },
    { label: 'data', href: '/data' },
    { label: 'model', href: '/model' },
    { label: 'marketplace', href: '/marketplace' },
  ],
  model: [
    { label: 'overview', href: '/model/overview' },
    { label: 'summary', href: '/model/summary' },
    { label: 'modification', href: '/model/edit' },
    { label: 'settings', href: '/model/settings' },
  ],
  dataset: [
    { label: 'overview', href: '/data/overview' },
    { label: 'template', href: '/data/template' },
    { label: 'analytics', href: '/data/analytics' },
    { label: 'modification', href: '/data/edit' },
    { label: 'settings', href: '/data/settings' },
  ],
  project: [
    { label: 'overview', href: '/project/overview' },
    { label: 'experiment', href: '/project/experiment' },
    { label: 'analytics', href: '/project/analytics' },
    { label: 'invite', href: '/project/invite' },
    { label: 'settings', href: '/project/settings' },
  ],
};

const SubNavBar: React.FC<Props> = ({ className, sticky, variant }) => {
  const router = useRouter();

  const menuItems = React.useMemo(() => (variant ? navArray[variant] : null), [
    variant,
  ]);

  return (
    <nav
      className={cn(className, 'bg-white shadow', {
        'fixed top-0 left-0 right-0': sticky,
      })}
    >
      <div className="relative flex h-full px-10 2xl:px-12">
        <Transition
          show={sticky}
          className="absolute left-12 top-1"
          enter="transition ease-in duration-75"
          enterFrom="transform -translate-y-8 opacity-80"
          enterTo="transform translate-y-0 opacity-100"
          leave="transition ease-out duration-75"
          leaveFrom="transform translate-y-0 opacity-100"
          leaveTo="transform -translate-y-4 opacity-0"
        >
          <button
            className="text-3xl font-extrabold rounded-md font-serif"
            onClick={() => {
              window.scroll({ top: 0, left: 0, behavior: 'smooth' });
            }}
          >
            AI
          </button>
        </Transition>
        <div
          className={cn('transform transition-transform duration-200 ease-in', {
            'translate-x-16': sticky,
          })}
        >
          {menuItems && (
            <div className="flex h-full items-end space-x-4">
              {menuItems.map(({ label, href }, idx) => (
                <Link
                  key={`desktop-menu-item-${idx}`}
                  href={href}
                  className={cn(
                    'inline-flex items-center px-2 py-1 border-b-2 text-md font-medium capitalize',
                    {
                      'border-lightBlue-500 text-gray-900':
                        router.asPath === href,
                      'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700':
                        router.asPath !== href,
                    },
                  )}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default SubNavBar;
