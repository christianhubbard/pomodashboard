import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {
  pgTable,
  serial,
  primaryKey,
  varchar,
  timestamp,
  text,
  integer
} from 'drizzle-orm/pg-core';
import { eq, ilike, sql, desc } from 'drizzle-orm';
import type { AdapterAccount } from 'next-auth/adapters';

export const db = drizzle(
  neon(process.env.POSTGRES_URL!, {
    fetchOptions: {
      cache: 'no-store'
    }
  })
);

export const users = pgTable('user', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }),
  username: varchar('username', { length: 50 }),
  completed_pomodoros: integer('completed_pomodoros'),
  email: varchar('email', { length: 50 }),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image')
});

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state')
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId]
    })
  })
);

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull()
});

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull()
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] })
  })
);

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
        .orderBy(desc(users.completed_pomodoros))
        .limit(1000),
      newOffset: null
    };
  }

  if (offset === null) {
    return { users: [], newOffset: null };
  }

  const moreUsers = await db
    .select()
    .from(users)
    .limit(20)
    .offset(offset)
    .orderBy(desc(users.completed_pomodoros));
  const newOffset = moreUsers.length >= 20 ? offset + 20 : null;
  return { users: moreUsers, newOffset };
}

export async function startPomodoro(email: string) {
  return {
    data: await db.execute(sql`
      INSERT INTO pomodoros (${email})
      VALUES (${email});    
    `)
  };
}
export async function completePomodoro(email: string) {
  await db.execute(sql`
    UPDATE "user"
    SET completed_pomodoros = completed_pomodoros + 1
    WHERE email = ${email};
  `);
}

export async function getPomodoros(): Promise<{ data: any }> {
  const response = await db.execute(sql`
  SELECT name, email, completed_pomodoros
  FROM "user"
  ORDER BY completed_pomodoros DESC;  
`);
  return {
    data: response
  };
}

export async function deleteUserById(id: number) {
  await db.delete(users).where(eq(users.id, id));
}
