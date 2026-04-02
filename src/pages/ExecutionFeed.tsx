import { mockExecutionFeed } from '@/lib/mockData';
import { Zap, Rocket, Users, Flag, TrendingUp } from 'lucide-react';

const iconMap = {
  mvp_launched: Rocket,
  team_formed: Users,
  milestone: Flag,
  progress: TrendingUp,
};

const labelMap = {
  mvp_launched: 'MVP Launched',
  team_formed: 'Team Formed',
  milestone: 'Milestone',
  progress: 'Progress',
};

const ExecutionFeed = () => {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-display font-bold">Execution Feed</h1>
        </div>
        <p className="text-muted-foreground text-sm mt-1">Real progress. Created projects. Real impact.</p>
      </div>

      <div className="space-y-3">
        {mockExecutionFeed.map((update) => {
          const Icon = iconMap[update.type];
          return (
            <div key={update.id} className="bg-card border border-border rounded-xl p-5 card-hover">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display font-semibold text-sm">{update.projectTitle}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                      {labelMap[update.type]}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{update.text}</p>
                </div>
                <span className="text-[11px] text-muted-foreground shrink-0">{update.timestamp}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExecutionFeed;
