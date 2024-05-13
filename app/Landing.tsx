import React from 'react';
import Link from 'next/link';

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
    </div>
  );
};

export { Landing };
