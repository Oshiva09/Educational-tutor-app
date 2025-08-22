import { Subject, Lesson, User } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Alex Chen',
  email: 'alex@example.com',
  joinedAt: new Date('2024-01-15'),
  streak: 7,
  totalPoints: 2450,
  completedLessons: ['calc-1', 'calc-2', 'prog-1'],
  quizScores: {
    'calc-1': 85,
    'calc-2': 92,
    'prog-1': 78
  }
};

export const subjects: Subject[] = [
  {
    id: 'calculus',
    name: 'Calculus',
    description: 'Master derivatives, integrals, and advanced mathematical concepts',
    icon: 'Calculator',
    color: '#3B82F6',
    gradient: 'from-blue-500 to-blue-700',
    totalLessons: 12,
    completedLessons: 2
  },
  {
    id: 'programming',
    name: 'Programming',
    description: 'Learn programming fundamentals and advanced concepts',
    icon: 'Code',
    color: '#8B5CF6',
    gradient: 'from-purple-500 to-purple-700',
    totalLessons: 15,
    completedLessons: 1
  },
  {
    id: 'statistics',
    name: 'Statistics',
    description: 'Understand data analysis, probability, and statistical methods',
    icon: 'BarChart3',
    color: '#14B8A6',
    gradient: 'from-teal-500 to-teal-700',
    totalLessons: 10,
    completedLessons: 0
  },
  {
    id: 'physics',
    name: 'Physics',
    description: 'Explore mechanics, thermodynamics, and quantum physics',
    icon: 'Zap',
    color: '#F97316',
    gradient: 'from-orange-500 to-orange-700',
    totalLessons: 14,
    completedLessons: 0
  }
];

export const lessons: Lesson[] = [
  {
    id: 'calc-1',
    subjectId: 'calculus',
    title: 'Introduction to Limits',
    description: 'Understanding the fundamental concept of limits in calculus',
    difficulty: 'beginner',
    duration: 25,
    steps: [
      {
        id: 'step-1',
        title: 'What is a Limit?',
        content: 'A limit describes the behavior of a function as the input approaches a particular value. It\'s the foundation of calculus.',
        type: 'text'
      },
      {
        id: 'step-2',
        title: 'Limit Notation',
        content: 'We write limits as: lim(x→a) f(x) = L, which means "the limit of f(x) as x approaches a equals L".',
        type: 'formula'
      },
      {
        id: 'step-3',
        title: 'Example: Simple Limit',
        content: 'Let\'s find lim(x→2) (x² + 1). As x gets closer to 2, x² approaches 4, so x² + 1 approaches 5.',
        type: 'example'
      }
    ],
    quiz: {
      id: 'quiz-calc-1',
      questions: [
        {
          id: 'q1',
          question: 'What is lim(x→3) (2x + 1)?',
          options: ['6', '7', '8', '9'],
          correctAnswer: 1,
          explanation: '2(3) + 1 = 7'
        },
        {
          id: 'q2',
          question: 'Limits help us understand the behavior of functions at what points?',
          options: ['Maximum points', 'Points of approach', 'Minimum points', 'Inflection points'],
          correctAnswer: 1,
          explanation: 'Limits describe behavior as we approach specific values'
        }
      ]
    }
  },
  {
    id: 'prog-1',
    subjectId: 'programming',
    title: 'Variables and Data Types',
    description: 'Learn how to store and manipulate data in programming',
    difficulty: 'beginner',
    duration: 20,
    steps: [
      {
        id: 'step-1',
        title: 'What are Variables?',
        content: 'Variables are containers that store data values. Think of them as labeled boxes where you can put information.',
        type: 'text'
      },
      {
        id: 'step-2',
        title: 'Declaring Variables',
        content: 'In JavaScript, we use let, const, or var to declare variables.',
        type: 'code',
        codeExample: 'let name = "Alice";\nconst age = 25;\nvar isStudent = true;',
        language: 'javascript'
      },
      {
        id: 'step-3',
        title: 'Common Data Types',
        content: 'The main data types are: strings (text), numbers, booleans (true/false), and objects.',
        type: 'text'
      }
    ],
    quiz: {
      id: 'quiz-prog-1',
      questions: [
        {
          id: 'q1',
          question: 'Which keyword creates a variable that cannot be reassigned?',
          options: ['var', 'let', 'const', 'static'],
          correctAnswer: 2,
          explanation: 'const creates constants that cannot be reassigned'
        }
      ]
    }
  }
];