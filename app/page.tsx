import { auth } from '@/lib/auth';

import { PomodoroContainer } from './PomodoroContainer';
import { Landing } from './Landing';

import { checkCurrentPomodoro } from './actions';

export default async function IndexPage() {
  const session = await auth();
  const user = session?.user;
  const { current_pomodoro } = await checkCurrentPomodoro(user?.email || '');

  return (
    <main className="flex flex-1 flex-col py-4 sm:p-4 md:p-6">
      {user ? (
        <PomodoroContainer user={user} current_pomodoro={current_pomodoro} />
      ) : (
        <Landing />
      )}
    </main>
  );
}
