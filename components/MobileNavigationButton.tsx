'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo, SettingsIcon, UsersIcon } from '@/components/icons';
import { FaRegClock } from 'react-icons/fa6';

const MobileNavigationButton = () => {
  const pathname = usePathname();
  const isLeaderboardPage = pathname === '/leaderboard';

  return (
    <Link
      className="flex items-center gap-2 font-medium lg:hidden"
      href={isLeaderboardPage ? '/' : '/leaderboard'}
    >
      {isLeaderboardPage ? <FaRegClock /> : <UsersIcon />}
      <span className="">
        {isLeaderboardPage ? 'Dashboard' : 'Leaderboard'}
      </span>
    </Link>
  );
};

export default MobileNavigationButton;
