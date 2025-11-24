import React from 'react';
import { SignInButton, SignUpButton } from '@clerk/clerk-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">LaunchFolio</h1>
          <div className="flex gap-4">
            <SignInButton mode="modal">
              <button className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-50 transition duration-300 ease-in-out transform hover:scale-105">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Build Your Professional Portfolio in Minutes
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            LaunchFolio makes it easy to create a stunning portfolio website. Add your achievements, projects, education, and social links.
          </p>
          <div className="flex justify-center gap-4">
            <SignUpButton mode="modal">
              <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold text-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-indigo-700">
                Get Started Free
              </button>
            </SignUpButton>
            <SignInButton mode="modal">
              <button className="px-8 py-3 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg font-semibold text-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-indigo-50">
                Sign In
              </button>
            </SignInButton>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white rounded-lg shadow p-8 transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Easy to Build</h3>
            <p className="text-gray-600">Add your details with a simple form. No coding required.</p>
          </div>

          <div className="bg-white rounded-lg shadow p-8 transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Professional Design</h3>
            <p className="text-gray-600">Your portfolio looks polished and professional.</p>
          </div>

          <div className="bg-white rounded-lg shadow p-8 transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
            <div className="text-4xl mb-4">🔗</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Share Anywhere</h3>
            <p className="text-gray-600">Get a unique link to share with anyone.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center">
        <p>&copy; 2025 LaunchFolio. All rights reserved.</p>
      </footer>
    </div>
  );
}

