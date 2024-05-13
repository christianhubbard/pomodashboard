'use server';

import { deleteUserById, completePomodoro } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { kv } from '@vercel/kv';

export async function deleteUser(userId: number) {
  // Uncomment this to enable deletion
  // await deleteUserById(userId);
  // revalidatePath('/');
}

export async function startPomodoroAction(
  email: string,
  { current_pomodoro }: { current_pomodoro: any }
) {
  await kv.hset(email, { current_pomodoro });
  revalidatePath('/');
}

export async function checkCurrentPomodoro(email: string) {
  const current_pomodoro = await kv.hget(email, 'current_pomodoro');
  return { current_pomodoro };
}

export async function resetCurrentPomodoroAction(email: string) {
  await kv.hset(email, { current_pomodoro: null });
  revalidatePath('/');
}

export async function completePomodoroAction(email: string) {
  await completePomodoro(email);
}
