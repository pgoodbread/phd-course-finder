import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";

const navigation = [
  { name: "Home", href: "/", current: false, onlySignedIn: false },
  { name: "My Courses", href: "/courses", current: false, onlySignedIn: true },
  {
    name: "Create Course",
    href: "/courses/create",
    current: false,
    onlySignedIn: true,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const [session] = useSession();

  const router = useRouter();

  navigation.forEach((item) => {
    item.current = router.asPath === item.href;
  });

  return (
    <Disclosure as="nav" className="shadow border-b-1 border-gray-200">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-14">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center h-12 sm:items-stretch sm:justify-start md:h-13">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation
                      .filter((item) => !item.onlySignedIn || session)
                      .map((item) => (
                        <Link href={item.href} key={item.name}>
                          <a
                            className={classNames(
                              item.current
                                ? "text-gray-900 border-b-2 border-primary"
                                : "text-gray-400 hover:text-gray-900",
                              "px-3 py-4 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {!session && (
                  <>
                    <button
                      className="bg-primary hover:text-primary hover:bg-white border hover:border-primary cursor-pointer text-white px-4 py-2 rounded mr-4"
                      onClick={() => signIn()}
                    >
                      Sign In
                    </button>
                  </>
                )}
                {session && (
                  <>
                    <span className="mr-5 hidden md:block">
                      {session.user.email}
                    </span>
                    <button
                      className="text-gray-500 hover:text-gray-900"
                      onClick={() => signOut()}
                    >
                      Sign Out
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link href={item.href} key={item.name}>
                  <a
                    className={classNames(
                      item.current
                        ? "text-gray-900 border-l-4 border-primary"
                        : "text-gray-400 hover:text-gray-900",
                      "block px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}