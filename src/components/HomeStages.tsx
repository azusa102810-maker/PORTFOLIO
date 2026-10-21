import React from 'react';
import { ArrowRight, Sparkles, Briefcase, FolderGit2, Mail } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface HomeStagesProps {
  currentStage: number | null;
  onNavigate: (page: 'about' | 'projects' | 'contact') => void;
}

export const HomeStages: React.FC<HomeStagesProps> = ({ currentStage, onNavigate }) => {
  if (currentStage === null) return null;

  return (
    <div className="absolute top-24 left-0 right-0 z-20 flex items-center justify-center pointer-events-none px-4 transition-all duration-300">
      <div className="pointer-events-auto max-w-xl w-full">
        {currentStage === 1 && (
          <div className="neo-brutalism-white py-5 px-6 sm:px-8 text-center animate-in fade-in zoom-in-95 duration-200">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 leading-snug">
              你好，我是 <span className="text-blue-600 font-extrabold">{PROFILE.shortName}</span> 👋
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 font-medium">
              来自 {PROFILE.location} 的 {PROFILE.tagline}
            </p>
            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>左右拖动小岛或使用 ← → 方向键探索世界</span>
            </div>
          </div>
        )}

        {currentStage === 2 && (
          <div className="neo-brutalism-white py-5 px-6 sm:px-8 text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 mb-3 shadow-sm">
              <Briefcase className="w-5 h-5" />
            </div>
            <p className="text-base sm:text-lg font-semibold text-slate-800 leading-relaxed max-w-md">
              在扎实的技术学习与项目实战中，掌握了现代全栈开发与 3D 交互技术栈。
            </p>
            <button
              onClick={() => onNavigate('about')}
              className="mt-4 neo-brutalism-blue px-6 py-2.5 font-semibold text-sm sm:text-base flex items-center gap-2 cursor-pointer"
            >
              <span>了解更多 · About</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {currentStage === 3 && (
          <div className="neo-brutalism-white py-5 px-6 sm:px-8 text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-3 shadow-sm">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <p className="text-base sm:text-lg font-semibold text-slate-800 leading-relaxed max-w-md">
              主导并实践了多个全栈、AI SaaS 项目，好奇它们的技术细节？
            </p>
            <button
              onClick={() => onNavigate('projects')}
              className="mt-4 neo-brutalism-blue px-6 py-2.5 font-semibold text-sm sm:text-base flex items-center gap-2 cursor-pointer bg-emerald-600 hover:bg-emerald-700"
            >
              <span>浏览作品 · Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {currentStage === 4 && (
          <div className="neo-brutalism-white py-5 px-6 sm:px-8 text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-10 h-10 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-600 mb-3 shadow-sm">
              <Mail className="w-5 h-5" />
            </div>
            <p className="text-base sm:text-lg font-semibold text-slate-800 leading-relaxed max-w-md">
              想要交流技术想法、探讨项目合作？随时欢迎联系！
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="mt-4 neo-brutalism-blue px-6 py-2.5 font-semibold text-sm sm:text-base flex items-center gap-2 cursor-pointer bg-purple-600 hover:bg-purple-700"
            >
              <span>与我交流 · Contact</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
