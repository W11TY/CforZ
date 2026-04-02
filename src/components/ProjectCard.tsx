import { Project } from '@/lib/mockData';
import { ChevronDown, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface ProjectCardProps {
  project: Project;
  match?: number;
  urgency?: string;
  reasoning?: string;
  cta?: string;
  variant?: 'primary' | 'intel' | 'active';
  activity?: string;
  updatedAt?: string;
}

const ProjectCard = ({ project, match, urgency, reasoning, cta, variant = 'primary', activity, updatedAt }: ProjectCardProps) => {
  const navigate = useNavigate();
  const [isJoined, setIsJoined] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const isHighMatch = (match && match >= 70) || variant === 'active';
  const isIntel = variant === 'intel';
  const isActive = variant === 'active';

  const handleJoin = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAnimating(true);
    setTimeout(() => {
      setIsJoined(true);
      setIsAnimating(false);
    }, 600);
  };

  return (
    <div
      className={`bg-card border rounded-2xl transition-all duration-500 cursor-pointer flex flex-col gap-7 group h-full relative interactive-lift elevation-soft ${
        isActive 
          ? 'p-8 sm:p-10 bg-zinc-900 border-border/80' 
          : (isIntel 
              ? 'p-7 sm:p-9 bg-zinc-950 border-accent/20 shadow-[0_0_40px_rgba(175,82,222,0.1)] ring-1 ring-accent/5' 
              : 'p-6 sm:p-8 border-border/60 hover:bg-zinc-900/40')
      }`}
      onClick={() => navigate(`/project/${project.id}`)}
    >
      {/* Live & Freshness Signals */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {match && (
            <div className={`px-3.5 py-1.5 rounded-full border shadow-sm transition-all duration-500 hover:scale-105 ${isIntel ? 'bg-accent/15 border-accent/30 ring-1 ring-accent/20 scale-110 -translate-x-1' : 'bg-primary/10 border-primary/20'}`}>
              <span className={`text-[10px] font-black uppercase tracking-tight ${isIntel ? 'text-accent' : 'text-primary'}`}>
                 {match}% Match
              </span>
            </div>
          )}
          {activity && (
             <div className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full animate-pulse-slow">
               <span className="text-[10px] font-black text-zinc-500 uppercase tracking-tight">
                 {activity}
               </span>
             </div>
          )}
          {isActive && (
            <div className="px-3 py-1 bg-success/10 rounded-full border border-success/20">
               <span className="text-[10px] font-black text-success uppercase tracking-tight animate-pulse">
                 Active Engine
               </span>
             </div>
          )}
        </div>
        {updatedAt && (
           <span className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest tabular-nums">
             {updatedAt}
           </span>
        )}
      </div>
      
      <div className="space-y-5">
        <div className="flex items-center gap-5">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black text-white transition-all duration-300 ${isActive ? 'bg-zinc-950 border border-border/50 shadow-xl' : (isIntel ? 'bg-zinc-950 border border-accent/20' : 'bg-zinc-900 border border-zinc-800')}`}>
            {project.title[0]}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
               <h3 className={`font-black text-white tracking-tight leading-tight transition-all duration-300 group-hover:text-primary/90 ${isActive ? 'text-2xl' : (isIntel ? 'text-xl' : 'text-base')}`}>{project.title}</h3>
               {urgency && <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(255,152,0,0.5)]" />}
            </div>
            <p className="text-[11px] font-bold text-zinc-600 uppercase tracking-[0.2em]">
               {project.createdBy}
            </p>
          </div>
        </div>

        <p className={`text-zinc-500 line-clamp-2 leading-relaxed font-normal ${isActive ? 'text-[15px]' : (isIntel ? 'text-[14px]' : 'text-[13px]')}`}>{project.description}</p>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto pb-2">
        {project.neededRoles.map((role) => (
          <span key={role} className="text-[9px] px-3 py-1.5 rounded-lg bg-zinc-900/50 border border-border text-zinc-600 font-black uppercase tracking-[0.1em] group-hover:border-zinc-700 transition-colors">
            {role}
          </span>
        ))}
      </div>

      {/* Progress & Feedback Section */}
      <div className="flex flex-col gap-6 pt-8 mt-2 border-t border-zinc-900/50">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-5 flex-1 pr-10">
              <div className="flex-1 h-[4px] bg-zinc-950 rounded-full overflow-hidden border border-zinc-900/50 group-hover:border-zinc-800 transition-colors">
                <div 
                  className={`h-full transition-all duration-[2000ms] ease-in-out ${isActive ? 'bg-primary shadow-[0_0_10px_rgba(0,122,255,0.4)]' : (isIntel ? 'bg-accent shadow-[0_0_10px_rgba(175,82,222,0.4)]' : 'bg-zinc-700')}`} 
                  style={{ width: `${project.progress}%` }} 
                />
              </div>
              <span className={`text-[11px] font-black tracking-wider tabular-nums ${isActive ? 'text-primary/70' : (isIntel ? 'text-accent/70' : 'text-zinc-600')}`}>
                {project.progress}%
              </span>
           </div>
           
           <button
             onClick={handleJoin}
             disabled={isJoined || isAnimating}
             className={`relative overflow-hidden flex items-center justify-center text-[12px] font-black uppercase tracking-[0.2em] h-12 px-8 rounded-xl transition-all duration-300 active:scale-95 shrink-0 hover:scale-[1.03] hover:brightness-110 ${
               isJoined 
                 ? 'bg-zinc-900 text-success border border-success/30 scale-[0.98] cursor-default' 
                 : (isActive 
                    ? 'bg-primary text-white shadow-[0_0_30px_rgba(0,122,255,0.3)] hover:shadow-[0_0_40px_rgba(0,122,255,0.5)]' 
                    : (isIntel 
                        ? 'bg-white text-black hover:bg-zinc-200 shadow-[0_0_25px_rgba(175,82,222,0.15)]' 
                        : 'bg-white text-black hover:bg-zinc-200'))
             }`}
           >
             {isAnimating ? (
               <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
             ) : isJoined ? (
               <div className="flex items-center gap-2 animate-in zoom-in-75 duration-300">
                  <Check className="w-4 h-4" />
                  <span>JOINED</span>
               </div>
             ) : (
               <span>{cta || 'JOIN'}</span>
             )}
           </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
