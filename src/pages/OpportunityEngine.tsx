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
    <div className="space-y-16 py-10 animate-in fade-in duration-500">
      {/* Header Section */}
      <header className="space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
          <div className="space-y-1.5">
            <h1 className="text-4xl font-bold tracking-tight text-white">Opportunities</h1>
            <p className="text-zinc-500 text-[13px] font-medium tracking-tight">Search and execute high-signal projects</p>
          </div>
          <button className="flex items-center justify-center gap-2.5 bg-white text-black h-11 px-8 rounded-xl text-[12px] font-bold hover:bg-zinc-200 transition-all active:scale-95 shadow-xl shadow-white/5">
            <Plus className="w-4 h-4" /> Start Build
          </button>
        </div>

        {/* Global Control Bar */}
        <div className="flex flex-col lg:flex-row gap-4 p-1.5 bg-zinc-950 border border-zinc-900 rounded-2xl">
          <div className="flex-1 relative group">
            <Search className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 transition-colors" />
            <input
              type="text"
              placeholder="Filter by title, domain, or skills..."
              className="w-full bg-transparent pl-14 pr-6 h-12 text-[13px] font-medium text-white placeholder:text-zinc-800 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-1 p-1 overflow-x-auto scrollbar-hide">
            {CATEGORIES_UPGRADED.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`h-10 px-6 rounded-xl text-[12px] font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-zinc-800 text-white border border-zinc-700'
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
        <section className="space-y-8 animate-fade-in-up">
          <div className="flex items-center gap-6">
            <h2 className="font-semibold text-xl tracking-tight text-white shrink-0">Picked for you</h2>
            <div className="h-px flex-1 bg-zinc-900" />
            <span className="text-[11px] font-bold text-accent uppercase tracking-widest">Algorithm matched</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {forYouProjects.map((p) => (
              <ProjectCard 
                key={p.id} 
                project={p} 
                match={p.matchData.score} 
                urgency={p.matchData.urgency} 
                reasoning={p.matchData.reasoning}
                cta="EXECUTE"
              />
            ))}
          </div>
        </section>
      )}

      {/* Project Grid */}
      <section className="space-y-8 animate-fade-in-up">
        <div className="flex items-center gap-6">
          <h2 className="font-semibold text-xl tracking-tight text-white shrink-0">
            {activeCategory === 'For You' ? 'All projects' : `${activeCategory} projects`}
          </h2>
          <div className="h-px flex-1 bg-zinc-900" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p) => (
            <ProjectCard 
              key={p.id} 
              project={p} 
              match={p.matchData.score} 
              urgency={p.matchData.urgency} 
              reasoning={p.matchData.reasoning}
              cta="JOIN" 
            />
          ))}
        </div>
      </section>

      {filtered.length === 0 && (
        <div className="text-center py-32 space-y-3">
          <p className="text-white text-sm font-semibold tracking-tight">No opportunities found</p>
          <p className="text-zinc-600 text-[12px] font-medium">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
};

export default OpportunityEngine;
