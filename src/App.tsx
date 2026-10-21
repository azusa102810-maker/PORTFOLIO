/**
 * 3D Developer Portfolio Replication
 * Inspired by Adrian Hajdin / JavaScript Mastery 3D Portfolio
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { IslandCanvas } from './components/canvas/IslandCanvas';
import { HomeStages } from './components/HomeStages';
import { IslandControlDock } from './components/IslandControlDock';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'projects' | 'contact'>('home');
  const [currentStage, setCurrentStage] = useState<number | null>(1);
  const [targetStageAngle, setTargetStageAngle] = useState<number | null>(null);

  const handleNavigate = (page: 'home' | 'about' | 'projects' | 'contact') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectStageAngle = (angle: number) => {
    setTargetStageAngle(angle);
  };

  const handleRotateStep = (direction: 'left' | 'right') => {
    // Dispatch keyboard event for island canvas listener
    const key = direction === 'left' ? 'ArrowLeft' : 'ArrowRight';
    window.dispatchEvent(new KeyboardEvent('keydown', { key }));
  };

  return (
    <div className="relative min-h-screen bg-slate-100 text-slate-800 font-sans selection:bg-blue-500 selection:text-white">
      {/* Top Navigation Bar with AH logo & Audio Toggle */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <main className="w-full min-h-screen">
        {currentPage === 'home' && (
          <div className="relative w-full h-screen overflow-hidden">
            {/* Fullscreen 3D Island & Airplane Canvas */}
            <IslandCanvas
              currentStage={currentStage}
              setCurrentStage={setCurrentStage}
              targetStageAngle={targetStageAngle}
              onClearTargetStageAngle={() => setTargetStageAngle(null)}
            />

            {/* Signature Floating Dialogue Cards for the 4 Stages */}
            <HomeStages
              currentStage={currentStage}
              onNavigate={handleNavigate}
            />

            {/* Collapsible Ergonomic Control Dock at Bottom */}
            <IslandControlDock
              currentStage={currentStage}
              onSelectStageAngle={handleSelectStageAngle}
              onRotateStep={handleRotateStep}
            />
          </div>
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'projects' && (
          <ProjectsPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'contact' && (
          <ContactPage onNavigate={handleNavigate} />
        )}
      </main>
    </div>
  );
}
