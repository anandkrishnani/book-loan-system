'use client';

import { useState } from 'react';
import BookList from './components/BookList';
import Inventory from './components/Inventory';

export default function Home() {
  const [activeSection, setActiveSection] = useState<'loans' | 'inventory'>('loans');

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Library Management System</h1>
        
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4 bg-white rounded-lg p-2 shadow">
            <button
              onClick={() => setActiveSection('loans')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeSection === 'loans'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Books on Loan
            </button>
            <button
              onClick={() => setActiveSection('inventory')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeSection === 'inventory'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Book Inventory
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto">
          {activeSection === 'loans' ? <BookList /> : <Inventory />}
        </div>
      </div>
    </main>
  );
}
