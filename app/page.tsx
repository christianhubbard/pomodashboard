import { getUsers } from '@/lib/db';
import { auth } from '@/lib/auth';

import { PomodoroContainer } from './PomodoroContainer';
import { Landing } from './Landing';

export default async function IndexPage() {
  const session = await auth();
  const user = session?.user;

  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
      {user ? <PomodoroContainer user={user} /> : <Landing />}
    </main>
  );
}
