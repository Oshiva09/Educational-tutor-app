import React from 'react';
import { ChevronRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Subject } from '../types';

interface SubjectCardProps {
  subject: Subject;
  onClick: () => void;
}

export default function SubjectCard({ subject, onClick }: SubjectCardProps) {
  const IconComponent = Icons[subject.icon as keyof typeof Icons] as React.ComponentType<any>;
  const progressPercentage = (subject.completedLessons / subject.totalLessons) * 100;

  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
    >
      <div className={`h-32 bg-gradient-to-r ${subject.gradient} rounded-t-xl relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative h-full flex items-center justify-center">
          <IconComponent className="w-12 h-12 text-white" />
        </div>
        <div className="absolute top-4 right-4">
          <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{subject.name}</h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{subject.description}</p>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Progress</span>
            <span className="font-medium text-gray-900">
              {subject.completedLessons} / {subject.totalLessons} lessons
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`bg-gradient-to-r ${subject.gradient} h-2 rounded-full transition-all duration-500 ease-out`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}