import React from 'react';
import { X, User, Calendar, Target, Award, BookOpen, TrendingUp } from 'lucide-react';
import { User as UserType } from '../types';

interface ProfileProps {
  user: UserType;
  onClose: () => void;
}

export default function Profile({ user, onClose }: ProfileProps) {
  const joinDate = new Date(user.joinedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const averageScore = Object.values(user.quizScores).length > 0
    ? Math.round(Object.values(user.quizScores).reduce((a, b) => a + b, 0) / Object.values(user.quizScores).length)
    : 0;

  const achievements = [
    { name: 'First Steps', description: 'Completed your first lesson', earned: user.completedLessons.length > 0, icon: '🎯' },
    { name: 'Quiz Master', description: 'Scored 90% or higher on a quiz', earned: Math.max(...Object.values(user.quizScores), 0) >= 90, icon: '🧠' },
    { name: 'Consistent Learner', description: 'Maintained a 7-day streak', earned: user.streak >= 7, icon: '🔥' },
    { name: 'Point Collector', description: 'Earned 1000 points', earned: user.totalPoints >= 1000, icon: '💎' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-white/90">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
              <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900">{user.streak}</div>
              <div className="text-sm text-blue-700">Day Streak</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
              <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-900">{user.totalPoints.toLocaleString()}</div>
              <div className="text-sm text-purple-700">Total Points</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
              <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-900">{user.completedLessons.length}</div>
              <div className="text-sm text-green-700">Lessons Completed</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
              <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-900">{averageScore}%</div>
              <div className="text-sm text-orange-700">Avg Quiz Score</div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Achievements</h3>
            <div className="grid grid-cols-1 gap-3">
              {achievements.map((achievement, index) => (
                <div key={index} className={`flex items-center p-4 rounded-lg border ${
                  achievement.earned
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200'
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="text-2xl mr-4">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                      {achievement.name}
                    </h4>
                    <p className={`text-sm ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.earned && (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Account Info</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-3" />
                <span>Joined {joinDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}