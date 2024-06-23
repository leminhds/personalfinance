import { Database } from '@/database.types' // Adjust the import path as needed

// Define types for the individual components
export type Flashcard = {
  created_at: string | null
  created_by: string | null
  definition: string
  id: string
  lesson_id: string | null
  order: number | null
  term: string
  updated_at: string | null
  updated_by: string | null
}

export type QuizQuestion = {
  id: string
  question: string
}

export type PracticalExercise = {
  correct_answer: string
  created_at: string | null
  created_by: string | null
  description: string
  explanation: string | null
  id: string
  input_fields: string
  lesson_id: string | null
  scenario_id: string | null
  step_number: number
  updated_at: string | null
  updated_by: string | null
}

export type CaseStudy = {
  correct_answer: string
  created_at: string | null
  explanation: string | null
  id: string
  lesson_id: string | null
  question: string
  scenario_id: string | null
  updated_at: string | null
}

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

