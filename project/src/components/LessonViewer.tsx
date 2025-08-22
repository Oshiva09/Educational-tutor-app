import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Play, Award, BookOpen, Brain } from 'lucide-react';
import { Lesson, User } from '../types';

interface LessonViewerProps {
  lesson: Lesson;
  user: User;
  onBack: () => void;
  onComplete: (score: number) => void;
}

export default function LessonViewer({ lesson, user, onBack, onComplete }: LessonViewerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number | null>>({});

  const handleNextStep = () => {
    if (currentStep < lesson.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowQuiz(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleQuizAnswer = (questionId: string, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleQuizSubmit = () => {
    const answers: Record<string, number> = {};
    let correct = 0;
    
    lesson.quiz.questions.forEach(question => {
      const userAnswer = selectedAnswers[question.id];
      if (userAnswer !== null && userAnswer !== undefined) {
        answers[question.id] = userAnswer;
        if (userAnswer === question.correctAnswer) {
          correct++;
        }
      }
    });
    
    setQuizAnswers(answers);
    const score = Math.round((correct / lesson.quiz.questions.length) * 100);
    setQuizScore(score);
    setShowResults(true);
    onComplete(score);
  };

  const isQuizComplete = () => {
    return lesson.quiz.questions.every(q => selectedAnswers[q.id] !== null && selectedAnswers[q.id] !== undefined);
  };

  const renderStepContent = (step: typeof lesson.steps[0]) => {
    switch (step.type) {
      case 'code':
        return (
          <div>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">{step.content}</p>
            {step.codeExample && (
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-green-400 font-mono text-sm overflow-x-auto shadow-lg">
                <div className="flex items-center mb-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="ml-4 text-gray-400 text-xs">{step.language || 'javascript'}</span>
                </div>
                <pre className="text-green-300">{step.codeExample}</pre>
              </div>
            )}
          </div>
        );
      case 'formula':
        return (
          <div>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">{step.content}</p>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg p-6 shadow-sm">
              <div className="text-center">
                <span className="text-blue-900 font-mono text-xl font-medium">{step.content}</span>
              </div>
            </div>
          </div>
        );
      case 'example':
        return (
          <div>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">{step.content}</p>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-lg p-6 shadow-sm">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 mb-2">Example</h4>
                  <p className="text-green-700">{step.content}</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <p className="text-gray-700 leading-relaxed text-lg">{step.content}</p>;
    }
  };

  if (showResults) {
    const getScoreColor = (score: number) => {
      if (score >= 80) return 'from-green-400 to-green-600';
      if (score >= 60) return 'from-yellow-400 to-orange-500';
      return 'from-red-400 to-red-600';
    };

    const getScoreMessage = (score: number) => {
      if (score >= 90) return 'Excellent work! 🌟';
      if (score >= 80) return 'Great job! 👏';
      if (score >= 70) return 'Good effort! 👍';
      if (score >= 60) return 'Keep practicing! 💪';
      return 'Need more review 📚';
    };

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className={`w-24 h-24 bg-gradient-to-r ${getScoreColor(quizScore)} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
            <Award className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
          <p className="text-xl text-gray-600 mb-4">{getScoreMessage(quizScore)}</p>
          <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {quizScore}%
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Quiz Review</h3>
          <div className="space-y-6">
            {lesson.quiz.questions.map((question, index) => {
              const userAnswer = quizAnswers[question.id];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={question.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start mb-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1 ${
                      isCorrect ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {isCorrect ? (
                        <CheckCircle className="w-4 h-4 text-white" />
                      ) : (
                        <span className="text-white text-sm">×</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Question {index + 1}: {question.question}
                      </h4>
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className={`p-3 rounded-lg ${
                            optionIndex === question.correctAnswer
                              ? 'bg-green-100 border border-green-300'
                              : optionIndex === userAnswer && !isCorrect
                                ? 'bg-red-100 border border-red-300'
                                : 'bg-gray-50'
                          }`}>
                            <span className={`${
                              optionIndex === question.correctAnswer
                                ? 'text-green-800 font-medium'
                                : optionIndex === userAnswer && !isCorrect
                                  ? 'text-red-800 font-medium'
                                  : 'text-gray-700'
                            }`}>
                              {option}
                            </span>
                            {optionIndex === question.correctAnswer && (
                              <span className="ml-2 text-green-600 text-sm">✓ Correct</span>
                            )}
                            {optionIndex === userAnswer && !isCorrect && (
                              <span className="ml-2 text-red-600 text-sm">✗ Your answer</span>
                            )}
                          </div>
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm mt-3 italic">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Back to Lessons
          </button>
        </div>
      </div>
    );
  }

  if (showQuiz) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => setShowQuiz(false)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Lesson
        </button>

        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-8 mb-8 text-white">
          <div className="flex items-center mb-4">
            <Brain className="w-8 h-8 mr-3" />
            <h1 className="text-3xl font-bold">Quiz Time!</h1>
          </div>
          <p className="text-white/90 text-lg">Test your understanding of {lesson.title}</p>
        </div>

        <div className="space-y-8">
          {lesson.quiz.questions.map((question, questionIndex) => (
            <div key={question.id} className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-start mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">{questionIndex + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 flex-1">{question.question}</h3>
              </div>
              
              <div className="space-y-3 ml-14">
                {question.options.map((option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedAnswers[question.id] === optionIndex
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={optionIndex}
                      checked={selectedAnswers[question.id] === optionIndex}
                      onChange={() => handleQuizAnswer(question.id, optionIndex)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      selectedAnswers[question.id] === optionIndex
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswers[question.id] === optionIndex && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="text-gray-700 font-medium">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleQuizSubmit}
            disabled={!isQuizComplete()}
            className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 transform ${
              isQuizComplete()
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:scale-105 shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Submit Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentStepData = lesson.steps[currentStep];
  const progress = ((currentStep + 1) / lesson.steps.length) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Lessons
      </button>

      <div className="bg-white rounded-xl shadow-lg mb-8">
        <div className="p-8 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <BookOpen className="w-6 h-6 text-blue-500 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
            </div>
            <span className="text-sm text-gray-500">
              Step {currentStep + 1} of {lesson.steps.length}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{currentStepData.title}</h2>
          {renderStepContent(currentStepData)}
        </div>

        <div className="flex justify-between items-center p-8 border-t border-gray-200">
          <button
            onClick={handlePrevStep}
            disabled={currentStep === 0}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              currentStep === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>

          <button
            onClick={handleNextStep}
            className="flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
          >
            {currentStep === lesson.steps.length - 1 ? (
              <>
                <Play className="w-4 h-4 mr-2" />
                Take Quiz
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}