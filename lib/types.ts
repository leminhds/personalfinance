import { Database } from '@/database.types' // Adjust the import path as needed

// Define types for the individual components
export type Flashcard = Database['public']['Tables']['flashcards']['Row']

export type QuizQuestion = {
  id: string
  question: string
}

export type PracticalExercise = Database['public']['Tables']['practical_exercises']['Row']

export type CaseStudy = Database['public']['Tables']['case_studies']['Row']

export type LessonWithDetail = {
  id: string
  title: string
  flashcards: boolean
  quizQuestions: boolean
  practicalExercises: boolean
  caseStudies: boolean
}
export type Lesson = {
  id: string
  title: string
}

export type ModuleWithDetail = {
  id: string
  title: string
  lessons: Lesson[]
}
export type ExerciseType = 'Flashcards' | 'Quiz' | 'Case Studies' | 'Practical Exercises';

