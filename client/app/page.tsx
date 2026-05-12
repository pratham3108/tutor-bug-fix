'use client';

import { useState } from 'react';
import { tutors } from '../data/tutors';
import TutorCard from '../components/TutorCard';

// ─────────────────────────────────────────────────────────────────────────────
// BUG 1 (part a) — Case-Sensitive Subject Dropdown
// Dropdown option VALUES are all lowercase ("math", "physics", …).
// The tutor data uses Title Case ("Math", "Physics", …).
// The filter uses strict equality (===) without .toLowerCase() normalisation,
// so selecting any subject from the dropdown ALWAYS returns zero results.
// Fix: either normalise both sides to the same case, or derive option values
// directly from the data so they match exactly.
// ─────────────────────────────────────────────────────────────────────────────
const SUBJECT_OPTIONS = [
  'math',
  'physics',
  'chemistry',
  'biology',
  'english',
  'history',
  'computer science',
];

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const filteredTutors = tutors.filter((tutor) => {
    // BUG 1 (part b) — Case-Sensitive Name Search
    // String.prototype.includes() is case-sensitive.
    // Typing "alice" will NOT match "Alice Johnson".
    // Fix: tutor.name.toLowerCase().includes(search.toLowerCase())
    const matchesName =
  tutor.name.toLowerCase().includes(search.toLowerCase());

    // BUG 1 (part c) — Subject Filter Never Matches
    // tutor.subject is "Math"; selectedSubject (from dropdown) is "math".
    // Strict equality fails → filtered list is always empty when a subject
    // is selected.
    // Fix: tutor.subject.toLowerCase() === selectedSubject
    const matchesSubject = selectedSubject
  ? tutor.subject.toLowerCase() === selectedSubject
  : true;

    return matchesName && matchesSubject;
  });

  // ─────────────────────────────────────────────────────────────────────────
  // BUG 1 (part d) — "Clear Filters" Is a No-Op
  // Both setters are called with the *current* state values, not empty strings.
  // React bails out of the re-render because nothing changed, so the UI never
  // resets.
  // Fix: setSearch('') and setSelectedSubject('')
  // ─────────────────────────────────────────────────────────────────────────
  const clearFilters = () => {
  setSearch('');
  setSelectedSubject('');
};

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* ── Page Header ── */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find a Tutor</h1>
          <p className="text-gray-500 mt-1">
            Discover expert tutors on Meghdo.
          </p>
        </div>

        {/* ── Filters ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Name search — BUG 1b: case-sensitive */}
          <input
            type="text"
            placeholder="Search by name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
          >
            <option value="">All Subjects</option>
            {SUBJECT_OPTIONS.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-300 rounded-lg hover:bg-indigo-50 transition-colors duration-150"
          >
            Clear Filters
          </button>
        </div>

        {/* ── Results count ── */}
        <p className="text-sm text-gray-500 mb-5">
          Showing{' '}
          <span className="font-semibold text-gray-700">
            {filteredTutors.length}
          </span>{' '}
          tutor
        </p>

        {/* ── Tutor Grid ── */}
        {filteredTutors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutors.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-medium">No tutors found.</p>
            <p className="text-sm mt-1">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
