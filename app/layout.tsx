import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import { Container, Theme} from "@radix-ui/themes";
import { SessionProvider } from "next-auth/react";
import AuthProvider from "./auth/Provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <Theme accentColor="iris" grayColor="gray" radius="large">
          <AuthProvider>
          <NavBar />
          <main className="p-5">
            <Container>{children}</Container>
          </main>
          </AuthProvider>
        </Theme>
      </body>
    </html>
  );
}
