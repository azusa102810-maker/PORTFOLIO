import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Compass, ArrowUp } from 'lucide-react';
import { soundEngine } from '../utils/audioSynth';

interface NavbarProps {
  currentPage: 'home' | 'about' | 'projects' | 'contact';
  onNavigate: (page: 'home' | 'about' | 'projects' | 'contact') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const unsubscribe = soundEngine.subscribe((playing) => {
      setIsPlayingAudio(playing);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleAudio = () => {
    soundEngine.toggle();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 
        Top Navigation Bar:
        Uses absolute positioning instead of fixed so it sits at the top of the page
        and scrolls away naturally, never following down or blocking content.
      */}
      <header className="absolute top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 flex items-center justify-between pointer-events-none">
        {/* Brand Logo (YP / Monogram) */}
        <button
          onClick={() => onNavigate('home')}
          className="pointer-events-auto w-12 h-12 rounded-xl bg-white border-2 border-slate-900 shadow-[3px_3px_0_#0f172a] hover:shadow-[4px_4px_0_#0f172a] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#0f172a] transition-all flex items-center justify-center font-black text-lg text-blue-600 cursor-pointer"
          title="返回 3D 浮岛主页"
        >
          YP
        </button>

        {/* Navigation Links - keeping About, Projects, Contact guiding English words */}
        <nav className="pointer-events-auto flex items-center gap-1.5 sm:gap-2.5 bg-white/95 border-2 border-slate-900 shadow-[4px_4px_0_#0f172a] rounded-2xl px-3 sm:px-4 py-2 font-medium text-sm sm:text-base">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              currentPage === 'home'
                ? 'bg-blue-600 text-white font-semibold'
                : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
            }`}
            title="3D 浮岛探索"
          >
            <Compass className="w-4 h-4 hidden sm:inline-block" />
            <span>Home</span>
          </button>

          <button
            onClick={() => onNavigate('about')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              currentPage === 'about'
                ? 'bg-blue-600 text-white font-semibold'
                : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
            }`}
            title="关于我与技术履历"
          >
            About
          </button>

          <button
            onClick={() => onNavigate('projects')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              currentPage === 'projects'
                ? 'bg-blue-600 text-white font-semibold'
                : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
            }`}
            title="项目作品集展示"
          >
            Projects
          </button>

          <button
            onClick={() => onNavigate('contact')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              currentPage === 'contact'
                ? 'bg-blue-600 text-white font-semibold'
                : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
            }`}
            title="与我交流互动"
          >
            Contact
          </button>
        </nav>

        {/* Audio Controller Button */}
        <div className="pointer-events-auto flex items-center">
          <button
            onClick={handleToggleAudio}
            className={`w-12 h-12 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0_#0f172a] hover:shadow-[4px_4px_0_#0f172a] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#0f172a] transition-all flex items-center justify-center cursor-pointer ${
              isPlayingAudio ? 'bg-amber-400 text-slate-900' : 'bg-white text-slate-600 hover:text-slate-900'
            }`}
            title={isPlayingAudio ? '暂停环境音乐 (Pause)' : '开启环境音乐 (Play Lo-fi)'}
          >
            {isPlayingAudio ? (
              <div className="flex items-center justify-center gap-0.5">
                <Volume2 className="w-5 h-5 text-slate-900" />
              </div>
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      {/* Floating Back to Top Button (appears only when user has scrolled down on non-home pages) */}
      {showBackToTop && currentPage !== 'home' && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 px-3.5 py-2.5 bg-white border-2 border-slate-900 shadow-[3px_3px_0_#0f172a] hover:shadow-[4px_4px_0_#0f172a] hover:-translate-y-0.5 rounded-2xl flex items-center gap-1.5 text-xs font-bold text-slate-800 cursor-pointer transition-all animate-in fade-in zoom-in-95"
          title="回到页面顶部"
        >
          <ArrowUp className="w-4 h-4 text-blue-600" />
          <span>返回顶部</span>
        </button>
      )}
    </>
  );
};
