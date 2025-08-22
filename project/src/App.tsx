import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import LessonList from './components/LessonList';
import LessonViewer from './components/LessonViewer';
import Profile from './components/Profile';
import { mockUser, subjects, lessons } from './data/mockData';
import { Subject, Lesson, User } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';

type View = 'dashboard' | 'lessons' | 'lesson';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useLocalStorage<User>('tutorAI_user', mockUser);

  // AI-powered recommendation system
  const getAIRecommendation = (): Subject | null => {
    const userScores = user.quizScores;
    const completedLessons = user.completedLessons;

    // Find subjects with lessons in progress
    const subjectsWithProgress = subjects.map(subject => {
      const subjectLessons = lessons.filter(l => l.subjectId === subject.id);
      const completedSubjectLessons = subjectLessons.filter(l => completedLessons.includes(l.id));
      const avgScore = completedSubjectLessons.length > 0
        ? completedSubjectLessons.reduce((sum, lesson) => sum + (userScores[lesson.id] || 0), 0) / completedSubjectLessons.length
        : 0;
      
      return {
        ...subject,
        avgScore,
        hasProgress: completedSubjectLessons.length > 0 && completedSubjectLessons.length < subjectLessons.length
      };
    });

    // AI Logic: Recommend based on performance and progress
    // 1. If user scored < 70% in any subject, recommend continuing that subject
    const needsImprovement = subjectsWithProgress.find(s => s.avgScore > 0 && s.avgScore < 70);
    if (needsImprovement) return needsImprovement;

    // 2. If user has progress in a subject, recommend continuing it
    const inProgress = subjectsWithProgress.find(s => s.hasProgress);
    if (inProgress) return inProgress;

    // 3. If user scored 80%+ in a subject, recommend the next logical subject
    const mastered = subjectsWithProgress.filter(s => s.avgScore >= 80);
    if (mastered.length > 0) {
      // Simple progression logic: Calculus -> Programming -> Statistics -> Physics
      const progression = ['calculus', 'programming', 'statistics', 'physics'];
      const masteredIds = mastered.map(s => s.id);
      
      for (const id of progression) {
        if (!masteredIds.includes(id)) {
          return subjects.find(s => s.id === id) || null;
        }
      }
    }

    // 4. Default to first available subject
    return subjects.find(s => s.completedLessons === 0) || subjects[0];
  };

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
    setCurrentView('lessons');
  };

  const handleLessonSelect = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setCurrentView('lesson');
  };

  const handleLessonComplete = (score: number) => {
    if (selectedLesson) {
      const updatedUser = {
        ...user,
        completedLessons: user.completedLessons.includes(selectedLesson.id)
          ? user.completedLessons
          : [...user.completedLessons, selectedLesson.id],
        quizScores: {
          ...user.quizScores,
          [selectedLesson.id]: score
        },
        totalPoints: user.totalPoints + Math.round(score * 10), // 10 points per percentage point
        streak: user.streak // In real app, this would be calculated based on daily activity
      };

      setUser(updatedUser);

      // Update subject completion count
      const subjectLessons = lessons.filter(l => l.subjectId === selectedLesson.subjectId);
      const completedSubjectLessons = subjectLessons.filter(l => 
        updatedUser.completedLessons.includes(l.id)
      ).length;

      // Update subjects state (in real app, this would be in a global state manager)
      const updatedSubjects = subjects.map(s => 
        s.id === selectedLesson.subjectId 
          ? { ...s, completedLessons: completedSubjectLessons }
          : s
      );
    }
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedSubject(null);
    setSelectedLesson(null);
  };

  const handleBackToLessons = () => {
    setCurrentView('lessons');
    setSelectedLesson(null);
  };

  // Update subjects with real-time progress
  const updatedSubjects = subjects.map(subject => {
    const subjectLessons = lessons.filter(l => l.subjectId === subject.id);
    const completedSubjectLessons = subjectLessons.filter(l => 
      user.completedLessons.includes(l.id)
    ).length;
    
    return {
      ...subject,
      completedLessons: completedSubjectLessons
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Header user={user} onProfileClick={() => setShowProfile(true)} />
      
      <main>
        {currentView === 'dashboard' && (
          <Dashboard
            user={user}
            subjects={updatedSubjects}
            onSubjectSelect={handleSubjectSelect}
          />
        )}
        
        {currentView === 'lessons' && selectedSubject && (
          <LessonList
            subject={selectedSubject}
            lessons={lessons}
            user={user}
            onBack={handleBackToDashboard}
            onLessonSelect={handleLessonSelect}
          />
        )}
        
        {currentView === 'lesson' && selectedLesson && (
          <LessonViewer
            lesson={selectedLesson}
            user={user}
            onBack={handleBackToLessons}
            onComplete={handleLessonComplete}
          />
        )}
      </main>

      {showProfile && (
        <Profile user={user} onClose={() => setShowProfile(false)} />
      )}
    </div>
  );
}

export default App;