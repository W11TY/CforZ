import { mockProjects, mockExecutionFeed, mockProfile } from '@/lib/mockData';
import { calculateMatch } from '@/lib/matching';
import ProjectCard from '@/components/ProjectCard';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const activeProjects = mockProjects.slice(0, 3);
  
  const suggestedProjects = mockProjects
    .filter(p => p.createdBy !== mockProfile.name)
    .map(p => ({ ...p, matchData: calculateMatch(p, mockProfile) }))
    .sort((a, b) => b.matchData.score - a.matchData.score)
    .slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12 animate-in fade-in duration-700">
      {/* Grid-Based Layout for Header and Content */}
      <div className="grid grid-cols-1 lg:grid-cols-11 gap-8 lg:gap-16">
        {/* Left Column: Title and Active Projects */}
        <div className="lg:col-span-7 space-y-12 sm:space-y-16">
          <header className="space-y-3">
            <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tighter text-white uppercase italic">Dashboard</h1>
            <p className="text-zinc-500 text-sm sm:text-lg uppercase tracking-[0.25em] font-black leading-tight">Execution Engine: Manual Control</p>
          </header>

          <main className="space-y-10 sm:space-y-14">
            <div className="flex items-center justify-between border-l-2 border-primary pl-6">
              <div className="space-y-1">
                <h2 className="font-display font-black text-2xl sm:text-3xl tracking-tight text-white uppercase italic">Active Projects</h2>
                <p className="text-[10px] text-zinc-600 uppercase tracking-[0.4em] font-black">Execution Stack</p>
              </div>
              <button onClick={() => navigate('/opportunity')} className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors shrink-0">
                Expand All →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
              {activeProjects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </main>
        </div>

        {/* Right Column: Actions and Needed Sections */}
        <div className="lg:col-span-4 space-y-12 sm:space-y-16 lg:border-l lg:border-zinc-900 lg:pl-12">
          {/* Quick Actions Header */}
          <div className="flex flex-col gap-4">
            <button onClick={() => navigate('/opportunity')} className="w-full px-8 py-4 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-zinc-200 transition-all shadow-2xl shadow-white/5 active:scale-95">
              New Build
            </button>
            <button onClick={() => navigate('/feed')} className="w-full px-8 py-4 bg-zinc-900 text-white border border-zinc-800 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all active:scale-95">
              Live Pulse
            </button>
          </div>

          <aside className="space-y-10 sm:space-y-14">
            <div className="space-y-1 border-l-2 border-accent pl-6">
              <h2 className="font-display font-black text-xl sm:text-2xl tracking-tight text-white uppercase italic">Needed</h2>
              <p className="text-[10px] text-zinc-600 uppercase tracking-[0.4em] font-black">Signal Match</p>
            </div>
            <div className="space-y-8">
              {suggestedProjects.map((p) => (
                <ProjectCard 
                  key={p.id} 
                  project={p} 
                  match={p.matchData.score} 
                  urgency={p.matchData.urgency} 
                  reasoning={p.matchData.reasoning}
                  cta="Join & Build"
                />
              ))}
              <button 
                onClick={() => navigate('/opportunity')}
                className="w-full py-6 rounded-2xl border border-dashed border-zinc-800 text-[10px] font-black text-zinc-700 hover:text-white hover:border-zinc-500 transition-all uppercase tracking-[0.5em] active:scale-95"
              >
                Search Engine
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* Execution Feed (Full Width within container) */}
      <section className="space-y-12 animate-fade-in-up border-t border-zinc-900 pt-16" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center justify-between border-l-2 border-zinc-700 pl-6">
          <div className="space-y-1">
            <h2 className="font-display font-black text-2xl sm:text-3xl tracking-tight text-white uppercase italic">Pulse</h2>
            <p className="text-[10px] text-zinc-600 uppercase tracking-[0.4em] font-black">Global Execution Feed</p>
          </div>
          <button onClick={() => navigate('/feed')} className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors shrink-0">
            View All Updates →
          </button>
        </div>
        
        <div className="flex flex-col gap-0 border-l border-zinc-900 ml-1">
          {mockExecutionFeed.slice(0, 3).map((update, index) => (
            <div 
              key={update.id} 
              className="relative pl-10 pb-12 last:pb-0 group animate-fade-in-up"
              style={{ animationDelay: `${0.6 + index * 0.1}s` }}
            >
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(59,130,246,0.5)] group-hover:scale-150 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] transition-all duration-500" />
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{update.projectTitle}</span>
                  <span className="text-[10px] text-zinc-700 font-mono italic">{update.timestamp}</span>
                </div>
                <p className="text-xl sm:text-2xl text-zinc-300 leading-tight font-display font-light italic tracking-tight group-hover:text-white transition-colors duration-300">
                  {update.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
