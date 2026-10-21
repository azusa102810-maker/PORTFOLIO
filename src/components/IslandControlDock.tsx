import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { STAGE_ANGLES } from './canvas/IslandCanvas';

interface IslandControlDockProps {
  currentStage: number | null;
  onSelectStageAngle: (angle: number) => void;
  onRotateStep: (direction: 'left' | 'right') => void;
}

export const IslandControlDock: React.FC<IslandControlDockProps> = ({
  currentStage,
  onSelectStageAngle,
  onRotateStep,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const stages = [
    { id: 1, label: '1. Welcome', desc: '海岛探索' },
    { id: 2, label: '2. Skills', desc: '技术栈' },
    { id: 3, label: '3. Projects', desc: '精选项目' },
    { id: 4, label: '4. Contact', desc: '交流联系' },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none w-full max-w-xl px-4">
      {/* Collapse / Expand Tab */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="pointer-events-auto mb-2 bg-white border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] rounded-full px-3.5 py-1 text-xs font-semibold text-slate-800 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer transition-all"
      >
        {isCollapsed ? (
          <>
            <ChevronUp className="w-3.5 h-3.5 text-blue-600" />
            <span>展开控制栏 · Show</span>
          </>
        ) : (
          <>
            <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
            <span>收起控制栏 · Hide</span>
          </>
        )}
      </button>

      {/* Main Dock Container */}
      {!isCollapsed && (
        <div className="pointer-events-auto w-full bg-white/95 border-2 border-slate-900 shadow-[5px_5px_0_#0f172a] rounded-2xl p-3 sm:p-4 flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-150">
          {/* Top row: Rotation Arrow Controls + Stage Jumpers */}
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => onRotateStep('left')}
              className="w-9 h-9 rounded-xl border border-slate-300 hover:border-slate-900 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors cursor-pointer shrink-0"
              title="向左旋转海岛 (← 方向键)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Quick stage selector pills */}
            <div className="grid grid-cols-4 gap-1.5 flex-1">
              {stages.map((stg) => {
                const isActive = currentStage === stg.id;
                return (
                  <button
                    key={stg.id}
                    onClick={() => onSelectStageAngle(STAGE_ANGLES[stg.id])}
                    className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-all text-center cursor-pointer border ${
                      isActive
                        ? 'bg-blue-600 text-white border-blue-700 shadow-sm font-semibold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span className="block truncate font-semibold">{stg.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => onRotateStep('right')}
              className="w-9 h-9 rounded-xl border border-slate-300 hover:border-slate-900 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors cursor-pointer shrink-0"
              title="向右旋转海岛 (→ 方向键)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom row: Guide instructions */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium px-1 border-t border-slate-100 pt-2">
            <div className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              <span>左右拖动屏幕或轻扫以旋转 3D 世界</span>
            </div>
            <span className="hidden sm:inline-block text-slate-400">
              3D Interactive Portfolio
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
