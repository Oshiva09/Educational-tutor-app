import React from 'react';
import { BookOpen, Target, Award, TrendingUp } from 'lucide-react';
import { User, Subject } from '../types';
import SubjectCard from './SubjectCard';

interface DashboardProps {
  user: User;
  subjects: Subject[];
  onSubjectSelect: (subject: Subject) => void;
}

export default function Dashboard({ user, subjects, onSubjectSelect }: DashboardProps) {
  const totalLessons = subjects.reduce((sum, subject) => sum + subject.totalLessons, 0);
  const completedLessons = subjects.reduce((sum, subject) => sum + subject.completedLessons, 0);
  const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  const stats = [
    {
      label: 'Lessons Completed',
      value: completedLessons,
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Current Streak',
      value: `${user.streak} days`,
      icon: Target,
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'Total Points',
      value: user.totalPoints.toLocaleString(),
      icon: Award,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      label: 'Overall Progress',
      value: `${Math.round(overallProgress)}%`,
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const getRecommendedSubject = () => {
    // Simple AI recommendation based on progress
    const inProgress = subjects.find(s => s.completedLessons > 0 && s.completedLessons < s.totalLessons);
    if (inProgress) return inProgress;
    
    return subjects.find(s => s.completedLessons === 0);
  };

  const recommendedSubject = getRecommendedSubject();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user.name.split(' ')[0]}! 👋
        </h2>
        <p className="text-gray-600">Continue your learning journey and reach new heights.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Recommendation */}
      {recommendedSubject && (
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-1 mb-8">
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium text-indigo-600">AI Recommendation</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Continue with {recommendedSubject.name}
                </h3>
                <p className="text-gray-600">
                  Based on your progress, we recommend focusing on {recommendedSubject.name} next.
                </p>
              </div>
              <button
                onClick={() => onSubjectSelect(recommendedSubject)}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
              >
                Start Learning
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subjects Grid */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Subjects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onClick={() => onSubjectSelect(subject)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}