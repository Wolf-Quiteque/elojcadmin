"use client";
import { useState } from 'react';
import { VideoUploader } from './VideoUploader';

export function CourseBuilder() {
  const [step, setStep] = useState(1);
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    price: 0,
    thumbnail: ''
  });

  const handleCreateCourse = async () => {
    // Supabase insertion logic
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto">
      <div className="flex justify-between mb-8">
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className={`flex flex-col items-center ${step >= num ? 'text-blue-600' : 'text-slate-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
              step === num ? 'bg-blue-100 border-2 border-blue-500' : step > num ? 'bg-blue-500 text-white' : 'bg-slate-100'
            }`}>
              {num}
            </div>
            <span className="text-sm">Step {num}</span>
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-800">Course Details</h3>
          {/* Form fields */}
        </div>
      )}

      {step === 2 && (
        <VideoUploader 
          onUploadComplete={(url) => setCourseData({...courseData, thumbnail: url})}
        />
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <button 
          disabled={step === 1}
          onClick={() => setStep(step - 1)}
          className="px-6 py-2 border border-slate-300 rounded-lg disabled:opacity-50"
        >
          Back
        </button>
        <button 
          onClick={() => step < 4 ? setStep(step + 1) : handleCreateCourse()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {step === 4 ? 'Criar curso' : 'Continuar'}
        </button>
      </div>
    </div>
  )
}
