import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Send, 
  Mail, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  Github, 
  MessageSquare
} from 'lucide-react';
import { FoxCanvas } from '../components/canvas/FoxCanvas';
import { FoxAnimationState } from '../components/canvas/FoxModel';
import { PROFILE } from '../data/portfolioData';
import { soundEngine } from '../utils/audioSynth';

interface ContactPageProps {
  onNavigate: (page: 'home' | 'about' | 'projects' | 'contact') => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [foxState, setFoxState] = useState<FoxAnimationState>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    setFoxState('typing');
  };

  const handleFocus = () => {
    setFoxState('focused');
  };

  const handleBlur = () => {
    if (!isSubmitting && !isSubmitted) {
      setFoxState('idle');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    setFoxState('submitting');

    // Simulate reliable message dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFoxState('success');

      // Trigger celebration sound & confetti
      soundEngine.playSuccessSound();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Fallback gracefully
      }
    }, 1200);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleResetForm = () => {
    setFormState({ name: '', email: '', message: '' });
    setIsSubmitted(false);
    setFoxState('idle');
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-8 max-w-6xl mx-auto">
      {/* 1. Header intro */}
      <section className="mt-4 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-4">
          <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
          <span>与我取得联系 · Contact</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          随时与我 <span className="text-blue-600">交流联系</span>
        </h1>
        <p className="mt-3 text-slate-600 text-base sm:text-lg max-w-2xl">
          无论是探讨技术实现、实习合作、开源贡献，或是交流任何感兴趣的开发话题，都非常期待与你沟通！
        </p>
      </section>

      {/* 2. Split Layout: Contact Form + 3D Fox Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Contact Form Card (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white border-2 border-slate-900 shadow-[6px_6px_0_#0f172a] rounded-3xl p-6 sm:p-8">
            {isSubmitted ? (
              <div className="text-center py-10 animate-in fade-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-slate-900 text-emerald-600 mx-auto flex items-center justify-center mb-4 shadow-[3px_3px_0_#0f172a]">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  留言已成功发送！
                </h3>
                <p className="mt-2 text-slate-600 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
                  感谢你的来信，<span className="font-semibold text-slate-800">{formState.name}</span>！3D 灵狐已经将留言妥善送达，我会尽快回复至你的邮箱 <span className="font-semibold text-blue-600">{formState.email}</span>。
                </p>

                <button
                  onClick={handleResetForm}
                  className="mt-6 neo-brutalism-blue px-6 py-2.5 font-bold text-sm cursor-pointer"
                >
                  发送另一则留言
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-slate-800 mb-1.5">
                    您的姓名 / Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="例如：张同学 / John"
                    value={formState.name}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 focus:border-slate-900 focus:ring-0 outline-none text-slate-800 font-medium placeholder:text-slate-400 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-slate-800 mb-1.5">
                    联系邮箱 / Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="your-email@domain.com"
                    value={formState.email}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 focus:border-slate-900 focus:ring-0 outline-none text-slate-800 font-medium placeholder:text-slate-400 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-slate-800 mb-1.5">
                    留言内容 / Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="想聊聊您的项目想法、合作机会或者技术交流..."
                    value={formState.message}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 focus:border-slate-900 focus:ring-0 outline-none text-slate-800 font-medium placeholder:text-slate-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 neo-brutalism-blue font-bold text-base flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>灵狐正在递送信件中...</span>
                    </>
                  ) : (
                    <>
                      <span>发送留言 · Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right: Interactive 3D Fox Scene (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full bg-gradient-to-b from-sky-100 to-indigo-50 border-2 border-slate-900 shadow-[6px_6px_0_#0f172a] rounded-3xl overflow-hidden relative">
            <FoxCanvas formState={foxState} />
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-slate-500 font-medium flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>在表单中输入或点击，右侧 3D 灵狐将产生实时互动反应</span>
            </p>
          </div>
        </div>
      </div>

      {/* 3. Direct Contact Channels */}
      <section className="mt-14 bg-white border-2 border-slate-900 shadow-[4px_4px_0_#0f172a] rounded-3xl p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6 border-b border-slate-100">
          {/* Email */}
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/60 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase">电子邮箱 · Email</span>
                <p className="text-sm font-black text-slate-900 truncate">{PROFILE.email}</p>
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              className="mt-2 w-full py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copiedEmail ? '已复制邮箱' : '复制邮箱地址'}</span>
            </button>
          </div>

          {/* WeChat */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/60 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 font-black text-xs">
                微
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase">微信号 · WeChat</span>
                <p className="text-sm font-black text-slate-900">{PROFILE.wechat}</p>
              </div>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(PROFILE.wechat);
                setCopiedEmail(true);
                setTimeout(() => setCopiedEmail(false), 2000);
              }}
              className="mt-2 w-full py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all"
            >
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span>复制微信号</span>
            </button>
          </div>

          {/* Phone */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 font-black text-xs">
                电
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase">手机号码 · Phone</span>
                <p className="text-sm font-black text-slate-900">{PROFILE.phone}</p>
              </div>
            </div>
            <a
              href={`tel:${PROFILE.phone}`}
              className="mt-2 w-full py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all"
            >
              <span>拨打电话 / 联系</span>
            </a>
          </div>
        </div>

        {/* Social channels: Douyin, Xiaohongshu, GitHub */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-xs font-semibold text-slate-500">
            社交媒体与平台主页 · Social Channels:
          </span>
          <div className="flex flex-wrap items-center gap-2.5">
            {/* 抖音 */}
            <a
              href={PROFILE.douyin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl border-2 border-slate-900 bg-black text-white hover:bg-slate-800 shadow-[2px_2px_0_#0f172a] hover:shadow-[3px_3px_0_#0f172a] hover:-translate-y-0.5 flex items-center gap-2 text-xs font-bold transition-all cursor-pointer"
              title="访问我的抖音主页"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
              <span>抖音 · Douyin</span>
            </a>

            {/* 小红书 */}
            <a
              href={PROFILE.xiaohongshu}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl border-2 border-slate-900 bg-[#ff2442] text-white hover:bg-[#e01d37] shadow-[2px_2px_0_#0f172a] hover:shadow-[3px_3px_0_#0f172a] hover:-translate-y-0.5 flex items-center gap-2 text-xs font-bold transition-all cursor-pointer"
              title="访问我的小红书主页"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
              <span>小红书 · RED</span>
            </a>

            {/* GitHub */}
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl border-2 border-slate-900 bg-white text-slate-800 hover:bg-slate-50 shadow-[2px_2px_0_#0f172a] hover:shadow-[3px_3px_0_#0f172a] hover:-translate-y-0.5 flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer"
              title="访问我的 GitHub 主页"
            >
              <Github className="w-4 h-4 text-slate-900" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </section>

      {/* 4. Social Cards Grid for Easy Discovery */}
      <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* 抖音卡片 */}
        <a
          href={PROFILE.douyin}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white border-2 border-slate-900 shadow-[4px_4px_0_#0f172a] hover:shadow-[6px_6px_0_#0f172a] hover:-translate-y-0.5 rounded-2xl p-5 transition-all flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-sm shrink-0 border border-slate-700 shadow-sm">
              <span className="text-cyan-400 mr-0.5">抖</span>
              <span className="text-rose-400">音</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                  我的抖音主页
                </h4>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  视频动态
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-mono truncate max-w-[220px]">
                v.douyin.com/qmKLvVURuL0/
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-700 group-hover:text-blue-600 flex items-center gap-1 shrink-0">
            点击进入 ➔
          </span>
        </a>

        {/* 小红书卡片 */}
        <a
          href={PROFILE.xiaohongshu}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white border-2 border-slate-900 shadow-[4px_4px_0_#0f172a] hover:shadow-[6px_6px_0_#0f172a] hover:-translate-y-0.5 rounded-2xl p-5 transition-all flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#ff2442] text-white flex items-center justify-center font-black text-sm shrink-0 border border-red-400 shadow-sm">
              小红书
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-rose-600 transition-colors">
                  我的小红书主页
                </h4>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                  图文笔记
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-mono truncate max-w-[220px]">
                xhslink.cn/o/3oU7UzyayGw
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-700 group-hover:text-rose-600 flex items-center gap-1 shrink-0">
            点击进入 ➔
          </span>
        </a>
      </section>
    </div>
  );
};
