export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedAt: Date;
  streak: number;
  totalPoints: number;
  completedLessons: string[];
  quizScores: Record<string, number>;
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  totalLessons: number;
  completedLessons: number;
}

export interface Lesson {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  steps: LessonStep[];
  quiz: Quiz;
  prerequisites?: string[];
}

export interface LessonStep {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'code' | 'formula' | 'example';
  codeExample?: string;
  language?: string;
}

export interface Quiz {
  id: string;
  questions: Question[];
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface UserProgress {
  lessonId: string;
  completedAt: Date;
  score: number;
  timeSpent: number;
}