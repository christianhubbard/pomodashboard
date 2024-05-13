# PomoDashboard

https://pomodashboard.vercel.app/

## Goal

The internet is full of client-side pomodoro applications, but very few allow a user to create an account and track their progress over time.
Even fewer applications have the ability to maintain a timer across devices or browsers.
Vercel's storage solutions allow for creating a feature-rich pomodoro application in as little as a weekend.

PomoDashboard offers a persistent pomodoro timer that syncs across browsers and devices, while also allowing users the ability to gamify their productivity by increasing their ranking on the leaderboard.

## Key Features

---

#### Persistent Timers

We leverage Vercel KV to keep a temporary store of your current timer on the edge. Because the timer's history is not stored on the client, reloading the page or navigating to the leaderboard won't reset your progress on your current timer. If you start a timer in one browser, you could close and open in another browser. This is particularly useful for users that use multiple computers.

#### Pomodoro Tracking

Vercel's Postgres database allows us keep an intricate log of all pomodoros completed. In the future, we can use this information to show a user's progress over time, but we're currently using it to power our leaderboard. The leaderboard ranks the users by the number of pomodoros they've completed and is updated in real time.

#### Automatic Auth Integration

When a user signs up with our Github OAuth integration, we also automatically create an entry for them in our Database. This ensures that our application data stays in sync with our authentication records, and allows users to begin tracking their pomodoros immediately after signing up.

## Technical Overview

This is a starter template using the following stack:

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

This template uses the new Next.js App Router. This includes support for enhanced layouts, colocation of components, tests, and styles, component-level data fetching, and more.

## Getting Started

Copy the `.env.example` file to `.env` and update the values.

Run the following commands to start the development server:

```
yarn
yarn dev
```

You should now be able to access the application at http://localhost:3000.
