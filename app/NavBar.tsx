"use client";
import Link from "next/link";
import React from "react";
import { FaHotdog } from "react-icons/fa";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { Box, Button } from "@radix-ui/themes";
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
    <nav className="flex border-b space-x-7 h-16 mb-5 px-6 items-center">
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
                " text-stone-500 hover:text-blue-500": pathname !== link.href,
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === "loading" && (
          <div>
            <Spinner  />
          </div>
        )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin" className="mr-5">
            Login
          </Link>
        )}
        {status === "authenticated" &&  session?.user?.name}
        {status === "authenticated" && (
          <Link href="/api/auth/signout" className="mr-5 ml-5">
            Sign out
          </Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
