import { supabase } from './supabase'

export const getLessons = async () => {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
  
  if (error) {
    console.log("Error fetching lessons: ", error)
    throw error
  }

  return data
}
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const getUserProgress = async () => {
  //  current user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !user?.id) {
    throw new Error('User not authenticated');
  }

  try{
    const { data, error } = await supabase
      .from('overall_progress')
      .select('*')
      .eq('user_id', user?.id)
      .eq('active_lesson', true)
      .single()
    
    if (error) {
      console.log("Error fetching user progress: ", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error fetching user progress: ", error)
    return null
  }
}

export const getModulesWithDetails = async () => {
  try {
    // Fetch all modules
    const { data: modules, error: modulesError } = await supabase
      .from('modules')
      .select('id, title');

    if (modulesError) {
      throw new Error(`Error fetching modules: ${modulesError.message}`);
    }

    // For each module, fetch related lessons (ID and title only)
    const modulesWithDetails = await Promise.all(
      modules.map(async (module) => {
        const { data: lessons, error: lessonsError } = await supabase
          .from('lessons')
          .select('id, title')
          .eq('module_id', module.id);

        if (lessonsError) {
          throw new Error(`Error fetching lessons for module ${module.id}: ${lessonsError.message}`);
        }

        return {
          ...module,
          lessons,
        };
      })
    );

    return modulesWithDetails;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const getAvailableLessonItemsByLessonId = async (lessonId: string) => {
  try {
    // Fetch the lesson details
    const { data: lesson, error: lessonError } = await supabase
      .from('lessons')
      .select('id, title')
      .eq('id', lessonId)
      .single();

    if (lessonError) {
      throw new Error(`Error fetching lesson ${lessonId}: ${lessonError.message}`);
    }

    // Check for flashcards
    const { count: flashcardsCount, error: flashcardsError } = await supabase
      .from('flashcards')
      .select('id', { count: 'exact' })
      .eq('lesson_id', lesson.id);

    if (flashcardsError) {
      throw new Error(`Error fetching flashcards for lesson ${lesson.id}: ${flashcardsError.message}`);
    }

    // Check for quiz questions
    const { count: quizQuestionsCount, error: quizQuestionsError } = await supabase
      .from('quiz_questions')
      .select('id', { count: 'exact' })
      .eq('lesson_id', lesson.id);

    if (quizQuestionsError) {
      throw new Error(`Error fetching quiz questions for lesson ${lesson.id}: ${quizQuestionsError.message}`);
    }

    // Check for practical exercises
    const { count: practicalExercisesCount, error: practicalExercisesError } = await supabase
      .from('practical_exercises')
      .select('id', { count: 'exact' })
      .eq('lesson_id', lesson.id);

    if (practicalExercisesError) {
      throw new Error(`Error fetching practical exercises for lesson ${lesson.id}: ${practicalExercisesError.message}`);
    }

    // Check for case studies
    const { count: caseStudiesCount, error: caseStudiesError } = await supabase
      .from('case_studies')
      .select('id', { count: 'exact' })
      .eq('lesson_id', lesson.id);

    if (caseStudiesError) {
      throw new Error(`Error fetching case studies for lesson ${lesson.id}: ${caseStudiesError.message}`);
    }

    return {
      ...lesson,
      flashcards: (flashcardsCount ?? 0) > 0,
      quizQuestions: (quizQuestionsCount ?? 0) > 0,
      practicalExercises: (practicalExercisesCount ?? 0) > 0,
      caseStudies: (caseStudiesCount ?? 0) > 0,
    };
  } catch (error) {
    console.error('Error fetching lesson details:', error);
    return null;
  }
};

export const getFlashcards = async (lessonId: string) => {
  const { data, error } = await supabase
    .from('flashcards')
    .select('*')
    .eq('lesson_id', lessonId)
  
  if (error) {
    console.log("Error fetching flashcards: ", error)
    throw error
  }

  return data
}

export const getQuizQuestions = async (lessonId: string) => {
  const { data, error } = await supabase
    .from('quiz_questions')
    .select('*')
    .eq('lesson_id', lessonId)
  
  if (error) {
    console.log("Error fetching quiz questions: ", error)
    throw error
  }

  return data
}

export const getPracticalExercises = async (lessonId: string) => {
  const { data, error } = await supabase
    .from('practical_exercises')
    .select('*')
    .eq('lesson_id', lessonId)
  
  if (error) {
    console.log("Error fetching practical exercises: ", error)
    throw error
  }

  return data
}

export const getCaseStudies = async (lessonId: string) => {
  const { data, error } = await supabase
    .from('case_studies')
    .select('*')
    .eq('lesson_id', lessonId)
  
  if (error) {
    console.log("Error fetching case studies: ", error)
    throw error
  }

  return data
}