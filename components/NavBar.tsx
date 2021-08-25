import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const [session] = useSession();
  const router = useRouter();

  const [navigation, setNavigation] = useState([
    { name: "Home", href: "/", current: false, onlySignedIn: false },
    {
      name: "My Courses",
      href: "/courses",
      current: false,
      onlySignedIn: true,
    },
    {
      name: "Create Course",
      href: "/courses/create",
      current: false,
      onlySignedIn: true,
    },
  ]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      setNavigation(
        navigation.map((item) => ({
          ...item,
          current: url === item.href,
        }))
      );
    };

    handleRouteChange(router.asPath);

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  return (
    <Disclosure
      as="nav"
      className="shadow border-b-1 border-gray-200 sticky top-0 z-50"
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl bg-white mx-auto px-2 sm:px-6 lg:px-8">
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
                  <Link href="/" key="home">
                    <a>
                      <img
                        className="block lg:hidden"
                        src="/logo-with-text.svg"
                        width="62px"
                        height="62px"
                        alt="Workflow"
                      />
                      <img
                        className="hidden lg:block"
                        width="62px"
                        height="62px"
                        src="/logo-with-text.svg"
                        alt="Workflow"
                      />
                    </a>
                  </Link>
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
                {!session && router.route !== "/login" && (
                  <>
                    <button
                      className="bg-primary hover:text-primary hover:bg-white border hover:border-primary cursor-pointer text-white px-4 py-2 rounded mr-4 focus:outline-none"
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
                      className="border border-red-600 px-4 py-2 rounded text-red-600 hover:bg-red-600 hover:text-white focus:outline-none"
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
            <div className="space-y-1 bg-white">
              {navigation
                .filter((item) => !item.onlySignedIn || session)
                .map((item) => (
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
