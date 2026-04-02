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
    <div className="space-y-16 py-12 animate-in fade-in duration-700">
      {/* Grid-Based Layout for Header and Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
        {/* Left Column: Title and Active Projects */}
        <div className="lg:col-span-8 space-y-12">
          <header className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tight text-white mb-2">Dashboard</h1>
            <p className="text-zinc-500 text-[14px] font-medium tracking-tight opacity-80">Manual Control • Project Execution Engine</p>
          </header>

          <main className="space-y-10">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-6">
              <div className="space-y-1">
                <h2 className="font-bold text-2xl tracking-tight text-white">Active Projects</h2>
                <p className="text-[13px] text-zinc-500 font-medium">Your primary execution stack</p>
              </div>
              <button 
                onClick={() => navigate('/opportunity')} 
                className="text-[13px] font-bold text-primary hover:brightness-110 transition-all uppercase tracking-widest"
              >
                Expand all →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {activeProjects.map((p, idx) => (
                <ProjectCard 
                  key={p.id} 
                  project={p} 
                  variant="active" 
                  updatedAt={idx === 0 ? "Active now" : `${idx + 1}h ago`}
                  activity={idx === 0 ? "3 executing" : "Live stack"}
                />
              ))}
            </div>
          </main>
        </div>

        {/* Right Column: Actions and Needed Sections */}
        <div className="lg:col-span-4 space-y-16">
          {/* Quick Actions Header */}
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => navigate('/opportunity')} 
              className="w-full h-12 bg-primary text-white font-bold text-[13px] rounded-xl hover:brightness-110 transition-all active:scale-[0.98] shadow-xl shadow-primary/20 uppercase tracking-widest"
            >
              New Build
            </button>
            <button 
              onClick={() => navigate('/feed')} 
              className="w-full h-12 bg-zinc-900 border border-zinc-800 text-white font-bold text-[13px] rounded-xl hover:bg-zinc-800 transition-all active:scale-[0.98] uppercase tracking-widest"
            >
              Live Pulse
            </button>
          </div>

          <aside className="space-y-8 opacity-60 hover:opacity-100 transition-opacity duration-500">
            <div className="space-y-1 border-b border-zinc-900 pb-4">
              <h2 className="font-bold text-lg tracking-tight text-white/90">Needed</h2>
              <p className="text-[12px] text-zinc-600 font-medium">Subtle match signals</p>
            </div>
            <div className="space-y-6">
              {suggestedProjects.map((p, idx) => (
                 <ProjectCard 
                  key={p.id} 
                  project={p} 
                  match={p.matchData.score} 
                  urgency={p.matchData.urgency} 
                  reasoning={p.matchData.reasoning}
                  cta="Join"
                  variant="intel"
                  updatedAt={idx === 0 ? "New match" : "Today"}
                  activity={idx === 0 ? "+2 viewed" : undefined}
                />
              ))}
            </div>
          </aside>
        </div>
      </div>

      {/* Execution Feed (Full Width within container) */}
      <section className="space-y-10 pt-20 border-t border-zinc-900 opacity-60 hover:opacity-100 transition-opacity duration-500">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="font-bold text-xl tracking-tight text-white/90">Pulse</h2>
            <p className="text-[12px] text-zinc-600 font-medium">Activity and background updates</p>
          </div>
          <button 
            onClick={() => navigate('/feed')} 
            className="text-[12px] font-bold text-zinc-500 hover:text-white transition-all uppercase tracking-widest"
          >
            History →
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockExecutionFeed.slice(0, 3).map((update, index) => (
            <div 
              key={update.id} 
              className="bg-card/50 border border-border/30 p-6 rounded-2xl flex flex-col gap-4 hover:border-zinc-800 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <div className="w-1 h-1 rounded-full bg-zinc-700 group-hover:bg-success transition-colors" />
                   <span className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest group-hover:text-zinc-500">{update.projectTitle}</span>
                 </div>
                 <span className="text-[10px] text-zinc-900 font-mono font-bold">{update.timestamp}</span>
              </div>
              <p className="text-[14px] text-zinc-500 font-medium leading-relaxed group-hover:text-zinc-300 transition-colors">
                {update.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
