import React from 'react';

export default function AdPlaceholder() {
  return (
    <div className="w-full bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center p-4 my-8 min-h-[100px] text-gray-600 text-sm font-medium tracking-wide">
      <div className="flex flex-col items-center gap-2">
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Advertisement</span>
      </div>
    </div>
  );
}
