"use client";
import Link from "next/link";
import React from "react";
import { FaHotdog } from "react-icons/fa";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const NavBar = () => {
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
    </nav>
  );
};

export default NavBar;
