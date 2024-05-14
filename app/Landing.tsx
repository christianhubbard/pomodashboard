import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { User } from './user';
import { Button } from '../components/ui/button';

const Landing = () => {
  return (
    <div className="flex flex-col items-center text-center w-full max-w-full">
      <div className="text-sm md:text-xl pt-32 text-gray-500">
        Stay Productive, Compete with Friends!
      </div>
      <div className="text-4xl sm:text-6xl md:text-8xl py-6 md:py-8">
        PomoDashboard
      </div>
      <div className="w-10/12 sm:w-9/12 lg:w-1/2 py-0 sm:py-4">
        Using the proven Pomodoro technique, PomoDashboard helps you focus
        deeper, minimize distractions, and get more done in less time.
      </div>
      <div className="flex flex-row py-6 gap-4 w-full justify-center">
        <User />
        <Link
          target="_blank"
          href="https://en.wikipedia.org/wiki/Pomodoro_Technique"
        >
          <Button variant="secondary">Learn More</Button>
        </Link>
      </div>
      <div className="py-32">
        <div className="text-3xl sm:text-5xl md:text-6xl py-6 md:py-8">
          Features
        </div>
        <div className="flex flex-col md:flex-row py-4 md:py-12 items-center justify-around  w-full xl:w-10/12 mx-auto">
          <div className="invisible md:visible w-96 h-72 overflow-hidden drop-shadow py-4 sm:py-8">
            <Image
              alt="NextAuth Logo"
              src="/images/next-auth.jpg"
              className="object-contain "
              layout="fill"
            />
          </div>
          <div className="w-10/12 sm:w-9/12 md:w-5/12 py-4 sm:py-6">
            <div className="py-4 font-medium md:font-normal text-xl sm:text-2xl md:text-4xl">
              OAuth Registration
            </div>
            <div className="py-4 sm:py-6">
              When a user signs up with our Github OAuth integration, we
              automatically create an entry for them in our Database. This
              ensures that our application data stays in sync with our
              authentication records, and allows users to begin tracking their
              pomodoros immediately after signing up.
            </div>
          </div>
          <div className="visible md:invisible w-96 h-72 overflow-hidden drop-shadow py-4 sm:py-8">
            <Image
              alt="NextAuth Logo"
              src="/images/next-auth.jpg"
              className="object-contain "
              layout="fill"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row py-4 md:py-12 items-center justify-around w-full xl:w-10/12 mx-auto">
          <div className="w-10/12 sm:w-9/12 md:w-5/12 py-4 sm:py-6">
            <div className="py-4 text-xl font-medium md:font-normal sm:text-2xl md:text-4xl">
              Persistent Timer
            </div>
            <div className="py-4 sm:py-6">
              We leverage Vercel KV to keep a temporary store of your current
              timer on the edge. Closing the browser, reloading the page, or
              navigating to the leaderboard won't reset your progress on your
              current timer.
            </div>
          </div>
          <div className="relative w-96 h-72 overflow-hidden drop-shadow py-4 sm:py-8">
            <Image
              alt="timer in progress"
              src="/images/timers.png"
              className="object-cover "
              layout="fill"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row py-4 md:py-12 items-center justify-around  w-full xl:w-10/12 mx-auto">
          <div className="invisible md:visible w-96 md:w-1/2 lg:w-1/2 h-72 overflow-hidden drop-shadow py-4 sm:py-8">
            <Image
              alt="table of users sorted by pomodoros completed"
              src="/images/leaderboard.png"
              className="object-contain "
              layout="fill"
            />
          </div>
          <div className="w-10/12 sm:w-9/12 md:w-5/12 py-4 sm:py-6">
            <div className="py-4 text-xl font-medium md:font-normal sm:text-2xl md:text-4xl">
              Pomodoro Leaderboards
            </div>
            <div className="py-4 sm:py-6">
              Vercel's Postgres database allows us to keep an intricate log of
              all pomodoros completed. The leaderboard ranks the users by the
              number of pomodoros they've completed and is updated in real-time.
            </div>
          </div>
          <div className="visible md:invisible w-10/12 h-72 overflow-hidden drop-shadow py-4 sm:py-8">
            <Image
              alt="table of users sorted by pomodoros completed"
              src="/images/leaderboard.png"
              className="object-contain "
              layout="fill"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Landing };
