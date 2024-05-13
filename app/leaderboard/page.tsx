import { getUsers, getPomodoros } from '@/lib/db';
import { LeaderboardTable } from './leaderboard-table';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string; offset: string };
}) {
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  const { users, newOffset } = await getUsers(search, Number(offset));
  const data = getPomodoros();

  console.log('data', data);

  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
      <div className="flex items-center mb-8">
        <h1 className="font-semibold text-lg md:text-2xl">Leaderboard</h1>
      </div>
      <LeaderboardTable users={users} offset={newOffset} />
    </main>
  );
}
