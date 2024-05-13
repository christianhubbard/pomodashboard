import React from 'react';
import Link from 'next/link';

import { User } from './user';
import { Button } from '../components/ui/button';

const Landing = () => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-xl pt-32 text-gray-500">
        Stay Productive, Compete with Friends!
      </div>
      <div className="text-8xl p-8">PomoDashboard</div>
      <div className="w-1/2 p-4 mx-auto">
        Using the proven Pomodoro technique, PomoDashboard helps you focus
        deeper, minimize distractions, and get more done in less time.
      </div>
      <div className="flex flex-row p-6 gap-4">
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
