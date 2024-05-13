'use server';

import { deleteUserById, completePomodoro } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteUser(userId: number) {
  // Uncomment this to enable deletion
  // await deleteUserById(userId);
  // revalidatePath('/');
}

export async function completePomodoroAction(email: string) {
  completePomodoro(email);
}
