import { useState, useMemo } from 'react';
import { mockProjects, mockProfile } from '@/lib/mockData';
import { calculateMatch } from '@/lib/matching';
import ProjectCard from '@/components/ProjectCard';
import { Search, Filter, Plus } from 'lucide-react';

const CATEGORIES_UPGRADED = ['For You', 'Tech', 'Business', 'F&B', 'Media', 'Creative'];

const OpportunityEngine = () => {
  const [activeCategory, setActiveCategory] = useState<string>('For You');
  const [search, setSearch] = useState('');

  const mappedProjects = useMemo(() => {
    return mockProjects.map(p => ({
      ...p,
      matchData: calculateMatch(p, mockProfile)
    })).sort((a, b) => b.matchData.score - a.matchData.score);
  }, []);

  const forYouProjects = mappedProjects.filter(p => p.matchData.score >= 70).slice(0, 2);

  const filtered = mappedProjects.filter((p) => {
    const matchCat = activeCategory === 'For You' || activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                       p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-16 py-8 sm:py-12 px-6 sm:px-12 animate-fade-in-up">
      {/* Header Section */}
      <header className="space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tighter text-white uppercase italic">Opportunity Engine</h1>
            <p className="text-zinc-500 text-sm sm:text-lg uppercase tracking-[0.25em] font-black leading-tight">Algorithm: High-Signal Matching</p>
          </div>
          <button className="flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-zinc-200 transition-all shadow-2xl shadow-white/5 active:scale-95">
            <Plus className="w-4 h-4" /> Start Build
          </button>
        </div>

        {/* Global Control Bar */}
        <div className="flex flex-col lg:flex-row gap-6 p-2 bg-zinc-950 border border-zinc-900 rounded-[20px]">
          <div className="flex-1 relative group">
            <Search className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-white transition-colors" />
            <input
              type="text"
              placeholder="Query execution opportunities..."
              className="w-full bg-transparent pl-14 pr-6 py-4 text-xs font-bold uppercase tracking-[0.1em] text-white placeholder:text-zinc-700 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 p-1 overflow-x-auto scrollbar-hide">
            {CATEGORIES_UPGRADED.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-zinc-800 text-white border border-zinc-700 shadow-xl'
                    : 'text-zinc-600 hover:text-zinc-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* For You Section */}
      {activeCategory === 'For You' && !search && (
        <section className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-6">
            <h2 className="font-display font-black text-2xl tracking-tighter text-white uppercase italic">Recommended For You</h2>
            <div className="h-px flex-1 bg-zinc-900" />
            <span className="text-[9px] font-black text-accent uppercase tracking-widest">High Signal Match</span>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {forYouProjects.map((p) => (
              <ProjectCard 
                key={p.id} 
                project={p} 
                match={p.matchData.score} 
                urgency={p.matchData.urgency} 
                reasoning={p.matchData.reasoning}
                cta="Join & Build"
              />
            ))}
          </div>
        </section>
      )}

      {/* Project Grid */}
      <section className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center gap-6">
          <h2 className="font-display font-black text-2xl tracking-tighter text-white uppercase italic">
            {activeCategory === 'For You' ? 'All Opportunities' : `${activeCategory} Opportunities`}
          </h2>
          <div className="h-px flex-1 bg-zinc-900" />
          <Filter className="w-4 h-4 text-zinc-600" />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p) => (
            <ProjectCard 
              key={p.id} 
              project={p} 
              match={p.matchData.score} 
              urgency={p.matchData.urgency} 
              reasoning={p.matchData.reasoning}
              cta="Contribute" 
            />
          ))}
        </div>
      </section>

      {filtered.length === 0 && (
        <div className="text-center py-24 space-y-4">
          <p className="text-zinc-600 text-xs font-black uppercase tracking-[0.3em]">No Signal Detected</p>
          <p className="text-zinc-800 text-[10px] uppercase tracking-widest">Try resetting your filter parameters</p>
        </div>
      )}
    </div>
  );
};

export default OpportunityEngine;
