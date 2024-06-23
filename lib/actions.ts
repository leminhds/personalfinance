import { supabase } from './supabase'

// Function to upsert user progress
export const upsertUserProgress = async (lessonId: string) => {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || !user?.id) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase.rpc('upsert_user_progress', {
    user_id: user.id ,
    lesson_id: lessonId
  });

  if (error) {
    throw error;
  }

  return data;
};

export const addExerciseCompleted = async (exerciseItemId: string) => {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || !user?.id) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase.rpc('add_exercise_completed', {
    user_id: user.id,
    exercise_item_id: exerciseItemId
  });

  if (error) {
    throw error;
  }

  return data;
}