'use client';

import { useState, useId } from 'react';
import { Tutor } from '../data/tutors';

export default function TutorCard({ tutor }: { tutor: Tutor }) {
  // FIX BUG 3 — hydration-safe stable ID
  const sessionId = useId();

  // FIX BUG 2 — loading state to prevent double booking
  const [isLoading, setIsLoading] = useState(false);

  const handleBookNow = async () => {
    if (isLoading) return;

    setIsLoading(true);

    await new Promise<void>((resolve) =>
      setTimeout(resolve, 2000)
    );

    alert(`Success! Booking confirmed for ${tutor.name}!`);

    setIsLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-3 hover:shadow-lg transition-shadow duration-200">
      
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-base font-semibold text-gray-800 leading-tight">
          {tutor.name}
        </h2>
        <span className="shrink-0 text-xs bg-indigo-100 text-indigo-700 font-medium px-2 py-1 rounded-full">
          {tutor.subject}
        </span>
      </div>

      {/* Rating & Price */}
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <span>⭐ {tutor.rating.toFixed(1)}</span>
        <span className="font-semibold text-gray-800">
          ${tutor.price} / hr
        </span>
      </div>

      {/* FIX BUG 3 — hydration-safe session id */}
      <p className="text-xs text-gray-400 font-mono">
        Session ID: {sessionId}
      </p>

      {/* FIX BUG 2 — loading + disabled state */}
      <button
        onClick={handleBookNow}
        disabled={isLoading}
        className={`mt-auto w-full text-white text-sm font-semibold py-2 rounded-lg transition-colors duration-150 ${
          isLoading
            ? 'bg-indigo-300 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800'
        }`}
      >
        {isLoading ? 'Booking...' : 'Book Now'}
      </button>
    </div>
  );
}