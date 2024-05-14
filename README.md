# PomoDashboard

https://pomodashboard.vercel.app/

<div align="center"><img width="756" alt="Screenshot 2024-05-13 at 4 16 50 PM" src="https://github.com/christianhubbard/pomodashboard/assets/59040087/f49e71fe-963d-47eb-9ee8-660e2a803639"></div>

## Goal

The internet is full of client-side pomodoro applications, but very few allow a user to create an account and track their progress over time.
Even fewer applications have the ability to maintain a timer across devices or browsers.
Vercel's storage solutions allow for creating a feature-rich pomodoro application in as little as a weekend.

PomoDashboard offers a persistent pomodoro timer that syncs across browsers and devices, while also allowing users the ability to gamify their productivity by increasing their ranking on the leaderboard.

## Key Features

#### Persistent Timers

We leverage Vercel KV to keep a temporary store of your current timer on the edge. Because the timer's history is not stored on the client, reloading the page or navigating to the leaderboard won't reset your progress on your current timer. If you start a timer in one browser, you can close and open it in another browser. This is particularly useful for users who use multiple computers.

<div align="center"><img width="613" alt="Screenshot 2024-05-13 at 4 43 09 PM" src="https://github.com/christianhubbard/pomodashboard/assets/59040087/d8bccd55-5fa8-41e2-b551-7f8b787a7a2b"></div>

#### Pomodoro Tracking

Vercel's Postgres database allows us to keep an intricate log of all pomodoros completed. In the future, we can use this information to show a user's progress over time, but we're currently using it to power our leaderboard. The leaderboard ranks the users by the number of pomodoros they've completed and is updated in real-time.

<div align="center"><img width="1012" alt="Screenshot 2024-05-13 at 4 43 51 PM" src="https://github.com/christianhubbard/pomodashboard/assets/59040087/95bc4067-07fb-4e73-a166-b467a49fe06b"></div>

#### Automatic Auth Integration

When a user signs up with our Github OAuth integration, we automatically create an entry for them in our Database. This ensures that our application data stays in sync with our authentication records, and allows users to begin tracking their pomodoros immediately after signing up. This is handled with ease thanks to the close integration of Neon, Drizzle, and NextAuth.

```
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
});
```

## Technical Overview

This project is using the following stack:

- Framework - [Next.js 14](https://nextjs.org/)
- Language - [TypeScript](https://www.typescriptlang.org)
- Auth - [NextAuth.js](https://next-auth.js.org)
- Database - [Postgres](https://vercel.com/postgres)
- Serverless - [Redis](https://vercel.com/kv)
- Deployment - [Vercel](https://vercel.com/docs/concepts/next.js/overview)
- Styling - [Tailwind CSS](https://tailwindcss.com)
- Components - [Shadcn UI](https://ui.shadcn.com/)
- Analytics - [Vercel Analytics](https://vercel.com/analytics)
- Formatting - [Prettier](https://prettier.io)

This application uses the new Next.js App Router. This includes support for enhanced layouts, colocation of components, tests, and styles, component-level data fetching, and more.

## Getting Started

Copy the `.env.example` file to `.env` and update the values.

Run the following commands to start the development server:

```
yarn
yarn dev
```

You should now be able to access the application at http://localhost:3000.
