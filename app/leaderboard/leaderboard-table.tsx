'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { SelectUser } from '@/lib/db';
import { deleteUser } from '../actions';
import { useRouter } from 'next/navigation';

export function LeaderboardTable({
  users,
  offset
}: {
  users: SelectUser[];
  offset: number | null;
}) {
  const router = useRouter();

  function onClick() {
    router.replace(`/?offset=${offset}`);
  }

  return (
    <>
      <form className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="table-cell">Rank</TableHead>
              <TableHead className="table-cell">Name</TableHead>
              <TableHead className="table-cell">Email</TableHead>
              <TableHead className="table-cell">Pomodoros Completed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, idx) => (
              <UserRow key={user.id} rank={idx + 1} user={user} />
            ))}
          </TableBody>
        </Table>
      </form>
      {offset !== null && (
        <Button
          className="mt-4 w-40"
          variant="secondary"
          onClick={() => onClick()}
        >
          Next Page
        </Button>
      )}
    </>
  );
}

function UserRow({ user, rank }: { user: SelectUser; rank: number }) {
  const userId = user.id;
  const deleteUserWithId = deleteUser.bind(null, userId);
  console.log('rank', rank);

  return (
    <TableRow>
      <TableCell className="font-medium pl-8">{rank}</TableCell>
      <TableCell className="font-medium">{user.name}</TableCell>
      <TableCell className="table-cell">{user.email}</TableCell>
      <TableCell>{user.completed_pomodoros}</TableCell>
    </TableRow>
  );
}
