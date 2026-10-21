import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Sparkles, 
  Zap, 
  Check, 
  ArrowRight, 
  X 
} from 'lucide-react';
import { PROJECTS, Project } from '../data/portfolioData';

interface ProjectsPageProps {
  onNavigate: (page: 'home' | 'about' | 'projects' | 'contact') => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categoryFilters = [
    { id: 'All', label: '全部项目 · All' },
    { id: 'AI & Agent', label: 'AI & Agent' },
    { id: '大模型与安全', label: '大模型与安全' },
    { id: '3D & 视觉', label: '3D & 视觉' },
    { id: '海外商业与运营', label: '海外商业与运营' },
  ];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-8 max-w-6xl mx-auto">
      {/* 1. Header Intro */}
      <section className="mt-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-4">
          <FolderGit2 className="w-3.5 h-3.5 text-blue-600" />
          <span>作品精选 · Projects</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          项目与 <span className="text-blue-600">AI 探索作品</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
          涵盖隐私计算数据资产审计平台、新年上上签、金剪卡片（JinJian Cards）、Shirley Chaos 创意实验、Lively Druid 多模态应用、3D 浮岛主页、国产大模型 K8s 集群以及跨境自媒体商业实践。
        </p>

        {/* Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {categoryFilters.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border-2 border-slate-900 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-[3px_3px_0_#0f172a] -translate-y-0.5'
                  : 'bg-white text-slate-700 shadow-[2px_2px_0_#0f172a] hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* 2. Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white border-2 border-slate-900 rounded-3xl overflow-hidden shadow-[4px_4px_0_#0f172a] hover:shadow-[7px_7px_0_#0f172a] hover:-translate-y-1 transition-all flex flex-col justify-between group"
          >
            {/* Header Gradient Banner */}
            <div className={`h-40 bg-gradient-to-tr ${project.gradient} p-6 relative flex flex-col justify-between overflow-hidden`}>
              {/* Decorative background grid effect */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="flex items-center justify-between relative z-10">
                <span className="px-3 py-1 rounded-full bg-white/90 border border-slate-900/10 text-xs font-bold text-slate-800 shadow-sm backdrop-blur-none">
                  {project.category}
                </span>
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="w-8 h-8 rounded-full bg-white/90 text-slate-900 flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
                  title="查看详情与技术规格"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </button>
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-black text-white drop-shadow-sm leading-snug">
                  {project.name}
                </h3>
              </div>
            </div>

            {/* Card Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Highlights List */}
                <div className="mt-4 space-y-1.5">
                  {project.highlights.slice(0, 2).map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag.name}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                      style={{ backgroundColor: `${tag.color}15`, color: tag.color }}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="text-xs font-bold text-slate-800 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                >
                  <span>规格细节 · Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.source_code_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl border border-slate-300 hover:border-slate-900 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                    title="查看 GitHub 源码 / 关联主页"
                  >
                    <Github className="w-4 h-4" />
                  </a>

                  {/* 仅在明确配置了有效 live_demo_link 时才展示“在线演示”按钮，没提到的坚决不展示 */}
                  {project.live_demo_link ? (
                    project.id === '3d-portfolio' ? (
                      <button
                        onClick={() => onNavigate('home')}
                        className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>探索 3D 浮岛</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    ) : (
                      <a
                        href={project.live_demo_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>在线演示</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Bottom CTA */}
      <section className="mt-16 bg-white border-2 border-slate-900 shadow-[5px_5px_0_#0f172a] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              想要交流更多 AI 落地工具或项目合作？
            </h3>
            <p className="text-slate-600 text-sm">
              欢迎访问我的 GitHub 或直接在 Contact 页面联系沟通。
            </p>
          </div>
        </div>
        <a
          href="https://github.com/Shirleypp012"
          target="_blank"
          rel="noopener noreferrer"
          className="neo-brutalism-blue px-6 py-2.5 font-bold text-sm flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Github className="w-4 h-4" />
          <span>访问 GitHub · @Shirleypp012</span>
        </a>
      </section>

      {/* Project Detail Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-none">
          <div className="bg-white border-2 border-slate-900 shadow-[8px_8px_0_#0f172a] rounded-3xl max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className={`p-6 bg-gradient-to-r ${activeModalProject.gradient} text-white flex items-center justify-between`}>
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
                  {activeModalProject.category}
                </span>
                <h3 className="text-2xl font-black mt-2 leading-snug">
                  {activeModalProject.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center font-bold cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              <div>
                <h4 className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-1">
                  项目背景与概述 · Overview
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {activeModalProject.description}
                </p>
              </div>

              {/* Stats Grid */}
              <div>
                <h4 className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-2">
                  核心表现与性能指标
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {activeModalProject.stats.map((stat, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                      <span className="block text-lg font-black text-slate-900">
                        {stat.value}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h4 className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-2">
                  关键技术实现亮点 · Highlights
                </h4>
                <div className="space-y-2">
                  {activeModalProject.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack Tags */}
              <div>
                <h4 className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-2">
                  技术栈 · Tech Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalProject.tags.map((t) => (
                    <span
                      key={t.name}
                      className="px-3 py-1 rounded-lg text-xs font-semibold"
                      style={{ backgroundColor: `${t.color}15`, color: t.color }}
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
              <a
                href={activeModalProject.source_code_link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl border-2 border-slate-900 bg-white text-xs font-bold text-slate-800 flex items-center gap-1.5 hover:bg-slate-100 cursor-pointer shadow-[2px_2px_0_#0f172a]"
              >
                <Github className="w-4 h-4" />
                <span>关联源码 / 主页</span>
              </a>

              {/* 模态框中同样严格遵循：仅存在有效 live_demo_link 时才渲染“启动在线演示” */}
              {activeModalProject.live_demo_link ? (
                activeModalProject.id === '3d-portfolio' ? (
                  <button
                    onClick={() => {
                      setActiveModalProject(null);
                      onNavigate('home');
                    }}
                    className="px-5 py-2 rounded-xl neo-brutalism-blue text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>沉浸式体验 3D 浮岛</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                ) : (
                  <a
                    href={activeModalProject.live_demo_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-xl neo-brutalism-blue text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>启动在线演示 · Live Demo</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
