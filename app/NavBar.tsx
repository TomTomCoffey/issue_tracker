"use client";
import Link from "next/link";
import React from "react";
import { FaHotdog } from "react-icons/fa";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { Avatar, Box, Button, DropdownMenu, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Spinner from "./components/Spinner";

const NavBar = () => {
  const { status, data: session } = useSession();
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
    //{ href: '/contact', label: 'Contact' },
  ];
  const pathname = usePathname();

  return (
    <nav className="border-b h-16 px-6 py-3">
      <Flex justify="between">
        <Flex align="center" gap="5">
          <Link href="/">
            {" "}
            <FaHotdog />
          </Link>
          <ul className="flex space-x-7">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={classNames({
                    "border-b-2 border-blue-500 text-stone-900":
                      pathname === link.href,
                    "border-b-2 border-transparent text-stone-700":
                      pathname !== link.href,
                    " text-stone-500 hover:text-blue-500":
                      pathname !== link.href,
                  })}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Flex>
        <Flex>
          <Box>
            {status === "loading" && (
              <div>
                <Spinner />
              </div>
            )}
            {status === "unauthenticated" && (
              <DropdownMenu.Root>
                <Button>
                <DropdownMenu.Trigger>
                  <div className=" btn cursor-pointer hover:ease-in-out">
                    <Button>Sign in</Button>
                  </div>
                </DropdownMenu.Trigger>
                </Button>
                <DropdownMenu.Content>
                  <DropdownMenu.Item>
                    <Link href="/signup">Sign up</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item>
                    <Link href="/api/auth/signin"> Login</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "authenticated" && (
              <>
                {/* <Button>
                  <Link href="/api/auth/signout">Sign out</Link>
                </Button> */}

                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Avatar
                      src={session!.user?.image!}
                      fallback="???"
                      className="cursor-pointer hover:ease-in-out"
                    />
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Label>
                      Hello, {session!.user?.name}
                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                      <Link href="/api/auth/signout">Sign out</Link>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </>
            )}
          </Box>
        </Flex>
      </Flex>
    </nav>
  );
};

export default NavBar;
