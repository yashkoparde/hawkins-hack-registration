import React from 'react';

const GrainOverlay: React.FC = () => {
  return (
    <>
      {/* CSS based SVG Grain defined in index.html, this is the vignette */}
      <div className="fixed inset-0 pointer-events-none z-[100] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-red-900/0 via-red-600/30 to-red-900/0 z-[100] opacity-50" />
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-900/0 via-red-600/30 to-red-900/0 z-[100] opacity-50" />
    </>
  );
};

export default GrainOverlay;