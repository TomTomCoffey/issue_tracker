import Link from "next/link";
import React from "react";
import { FaHotdog } from "react-icons/fa";

const NavBar = () => {
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
    //{ href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="flex border-b space-x-7 h-16 mb-5 px-6 items-center">
      <Link href="/"> <FaHotdog/></Link>
      <ul className="flex space-x-7">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-stone-800 hover:text-stone-400 transition-colors"
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
