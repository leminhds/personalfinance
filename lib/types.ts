import { Database } from '@/database.types' // Adjust the import path as needed

// Define types for the individual components
type Flashcard = {
  id: string
  term: string
}

type QuizQuestion = {
  id: string
  question: string
}

type PracticalExercise = {
  id: string
  description: string
}

type CaseStudy = {
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

