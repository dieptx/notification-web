import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { HydrateClient } from "~/trpc/server";
import BellButton from "./_components/BellButton";
import Link from "next/link";

const routes = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/comments",
    label: "Comments",
  },
  {
    path: "/chats",
    label: "Chats",
  },
  {
    path: "/workplace",
    label: "Workplace",
  },
];

export const metadata: Metadata = {
  title: "Notification Panel Web Application",
  description: "A notification panel",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <HydrateClient>
            <header className="fixed left-0 top-0 w-full bg-gradient-to-r from-gray-900 to-gray-600 text-white shadow-lg">
              <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 md:px-8">
                {/* Left side - Logo */}
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold sm:text-xl md:text-2xl">
                    NW
                  </span>
                </div>

                {/* Center - Navigation */}
                <nav className="hidden items-center gap-6 md:flex">
                  {routes.map(({ path, label }) => (
                    <Link
                      key={path}
                      href={path}
                      className="text-sm font-medium hover:text-gray-200"
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
                <BellButton />
              </div>
            </header>
            <main className="flex min-h-screen flex-col items-center justify-center">
              {children}
            </main>
          </HydrateClient>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
