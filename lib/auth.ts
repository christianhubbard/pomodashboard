import NextAuth from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import GitHub from 'next-auth/providers/github';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from './db';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  session: { strategy: 'jwt' },
  adapter: DrizzleAdapter(db) as Adapter,
  providers: [GitHub],
  callbacks: {
    session(params) {
      return {
        ...params.session,
        user: {
          ...params.session.user,
          id: params.token.id as string,
          randomKey: params.token.randomKey
        }
      };
    }
  }
});
