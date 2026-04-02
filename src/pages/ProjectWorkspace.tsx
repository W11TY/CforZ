import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProjects } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle2, Circle, Plus, Zap } from 'lucide-react';

type Tab = 'overview' | 'tasks' | 'team' | 'updates';

const ProjectWorkspace = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = mockProjects.find((p) => p.id === id);
  const [tab, setTab] = useState<Tab>('overview');
  const [newUpdate, setNewUpdate] = useState('');
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState(project?.tasks || []);
  const [updates, setUpdates] = useState(project?.updates || []);

  if (!project) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Project not found.</p>
        <button onClick={() => navigate('/dashboard')} className="text-primary text-sm mt-2 hover:underline">Go back</button>
      </div>
    );
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'tasks', label: 'Tasks' },
    { key: 'team', label: 'Team' },
    { key: 'updates', label: 'Updates' },
  ];

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), title: newTask, completed: false }]);
    setNewTask('');
  };

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)));
  };

  const addUpdate = () => {
    if (!newUpdate.trim()) return;
    setUpdates([
      { id: Date.now().toString(), projectId: project.id, projectTitle: project.title, type: 'progress', text: newUpdate, timestamp: 'Just now' },
      ...updates,
    ]);
    setNewUpdate('');
  };

  return (
    <div className="space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold">{project.title}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary">{project.category}</Badge>
            <Badge variant="outline">{project.stage} Stage</Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="text-2xl font-display font-bold text-primary">{project.progress}%</p>
            <p className="text-[11px] text-muted-foreground">Progress</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              tab === t.key ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === 'overview' && (
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-display font-semibold mb-2">About</h3>
            <p className="text-sm text-muted-foreground">{project.description}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-display font-semibold mb-3">Needed Roles</h3>
            <div className="flex flex-wrap gap-2">
              {project.neededRoles.map((r) => (
                <Badge key={r} variant="secondary">🔧 {r}</Badge>
              ))}
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-display font-semibold mb-2">Progress</h3>
            <div className="w-full h-2 rounded-full bg-secondary mt-2">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${project.progress}%` }} />
            </div>
          </div>
        </div>
      )}

      {tab === 'tasks' && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              className="flex-1 bg-card border border-border rounded-lg px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Add a task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
            />
            <button onClick={addTask} className="bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-medium">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className="flex items-center gap-3 bg-card border border-border rounded-lg p-4 cursor-pointer card-hover"
            >
              {task.completed ? (
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground shrink-0" />
              )}
              <span className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>{task.title}</span>
              {task.assignee && <span className="ml-auto text-[11px] text-muted-foreground">{task.assignee}</span>}
            </div>
          ))}
        </div>
      )}

      {tab === 'team' && (
        <div className="grid sm:grid-cols-2 gap-3">
          {project.team.map((member) => (
            <div key={member.id} className="flex items-center gap-3 bg-card border border-border rounded-xl p-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold font-display">
                {member.avatar}
              </div>
              <div>
                <p className="text-sm font-medium">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
            </div>
          ))}
          {project.team.length === 0 && <p className="text-sm text-muted-foreground col-span-2">No team members yet.</p>}
        </div>
      )}

      {tab === 'updates' && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              className="flex-1 bg-card border border-border rounded-lg px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Post a progress update..."
              value={newUpdate}
              onChange={(e) => setNewUpdate(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addUpdate()}
            />
            <button onClick={addUpdate} className="bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-medium">Post</button>
          </div>
          {updates.map((update) => (
            <div key={update.id} className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm">{update.text}</p>
                <p className="text-[11px] text-muted-foreground mt-1">{update.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectWorkspace;
