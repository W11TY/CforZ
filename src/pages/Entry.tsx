import { useNavigate } from 'react-router-dom';
import { Rocket, Users, Compass } from 'lucide-react';

const Entry = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="max-w-2xl w-full text-center space-y-12 sm:space-y-16 relative z-10 animate-in fade-in zoom-in duration-700">
        <div className="space-y-6">
          <div className="flex justify-center">
            <img src="/XforZ/logo.png" alt="Concept X" className="w-20 h-20 sm:w-24 sm:h-24 object-contain shadow-[0_0_60px_rgba(255,255,255,0.05)]" />
          </div>
          <p className="text-zinc-500 text-base sm:text-xl font-light tracking-[0.1em] uppercase px-4 leading-relaxed">
            Built for the few who execute.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-56 group flex flex-col items-start gap-4 p-6 sm:p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-500 transition-all duration-500 cursor-pointer text-left active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center group-hover:bg-primary transition-all duration-500">
              <Rocket className="w-5 h-5 text-zinc-400 group-hover:text-white" />
            </div>
            <div className="space-y-1">
              <p className="font-display font-bold text-sm text-white uppercase tracking-wider text-shadow">Start Building</p>
              <p className="text-[10px] sm:text-[11px] text-zinc-500 leading-relaxed uppercase tracking-tighter">Initiate a new project</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/opportunity')}
            className="w-full sm:w-56 group flex flex-col items-start gap-4 p-6 sm:p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-500 transition-all duration-500 cursor-pointer text-left active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center group-hover:bg-primary transition-all duration-500">
              <Users className="w-5 h-5 text-zinc-400 group-hover:text-white" />
            </div>
            <div className="space-y-1">
              <p className="font-display font-bold text-sm text-white uppercase tracking-wider text-shadow">Find Pulse</p>
              <p className="text-[10px] sm:text-[11px] text-zinc-500 leading-relaxed uppercase tracking-tighter">Join active execution</p>
            </div>
          </button>
        </div>

        <div className="pt-8 sm:pt-12">
          <button onClick={() => navigate('/feed')} className="text-[9px] sm:text-[10px] text-zinc-600 uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold hover:text-white transition-colors active:scale-95">
            Enter global pulse →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Entry;
