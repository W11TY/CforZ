import { useNavigate } from 'react-router-dom';
import { mockExecutionFeed } from '@/lib/mockData';
import { Rocket, Users, Flag, TrendingUp, Zap } from 'lucide-react';

const iconMap = {
  mvp_launched: Rocket,
  team_formed: Users,
  milestone: Flag,
  progress: TrendingUp,
};

const labelMap = {
  mvp_launched: 'MVP Launched',
  team_formed: 'Team Formed',
  milestone: 'Milestone Hits',
  progress: 'Growth/Metric',
};

const ExecutionFeed = () => {
  const navigate = useNavigate();

  // Highlighted major updates for top section
  const highlights = mockExecutionFeed.filter(u => u.type === 'mvp_launched' || u.type === 'milestone').slice(0, 2);

  return (
    <div className="space-y-12 py-12 animate-in fade-in duration-1000">
      {/* Top Status Area */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_12px_rgba(0,122,255,0.6)]" />
            <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">Pulse</h1>
          </div>
          <div className="flex items-center gap-4 text-[13px] font-bold tracking-widest text-zinc-500 uppercase">
             <span className="flex items-center gap-1.5 text-white">
               <span className="w-1.5 h-1.5 rounded-full bg-success" />
               142 Building Now
             </span>
             <span className="text-zinc-800">•</span>
             <span>3 Shipped today</span>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full">
           <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Active System: NODE 01</span>
        </div>
      </header>

      {/* Achievement Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {highlights.map((update) => (
          <div 
            key={`highlight-${update.id}`}
            className="group relative bg-zinc-950 border border-primary/20 p-8 rounded-3xl overflow-hidden hover:border-primary/40 transition-all duration-500 cursor-pointer"
            onClick={() => navigate(`/project/${update.id}`)}
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 blur-2xl group-hover:opacity-20 transition-opacity">
               <Rocket className="w-32 h-32 text-primary" />
            </div>
            <div className="relative space-y-6">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 bg-primary/20 border border-primary/30 rounded-full">
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest">Major Achievement</span>
                </div>
                <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest">Just Now</span>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-white tracking-tight leading-tight">{update.projectTitle}</h2>
                <p className="text-zinc-400 font-medium leading-relaxed">{update.text}</p>
              </div>
              <div className="flex items-center justify-between pt-4">
                 <span className="text-primary font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">View Achievement →</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Real-time Stream */}
      <main className="space-y-8">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-6">
           <h2 className="text-xl font-black text-white uppercase tracking-tighter">Live Stream</h2>
           <span className="text-[11px] font-bold text-zinc-700 uppercase tracking-widest">Node synchronized</span>
        </div>

        <div className="space-y-4">
          {mockExecutionFeed.map((update, index) => {
            const Icon = iconMap[update.type];
            const isRecent = update.timestamp.includes('h') && parseInt(update.timestamp) <= 6;
            
            return (
              <div 
                key={update.id} 
                className={`group relative bg-card border transition-all duration-500 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:-translate-y-1 hover:bg-zinc-900/40 hover:border-zinc-800 elevation-soft animate-in fade-in slide-in-from-bottom-2`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 ${
                    update.type === 'mvp_launched' ? 'bg-primary/10 border border-primary/20 text-primary shadow-[0_0_15px_rgba(0,122,255,0.15)]' :
                    update.type === 'team_formed' ? 'bg-success/10 border border-success/20 text-success shadow-[0_0_15px_rgba(52,199,89,0.15)]' :
                    update.type === 'milestone' ? 'bg-purple-500/10 border border-purple-500/20 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)]' :
                    'bg-orange-500/10 border border-orange-500/20 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.15)]'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs font-black text-white uppercase tracking-widest">Arjun</span>
                      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                        {update.type === 'mvp_launched' ? 'SHIPPED' : update.type === 'team_formed' ? 'JOINED' : update.type === 'milestone' ? 'REACHED' : 'BUILT'}
                      </span>
                      <h3 className="text-sm font-black text-white uppercase tracking-[0.05em] group-hover:text-primary transition-colors cursor-pointer" onClick={() => navigate(`/project/${update.id}`)}>
                        {update.projectTitle}
                      </h3>
                    </div>
                    <p className="text-[14px] text-zinc-500 font-medium leading-relaxed max-w-xl">
                       {update.text}
                    </p>
                    {index === 0 && (
                       <span className="text-[10px] font-black text-primary/60 uppercase tracking-widest block pt-1">Because you match this domain</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-8 shrink-0">
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-[11px] font-black uppercase tracking-widest tabular-nums ${isRecent ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      {update.timestamp}
                    </span>
                    {isRecent && <span className="text-[9px] font-bold text-primary uppercase animate-pulse">Active Now</span>}
                  </div>
                  
                  {/* Quick Action Overlay */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 hidden sm:flex">
                     <button className="px-5 py-2 bg-zinc-900 border border-zinc-800 text-[10px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all rounded-lg">View</button>
                     {update.type === 'team_formed' && <button className="px-5 py-2 bg-primary text-white text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all rounded-lg">Join</button>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default ExecutionFeed;
