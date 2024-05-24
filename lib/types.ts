import { Database } from '@/database.types' // Adjust the import path as needed

// Define types for the individual components
export type Flashcard = {
  id: string
  term: string
}

export type QuizQuestion = {
  id: string
  question: string
}

export type PracticalExercise = {
  id: string
  description: string
}

export type CaseStudy = {
  id: string
  question: string
}

export type Lesson = {
  id: string
  title: string
  flashcards: Flashcard[]
  quizQuestions: QuizQuestion[]
  practicalExercises: PracticalExercise[]
  caseStudies: CaseStudy[]
}

export type ModuleWithDetail = {
  id: string
  title: string
  lessons: Lesson[]
}
export type ExerciseType = 'Flashcards' | 'Quiz' | 'Case Studies' | 'Practical Exercises';

