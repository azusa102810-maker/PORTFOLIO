import React, { useState } from 'react';
import { 
  ArrowRight, 
  Briefcase, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink,
  Award,
  GraduationCap,
  Layers,
  Zap,
  Server,
  Terminal,
  Video,
  FileText,
  Search,
  Network,
  Presentation,
  ShieldCheck,
  Phone,
  MessageCircle,
  Copy,
  Check,
  Flame,
  Layout,
  Table,
  Cpu,
  Globe,
  Truck,
  Users,
  Compass
} from 'lucide-react';
import { PROFILE, SKILLS, EXPERIENCES, Skill } from '../data/portfolioData';

interface AboutPageProps {
  onNavigate: (page: 'home' | 'about' | 'projects' | 'contact') => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'agent' | 'engineering' | 'creative' | 'marketing' | 'solution'>('all');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const categoryLabels: Record<string, string> = {
    all: '全部技能 · All',
    agent: 'AI & 工作流 · Agent',
    engineering: '工程与运维 · Engineering',
    creative: '内容与电商 · Creative',
    marketing: '海外营销 · Marketing',
    solution: '售前与方案 · Solutions',
  };

  const filteredSkills = activeCategory === 'all' 
    ? SKILLS 
    : SKILLS.filter(s => s.category === activeCategory);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'Workflow': return <Zap className="w-6 h-6" />;
      case 'Layers': return <Layers className="w-6 h-6" />;
      case 'Zap': return <Flame className="w-6 h-6" />;
      case 'Bot': return <Cpu className="w-6 h-6" />;
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      case 'Terminal': return <Terminal className="w-6 h-6" />;
      case 'Server': return <Server className="w-6 h-6" />;
      case 'Container': return <Layers className="w-6 h-6" />;
      case 'Video': return <Video className="w-6 h-6" />;
      case 'Layout': return <Layout className="w-6 h-6" />;
      case 'Table': return <Table className="w-6 h-6" />;
      case 'Globe': return <Globe className="w-6 h-6" />;
      case 'PackageCheck': return <CheckCircle2 className="w-6 h-6" />;
      case 'Truck': return <Truck className="w-6 h-6" />;
      case 'Share2': return <Compass className="w-6 h-6" />;
      case 'Users': return <Users className="w-6 h-6" />;
      case 'FileText': return <FileText className="w-6 h-6" />;
      case 'Search': return <Search className="w-6 h-6" />;
      case 'Network': return <Network className="w-6 h-6" />;
      case 'Presentation': return <Presentation className="w-6 h-6" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      default: return <Terminal className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* 1. Header & Personal Profile Card */}
      <section className="mt-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>个人简介 · About Me</span>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              你好，我是 <span className="text-blue-600">{PROFILE.shortName}</span> 👋
            </h1>
            <p className="mt-2 text-base sm:text-xl font-bold text-slate-800">
              {PROFILE.tagline}
            </p>
          </div>

          {/* Quick Contact Badges */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => handleCopy(PROFILE.wechat, 'wechat')}
              className="px-3.5 py-2 rounded-xl border-2 border-slate-900 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold shadow-[2px_2px_0_#0f172a] flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>微信: {PROFILE.wechat}</span>
              {copiedField === 'wechat' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            </button>

            <button
              onClick={() => handleCopy(PROFILE.phone, 'phone')}
              className="px-3.5 py-2 rounded-xl border-2 border-slate-900 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold shadow-[2px_2px_0_#0f172a] flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4 text-blue-600" />
              <span>电话: {PROFILE.phone}</span>
              {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            </button>
          </div>
        </div>

        {/* Education Highlight Card */}
        <div className="mt-6 bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50 border-2 border-slate-900 shadow-[4px_4px_0_#0f172a] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shrink-0 shadow-sm border border-slate-900">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-slate-900 text-base sm:text-lg">
                  {PROFILE.school} · {PROFILE.major}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                主修：人工智能与大数据、计算机网络、操作系统、Linux、数据安全
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold">
              CET-4 / CET-6
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold">
              校二等奖学金
            </span>
          </div>
        </div>

        <p className="mt-5 text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
          {PROFILE.headline}
        </p>
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
          {PROFILE.about}
        </p>

        {/* Social and Action Links */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] hover:shadow-[3px_3px_0_#0f172a] hover:-translate-y-0.5 text-sm font-semibold text-slate-800 transition-all cursor-pointer"
          >
            <Terminal className="w-4 h-4 text-blue-600" />
            <span>GitHub · @Shirleypp012</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
          <a
            href={PROFILE.douyin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black text-white border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] hover:shadow-[3px_3px_0_#0f172a] hover:-translate-y-0.5 text-sm font-semibold transition-all cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>抖音 · 111.5W+ 播放</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
          <a
            href={PROFILE.xiaohongshu}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#ff2442] text-white border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] hover:shadow-[3px_3px_0_#0f172a] hover:-translate-y-0.5 text-sm font-semibold transition-all cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-white"></span>
            <span>小红书 · 图文种草</span>
            <ExternalLink className="w-3.5 h-3.5 text-red-100" />
          </a>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold text-sm border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] hover:shadow-[3px_3px_0_#0f172a] hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <span>与我交流 · Contact</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 2. Multi-Dimensional Profile: 各方位介绍我本人 */}
      <section className="mb-14">
        <div className="flex items-center gap-2 mb-4">
          <Compass className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            多维能力与核心定位 · Multi-Dimensional
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PROFILE.dimensions.map((dim, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-slate-900 rounded-2xl p-5 shadow-[3px_3px_0_#0f172a] hover:shadow-[5px_5px_0_#0f172a] hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center border border-blue-300">
                  0{idx + 1}
                </span>
                <h3 className="font-black text-slate-900 text-sm sm:text-base">
                  {dim.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {dim.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Key Honors & Competition Awards Grid */}
      <section className="mb-14">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            荣誉奖项与学术认证 · Honors & Awards
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="bg-white border-2 border-slate-900 rounded-2xl p-4 shadow-[3px_3px_0_#0f172a]">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-black border border-amber-300">
                省级二等奖
              </span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">
              福建省计算科学与智能创新大赛
            </h4>
            <p className="text-xs text-slate-600 mt-1">
              国产服务器 K8s 集群及开源 3B 大模型部署优化，量化延迟降低 68%
            </p>
          </div>

          <div className="bg-white border-2 border-slate-900 rounded-2xl p-4 shadow-[3px_3px_0_#0f172a]">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[11px] font-black border border-orange-300">
                国家级铜奖
              </span>
              <Award className="w-4 h-4 text-orange-500" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">
              “数信杯”全国隐私计算大赛
            </h4>
            <p className="text-xs text-slate-600 mt-1">
              隐私计算数据资产协同审计平台开发，大模型规则生成与现场方案答辩
            </p>
          </div>

          <div className="bg-white border-2 border-slate-900 rounded-2xl p-4 shadow-[3px_3px_0_#0f172a]">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-black border border-blue-300">
                连续两学年
              </span>
              <GraduationCap className="w-4 h-4 text-blue-600" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">
              校二等奖学金 & 三好学生
            </h4>
            <p className="text-xs text-slate-600 mt-1">
              校级三好学生、优秀共青团员，英语 CET-4 / CET-6，曾任年级办公室部长
            </p>
          </div>
        </div>
      </section>

      {/* 4. Skills Section */}
      <section className="mb-20">
        <div className="mb-5">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            专业技能矩阵 · Technical Skills
          </h2>
        </div>

        {/* Full-width horizontal filter bar spanning the entire row with spacious equal-width layout */}
        <div className="w-full bg-white border-2 border-slate-900 rounded-2xl p-2 shadow-[3px_3px_0_#0f172a] mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {[
              { id: 'all', title: '全部技能', en: 'All' },
              { id: 'agent', title: 'AI & 工作流', en: 'Agent' },
              { id: 'engineering', title: '工程与运维', en: 'Engineering' },
              { id: 'creative', title: '内容与电商', en: 'Creative' },
              { id: 'marketing', title: '海外营销', en: 'Marketing' },
              { id: 'solution', title: '售前与方案', en: 'Solutions' },
            ].map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`w-full py-2.5 px-2 rounded-xl transition-all cursor-pointer flex flex-col items-center justify-center text-center border ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-700 shadow-sm font-bold scale-[1.02]'
                      : 'bg-slate-50/70 hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <span className="text-xs sm:text-[13px] font-black leading-tight">
                    {cat.title}
                  </span>
                  <span
                    className={`text-[10px] sm:text-[11px] font-semibold leading-tight mt-1 tracking-wider ${
                      isActive ? 'text-blue-100' : 'text-slate-500'
                    }`}
                  >
                    {cat.en}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              onClick={() => setSelectedSkill(skill)}
              className="bg-white border-2 border-slate-900 rounded-2xl p-4 shadow-[3px_3px_0_#0f172a] hover:shadow-[5px_5px_0_#0f172a] hover:-translate-y-1 transition-all cursor-pointer flex flex-col items-center text-center group"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                style={{ backgroundColor: skill.bgLight, color: skill.color }}
              >
                {getSkillIcon(skill.icon)}
              </div>
              <h3 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">
                {skill.name}
              </h3>
              <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden border border-slate-200">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${skill.level}%`, backgroundColor: skill.color }}
                />
              </div>
              <span className="text-[11px] font-medium text-slate-500 mt-1">
                {skill.level}% 掌握度
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Internship & Practical Experience Timeline */}
      <section className="mb-20">
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
            <span>实习与实践记录 · Experiences</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            实习历程与商业交付
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            企业研发部实习、安全服务工程师经历、海外营销与韩国供应链对接、自媒体爆款孵化。
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-slate-900 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-10">
          {EXPERIENCES.map((exp, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Marker Dot */}
              <div
                className="absolute -left-[37px] sm:-left-[45px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] flex items-center justify-center font-bold text-xs text-white"
                style={{ backgroundColor: exp.iconBg }}
              >
                {idx + 1}
              </div>

              {/* Experience Card */}
              <div className="bg-white border-2 border-slate-900 rounded-2xl p-5 sm:p-6 shadow-[4px_4px_0_#0f172a] hover:shadow-[6px_6px_0_#0f172a] hover:-translate-y-0.5 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 pb-3 mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      {exp.title}
                    </h3>
                    <p className="text-sm font-semibold text-blue-600">
                      {exp.company_name}
                    </p>
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-600 self-start sm:self-auto">
                    {exp.date}
                  </span>
                </div>

                {/* Bullets */}
                <ul className="space-y-2 mb-4">
                  {exp.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                  {exp.skills.map((s, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CTA Card */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 border-2 border-slate-900 shadow-[6px_6px_0_#0f172a] rounded-3xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            寻找 AI 应用交付工程师 / 海外营销 & KOL 合作？
          </h2>
          <p className="mt-2 text-blue-100 text-sm sm:text-base max-w-xl">
            我具备扎实的大模型应用开发、工作流集成、跨境供应链协调、爆款内容制作与客户交付能力。期待与您探讨实习岗位、项目合作或业务交流！
          </p>
        </div>
        <button
          onClick={() => onNavigate('contact')}
          className="neo-brutalism-white text-slate-900 px-7 py-3 font-bold text-base flex items-center gap-2 cursor-pointer hover:bg-slate-50 transition-all shrink-0"
        >
          <span>立即联系 · Contact</span>
          <ArrowRight className="w-4 h-4 text-blue-600" />
        </button>
      </section>

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-none">
          <div className="bg-white border-2 border-slate-900 shadow-[6px_6px_0_#0f172a] rounded-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: selectedSkill.bgLight, color: selectedSkill.color }}
              >
                {getSkillIcon(selectedSkill.icon)}
              </div>
              <button
                onClick={() => setSelectedSkill(null)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>
            <h3 className="text-xl font-bold text-slate-900">{selectedSkill.name}</h3>
            <p className="text-xs uppercase font-semibold text-slate-500 mt-0.5 tracking-wider">
              所属分类: {categoryLabels[selectedSkill.category] || selectedSkill.category}
            </p>
            <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-3">
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>掌握度评估</span>
                <span style={{ color: selectedSkill.color }}>{selectedSkill.level}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${selectedSkill.level}%`, backgroundColor: selectedSkill.color }}
                />
              </div>
            </div>
            <button
              onClick={() => setSelectedSkill(null)}
              className="mt-5 w-full py-2 bg-slate-900 text-white rounded-xl font-semibold text-sm cursor-pointer"
            >
              关闭 · Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
