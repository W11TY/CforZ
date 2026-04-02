import { mockProfile } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import { Zap, FolderOpen, Users, Trophy } from 'lucide-react';

const Profile = () => {
  const profile = mockProfile;

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-display font-bold">
            {profile.name[0]}
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold">{profile.name}</h1>
            <p className="text-sm text-muted-foreground">{profile.username}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: FolderOpen, label: 'Created', value: profile.projectsCreated, color: 'text-primary' },
          { icon: Users, label: 'Joined', value: profile.projectsJoined, color: 'text-info' },
          { icon: Trophy, label: 'Exec Score', value: profile.executionScore, color: 'text-warning' },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-4 text-center">
            <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
            <p className="text-2xl font-display font-bold">{stat.value}</p>
            <p className="text-[11px] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h2 className="font-display font-semibold mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill) => (
            <Badge key={skill} variant="secondary">{skill}</Badge>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="font-display font-semibold mb-3">Recent Activity</h2>
        <div className="space-y-2">
          {profile.recentActivity.map((update) => (
            <div key={update.id} className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{update.projectTitle}</p>
                <p className="text-xs text-muted-foreground">{update.text}</p>
              </div>
              <span className="text-[11px] text-muted-foreground shrink-0">{update.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
