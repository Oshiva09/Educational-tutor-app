import React from 'react';
import { ArrowLeft, Clock, Star, Play, CheckCircle } from 'lucide-react';
import { Subject, Lesson, User } from '../types';

interface LessonListProps {
  subject: Subject;
  lessons: Lesson[];
  user: User;
  onBack: () => void;
  onLessonSelect: (lesson: Lesson) => void;
}

export default function LessonList({ subject, lessons, user, onBack, onLessonSelect }: LessonListProps) {
  const subjectLessons = lessons.filter(lesson => lesson.subjectId === subject.id);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isLessonCompleted = (lessonId: string) => {
    return user.completedLessons.includes(lessonId);
  };

  const getLessonScore = (lessonId: string) => {
    return user.quizScores[lessonId] || 0;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Dashboard
      </button>

      <div className={`bg-gradient-to-r ${subject.gradient} rounded-xl p-8 mb-8 text-white`}>
        <h1 className="text-3xl font-bold mb-4">{subject.name}</h1>
        <p className="text-white/90 text-lg mb-6">{subject.description}</p>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-white/80">Progress:</span>
            <span className="font-semibold">{subject.completedLessons} / {subject.totalLessons} lessons</span>
          </div>
          <div className="w-32 bg-white/20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${(subject.completedLessons / subject.totalLessons) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Lessons</h2>
        
        {subjectLessons.map((lesson, index) => {
          const isCompleted = isLessonCompleted(lesson.id);
          const score = getLessonScore(lesson.id);
          
          return (
            <div
              key={lesson.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-sm font-medium text-gray-500">Lesson {index + 1}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                        {lesson.difficulty}
                      </span>
                      {isCompleted && (
                        <div className="flex items-center space-x-1 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Completed</span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{lesson.title}</h3>
                    <p className="text-gray-600 mb-4">{lesson.description}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{lesson.duration} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>{lesson.steps.length} steps</span>
                      </div>
                      {isCompleted && score > 0 && (
                        <div className="flex items-center space-x-1 text-yellow-600">
                          <Star className="w-4 h-4 fill-current" />
                          <span>{score}% score</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onLessonSelect(lesson)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                  >
                    <Play className="w-4 h-4" />
                    <span>{isCompleted ? 'Review' : 'Start'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}