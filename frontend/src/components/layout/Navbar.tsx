import { Fragment, useMemo } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  ChevronDownIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/authService';

function classNames(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } finally {
      logout();
      navigate('/login', { replace: true });
    }
  };

  // Build links per role
  const navLinks = useMemo(() => {
    const base = [
      { name: 'Dashboard', to: '/dashboard' },
      { name: 'Events', to: '/events' },
    ];

    if (user?.role === 'Student') {
      base.push({ name: 'My Events', to: '/my-events' });
      base.push({ name: 'Certificates', to: '/certificates' });
    }

    if (user?.role === 'Department' || user?.role === 'Organization') {
      base.push({ name: 'My Events', to: '/my-events' });
      base.push({ name: 'Create Event', to: '/events/create' });
    }

    // if (user?.role === 'Campus-cheif' || user?.role === 'Admin') {
    //   base.push({ name: 'Pending', to: '/events/pending' });
    // }

    return base;
  }, [user?.role]);

  const initials =
    (user?.first_name?.[0] || user?.username?.[0] || 'E').toUpperCase();

  return (
    <Disclosure as="nav" className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      {({ open }) => (
        <>
          {/* Top bar */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Brand left */}
              <div className="flex items-center">
                <Link to="/dashboard" className="flex items-center">
                  <div className="h-9 w-9 rounded-xl bg-indigo-600 grid place-items-center">
                    <span className="text-white font-bold">E</span>
                  </div>
                  <span className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
                    Eventify
                  </span>
                </Link>
              </div>
              {/* Nav links center/right */}
              <div className="hidden md:flex flex-1 justify-center">
                <nav className="flex items-center gap-6">
                  {navLinks.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.to}
                      className={({ isActive }) =>
                        classNames(
                          'px-3 py-2 rounded-md text-base font-medium transition',
                          isActive
                            ? 'text-indigo-500 border-b-2 border-indigo-500'
                            : 'text-gray-700 dark:text-gray-200 hover:text-indigo-500 hover:border-b-2 hover:border-indigo-500'
                        )
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </nav>
              </div>
              {/* Profile/auth far right */}
              <div className="flex items-center gap-4">
                <Link
                  to="/notifications"
                  className="rounded-md p-2 text-gray-500 dark:text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
                  title="Notifications"
                  aria-label="Notifications"
                >
                  <BellIcon className="h-6 w-6" />
                </Link>
                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center rounded-full bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    {user?.profile_picture ? (
                      <img
                        src={user.profile_picture}
                        className="h-9 w-9 rounded-full object-cover"
                        alt="profile"
                      />
                    ) : (
                      <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-800 grid place-items-center text-gray-700 dark:text-gray-200 font-semibold">
                        {initials}
                      </div>
                    )}
                    <ChevronDownIcon className="ml-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-xl bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black/5 focus:outline-none">
                      <div className="px-4 py-3">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Signed in as</p>
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                          {user?.username}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role}</p>
                      </div>
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={classNames(
                                active ? 'bg-gray-50 dark:bg-gray-800' : '',
                                'flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200'
                              )}
                            >
                              <UserCircleIcon className="mr-2 h-5 w-5" />
                              Profile
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="py-1 border-t border-gray-100 dark:border-gray-800">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={classNames(
                                active ? 'bg-red-50 text-red-700' : 'text-red-600',
                                'w-full flex items-center px-4 py-2 text-left text-sm'
                              )}
                            >
                              <ArrowRightOnRectangleIcon className="mr-2 h-5 w-5" />
                              Logout
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                {/* Mobile hamburger */}
                <div className="md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-gray-800 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile panel */}
          <Disclosure.Panel className="md:hidden border-t border-gray-200 dark:border-gray-800">
            <div className="space-y-1 px-4 py-3">
              {navLinks.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  className={({ isActive }) =>
                    classNames(
                      'block rounded-md px-3 py-2 text-base font-medium transition',
                      isActive
                        ? 'text-indigo-500 border-b-2 border-indigo-500'
                        : 'text-gray-700 dark:text-gray-200 hover:text-indigo-500 hover:border-b-2 hover:border-indigo-500'
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              <Link
                to="/notifications"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
                aria-label="Notifications"
              >
                Notifications
              </Link>
              <button
                onClick={handleLogout}
                className="mt-1 w-full rounded-md px-3 py-2 text-left text-base font-medium text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};