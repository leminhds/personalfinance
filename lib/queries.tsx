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
      .select('id, title')

    if (modulesError) {
      throw new Error(`Error fetching modules: ${modulesError.message}`)
    }

    // For each module, fetch related lessons and their associated data
    const modulesWithDetails = await Promise.all(
      modules.map(async (module) => {
        const { data: lessons, error: lessonsError } = await supabase
          .from('lessons')
          .select('id, title')
          .eq('module_id', module.id)

        if (lessonsError) {
          throw new Error(`Error fetching lessons for module ${module.id}: ${lessonsError.message}`)
        }

        const lessonsWithDetails = await Promise.all(
          lessons.map(async (lesson) => {
            // Fetch flashcards
            const { data: flashcards, error: flashcardsError } = await supabase
              .from('flashcards')
              .select('id, term')
              .eq('lesson_id', lesson.id)

            if (flashcardsError) {
              throw new Error(`Error fetching flashcards for lesson ${lesson.id}: ${flashcardsError.message}`)
            }

            // Fetch quiz questions
            const { data: quizQuestions, error: quizQuestionsError } = await supabase
              .from('quiz_questions')
              .select('id, question')
              .eq('lesson_id', lesson.id)

            if (quizQuestionsError) {
              throw new Error(`Error fetching quiz questions for lesson ${lesson.id}: ${quizQuestionsError.message}`)
            }

            // Fetch practical exercises
            const { data: practicalExercises, error: practicalExercisesError } = await supabase
              .from('practical_exercises')
              .select('id, description')
              .eq('lesson_id', lesson.id)

            if (practicalExercisesError) {
              throw new Error(`Error fetching practical exercises for lesson ${lesson.id}: ${practicalExercisesError.message}`)
            }

            // Fetch case studies
            const { data: caseStudies, error: caseStudiesError } = await supabase
              .from('case_studies')
              .select('id, question')
              .eq('lesson_id', lesson.id)

            if (caseStudiesError) {
              throw new Error(`Error fetching case studies for lesson ${lesson.id}: ${caseStudiesError.message}`)
            }

            return {
              ...lesson,
              flashcards,
              quizQuestions,
              practicalExercises,
              caseStudies
            }
          })
        )

        return {
          ...module,
          lessons: lessonsWithDetails
        }
      })
    )

    return modulesWithDetails
  } catch (error) {
    console.error('Error fetching data:', error)
    return []
  }
}
