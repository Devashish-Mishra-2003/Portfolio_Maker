import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Preview from './pages/Preview';

function App() {
  return (
    <Routes>
      {/* Root route: show LandingPage if signed out, redirect to Dashboard if signed in */}
      <Route
        path="/"
        element={
          <>
            <SignedIn>
              <Navigate to="/dashboard" />
            </SignedIn>
            <SignedOut>
              <div className="min-h-screen">
                <LandingPage />
              </div>
            </SignedOut>
          </>
        }
      />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <SignedIn>
            <Dashboard />
          </SignedIn>
        }
      />
      <Route
        path="/preview"
        element={
          <SignedIn>
            <Preview />
          </SignedIn>
        }
      />

      {/* Redirect all other paths to home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;



