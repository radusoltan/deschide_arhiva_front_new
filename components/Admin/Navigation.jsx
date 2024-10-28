"use client"
import {Disclosure, Menu} from "@headlessui/react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faBell, faUser, faXmark} from "@fortawesome/free-solid-svg-icons";
import AppLogo from "@/components/AppLogo";
import {useAuth} from "@/hooks/auth";
import {useParams, usePathname} from "next/navigation";
import LanguageChanger from "@/components/LanguageChanger";
import Link from "next/link";

const Navigation = ()=> {
  const {logout} = useAuth()
  const pathname = usePathname()
  const {locale} = useParams()

  const navigation = [
    { name: 'Dashboard', href: `/${locale}/dashboard`, current: pathname === '/dashboard' || pathname === `/${locale}/dashboard`},

  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  return  <Disclosure as="nav" className="bg-gray-800">
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-16 items-center justify-between">
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          {/* Mobile menu button*/}
          <Disclosure.Button className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span className="absolute -inset-0.5" />
            <span className="sr-only">Open main menu</span>
            <FontAwesomeIcon icon={faBars} aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden"  />
            <FontAwesomeIcon icon={faXmark} aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
          </Disclosure.Button>
        </div>
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex flex-shrink-0 items-center">
            <Link href={`/${locale}/dashboard`}>
              <AppLogo className="h-8 w-auto" />
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
              {navigation.map((item) => (
                  <Link
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? 'page' : undefined}
                      className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium',
                      )}
                  >
                    {item.name}
                  </Link>
              ))}
              <Menu as="div" className="relative ml-3">
                <Menu.Button className={classNames(
                    pathname.includes('/content') || pathname.includes(`/${locale}/content`) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'rounded-md px-3 py-2 text-sm font-medium',
                )}>Content</Menu.Button>
                <Menu.Items
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <Menu.Item>
                    <Link href={`/${locale}/content/categories`} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                      Categories
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link href={`/${locale}/content/articles`} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                      Articles
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link href={`/${locale}/content/live-text`} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                      Live Text
                    </Link>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
              <Menu as="div" className="relative ml-3">
                <Menu.Button className={classNames(
                    pathname.includes('/management') || pathname.includes(`/${locale}/management`) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'rounded-md px-3 py-2 text-sm font-medium',
                )}>Management</Menu.Button>
                <Menu.Items
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <Menu.Item>
                    <Link href={`/${locale}/management/users`} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                      Users
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link href={`/${locale}/management/roles`} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                      Roles
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link href={`/${locale}/management/permissions`} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                      Permissions
                    </Link>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">


          {/* Profile dropdown */}
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <FontAwesomeIcon icon={faUser} className="h-8 w-8 rounded-full text-gray-400"/>

              </Menu.Button>
            </div>
            <Menu.Items
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >


              <Menu.Item>
                <a onClick={logout} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                  Sign out
                </a>
              </Menu.Item>
            </Menu.Items>
          </Menu>
          <LanguageChanger />
        </div>
      </div>
    </div>

    <Disclosure.Panel className="sm:hidden">
      <div className="space-y-1 px-2 pb-3 pt-2">
        {navigation.map((item) => (
            <Disclosure.Button
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                )}
            >
              {item.name}
            </Disclosure.Button>
        ))}
      </div>
    </Disclosure.Panel>
  </Disclosure>
}

export default Navigation;