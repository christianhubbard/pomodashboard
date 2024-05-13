import './globals.css';

import Link from 'next/link';
import { auth } from '@/lib/auth';
import { Analytics } from '@vercel/analytics/react';
import { Logo, SettingsIcon, UsersIcon, VercelLogo } from '@/components/icons';
import { FaRegClock } from 'react-icons/fa6';

import { User } from './user';
import { NavItem } from './nav-item';

export const metadata = {
  title: 'PomoDashboard',
  description:
    'A Pomodoro dashboard built with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user;

  return (
    <html lang="en" className="h-full bg-gray-50">
      <body>
        {user ? (
          <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
              <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-[60px] items-center border-b px-5">
                  <Link
                    className="flex items-center gap-2 font-semibold"
                    href="/"
                  >
                    <Logo />
                    <span className="">PomoDashboard</span>
                  </Link>
                </div>
                <div className="flex-1 overflow-auto py-2">
                  <nav className="grid items-start px-4 text-sm font-medium">
                    <NavItem href="/">
                      <FaRegClock className="h-4 w-4" />
                      Dashboard
                    </NavItem>
                    <NavItem href="/leaderboard">
                      <UsersIcon className="h-4 w-4" />
                      Leaderboard
                    </NavItem>
                    <NavItem href="/settings">
                      <SettingsIcon className="h-4 w-4" />
                      Settings
                    </NavItem>
                  </nav>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 justify-between lg:justify-end">
                <Link
                  className="flex items-center gap-2 font-semibold lg:hidden"
                  href="/"
                >
                  <Logo />
                  <span className="">PomoDashboard</span>
                </Link>
                <User />
              </header>
              {children}
            </div>
          </div>
        ) : (
          <div className="flex flex-col min-h-screen">
            <div className="flex flex-row w-full justify-between border-b bg-gray-100/40 dark:bg-gray-800/40">
              <div className="flex h-[60px] items-center  px-5">
                <Link
                  className="flex items-center gap-2 font-semibold"
                  href="/"
                >
                  <Logo />
                  <span className="">PomoDashboard</span>
                </Link>
              </div>
              <header className="flex h-14 lg:h-[60px] items-center gap-4   px-6 dark:bg-gray-800/40 justify-between lg:justify-end">
                <User />
              </header>
            </div>
            {children}
          </div>
        )}
        <Analytics />
      </body>
    </html>
  );
}
