import React from 'react';
import RegisterExperience from './components/RegisterExperience';
import GrainOverlay from './components/GrainOverlay';
import CursorBlood from './components/CursorBlood';

export default function App() {
  return (
    <main className="w-full bg-black min-h-screen">
      <GrainOverlay />
      <CursorBlood />
      <RegisterExperience />
    </main>
  );
}