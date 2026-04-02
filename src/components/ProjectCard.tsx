import { Project } from '@/lib/mockData';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
  match?: number;
  urgency?: string;
  reasoning?: string;
  cta?: string;
}

const ProjectCard = ({ project, match, urgency, reasoning, cta }: ProjectCardProps) => {
  const navigate = useNavigate();
  const isHighMatch = match && match >= 80;

  return (
    <div
      className={`bg-zinc-900/40 border rounded-[24px] p-6 sm:p-8 hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col gap-5 group h-full relative overflow-hidden ${
        isHighMatch ? 'border-primary/40 shadow-[0_0_20px_rgba(59,130,246,0.05)]' : 'border-zinc-800 hover:border-zinc-500'
      }`}
      onClick={() => navigate(`/project/${project.id}`)}
    >
      {/* High Match Indicator */}
      {match && (
        <div className={`absolute top-0 right-0 px-4 py-1.5 border-b border-l rounded-bl-xl ${
          isHighMatch ? 'bg-primary/10 border-primary/20' : 'bg-zinc-900/50 border-zinc-800'
        }`}>
          <span className={`text-[10px] font-black uppercase tracking-widest ${
            isHighMatch ? 'text-primary' : 'text-zinc-600'
          }`}>
             {isHighMatch ? `Algorithm Pick • ${match}%` : `${match}% Match`}
          </span>
        </div>
      )}
      
      <div className="flex items-start justify-between mt-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-lg font-display font-bold text-white group-hover:bg-primary transition-colors duration-500">
            {project.title[0]}
          </div>
          <div>
            <h3 className="font-display font-semibold text-white tracking-tight">{project.title}</h3>
            {urgency ? (
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isHighMatch ? 'bg-warning' : 'bg-zinc-500'}`} />
                <span className={`text-[9px] font-bold uppercase tracking-widest flex-1 truncate ${isHighMatch ? 'text-warning' : 'text-zinc-500'}`}>{urgency}</span>
              </div>
            ) : (
              <span className={`text-[9px] font-bold uppercase tracking-widest text-zinc-500 mt-0.5 block`}>
                {project.stage} Stage
              </span>
            )}
          </div>
        </div>
      </div>

      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed font-light">{project.description}</p>

      {reasoning && (
        <div className="bg-zinc-950/50 border border-zinc-800/50 rounded-xl p-3 inline-flex items-start gap-2">
           <span className="text-primary font-black mt-[1px]">↳</span>
           <p className="text-[10px] text-zinc-300 font-medium tracking-wide flex-1">{reasoning}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
        {project.neededRoles.map((role) => (
          <span key={role} className="text-[9px] px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold uppercase tracking-widest">
            {role}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-zinc-900 pt-6 mt-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-1.5 rounded-full bg-zinc-900 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-primary" style={{ width: `${project.progress}%` }}>
               <div className="absolute inset-0 bg-white/20 w-full animate-shimmer" />
            </div>
          </div>
          <span className="text-[10px] font-black text-zinc-500 tracking-wider tabular-nums">{project.progress}%</span>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] bg-white text-black px-5 py-2.5 rounded-xl hover:bg-zinc-200 transition-all active:scale-95 shrink-0"
        >
          {cta || 'Execute'} <ChevronDown className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
