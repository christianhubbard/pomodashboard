import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {
  pgTable,
  serial,
  varchar,
  timestamp,
  integer
} from 'drizzle-orm/pg-core';
import { eq, ilike, sql } from 'drizzle-orm';

export const db = drizzle(
  neon(process.env.POSTGRES_URL!, {
    fetchOptions: {
      cache: 'no-store'
    }
  })
);

const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }),
  username: varchar('username', { length: 50 }),
  email: varchar('email', { length: 50 })
});

const pomodoros = pgTable('pomodoros', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => users.id),
  created_at: timestamp('created_at', { withTimezone: true }),
  completed_at: timestamp('completed_at', { withTimezone: true })
});

export type SelectUser = typeof users.$inferSelect;

export async function getUsers(
  search: string,
  offset: number
): Promise<{
  users: SelectUser[];
  newOffset: number | null;
}> {
  // Always search the full table, not per page
  if (search) {
    return {
      users: await db
        .select()
        .from(users)
        .where(ilike(users.name, `%${search}%`))
        .limit(1000),
      newOffset: null
    };
  }

  if (offset === null) {
    return { users: [], newOffset: null };
  }

  const moreUsers = await db.select().from(users).limit(20).offset(offset);
  const newOffset = moreUsers.length >= 20 ? offset + 20 : null;
  return { users: moreUsers, newOffset };
}

export async function startPomodoro(id: number) {
  return {
    data: await db.execute(sql`
      INSERT INTO pomodoros (${id})
      VALUES (${id});    
    `)
  };
}
export async function completePomodoro() {}

export async function getPomodoros(): Promise<{ data: any }> {
  return {
    data: await db.execute(sql`
      SELECT user_id, COUNT(*) AS total_pomodoros
      FROM pomodoros
      WHERE completed_at IS NOT NULL
      GROUP BY user_id
      ORDER BY total_pomodoros DESC;
    `)
  };
}

export async function deleteUserById(id: number) {
  await db.delete(users).where(eq(users.id, id));
}
