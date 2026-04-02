export type ProjectStage = 'Idea' | 'Building' | 'MVP' | 'Scaling';
export type Category = 'Tech' | 'Business' | 'Creative' | 'F&B' | 'Media' | 'Events' | 'Fashion';

export interface Project {
  id: string;
  title: string;
  category: Category;
  stage: ProjectStage;
  description: string;
  neededRoles: string[];
  members: number;
  progress: number;
  createdBy: string;
  updates: Update[];
  tasks: Task[];
  team: TeamMember[];
}

export interface Update {
  id: string;
  projectId: string;
  projectTitle: string;
  type: 'milestone' | 'team_formed' | 'mvp_launched' | 'progress';
  text: string;
  timestamp: string;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  assignee?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface UserProfile {
  name: string;
  username: string;
  projectsCreated: number;
  projectsJoined: number;
  executionScore: number;
  skills: string[];
  recentActivity: Update[];
}

export const CATEGORIES: Category[] = ['Tech', 'Business', 'Creative', 'F&B', 'Media', 'Events', 'Fashion'];

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Specialty Cafe',
    category: 'F&B',
    stage: 'Idea',
    description: 'Do tapas fria with live music and craft cocktails.',
    neededRoles: ['Chef', 'Branding'],
    members: 4,
    progress: 25,
    createdBy: 'Arjun',
    updates: [
      { id: 'u1', projectId: '1', projectTitle: 'Specialty Cafe', type: 'milestone', text: 'Location scouting completed', timestamp: '2h ago' },
    ],
    tasks: [
      { id: 't1', title: 'Finalize menu concept', completed: true, assignee: 'Arjun' },
      { id: 't2', title: 'Brand identity design', completed: false, assignee: 'Maya' },
      { id: 't3', title: 'Location research', completed: true },
    ],
    team: [
      { id: 'tm1', name: 'Arjun', role: 'Founder', avatar: 'A' },
      { id: 'tm2', name: 'Maya', role: 'Designer', avatar: 'M' },
    ],
  },
  {
    id: '2',
    title: 'Gen Z Media Brand',
    category: 'Media',
    stage: 'Building',
    description: 'Do big bets in the creative industry, create hits.',
    neededRoles: ['Shoot', 'Messaging'],
    members: 6,
    progress: 60,
    createdBy: 'Priya',
    updates: [
      { id: 'u2', projectId: '2', projectTitle: 'Gen Z Media Brand', type: 'team_formed', text: 'Core team of 6 assembled', timestamp: '1d ago' },
    ],
    tasks: [
      { id: 't4', title: 'Content strategy doc', completed: true },
      { id: 't5', title: 'First video shoot', completed: false },
    ],
    team: [
      { id: 'tm3', name: 'Priya', role: 'Creator', avatar: 'P' },
      { id: 'tm4', name: 'Sam', role: 'Editor', avatar: 'S' },
    ],
  },
  {
    id: '3',
    title: 'VisionAI',
    category: 'Tech',
    stage: 'MVP',
    description: 'Developer-poor and business assistance-oriented tech setup.',
    neededRoles: ['Frontend Dev', 'ML Engineer'],
    members: 3,
    progress: 45,
    createdBy: 'Kira',
    updates: [
      { id: 'u3', projectId: '3', projectTitle: 'VisionAI', type: 'mvp_launched', text: 'MVP launched — first 50 beta users onboarded', timestamp: '3h ago' },
    ],
    tasks: [
      { id: 't6', title: 'API integration', completed: true },
      { id: 't7', title: 'User dashboard', completed: false },
    ],
    team: [
      { id: 'tm5', name: 'Kira', role: 'CTO', avatar: 'K' },
    ],
  },
  {
    id: '4',
    title: 'AI Study Buddy',
    category: 'Tech',
    stage: 'Idea',
    description: 'Pilot is how curated coffee cafe by Sarah. Blue.',
    neededRoles: ['Chef', 'Exmlogper'],
    members: 2,
    progress: 15,
    createdBy: 'Leo',
    updates: [],
    tasks: [
      { id: 't8', title: 'Research market fit', completed: false },
    ],
    team: [
      { id: 'tm6', name: 'Leo', role: 'Founder', avatar: 'L' },
    ],
  },
  {
    id: '5',
    title: 'Speakeasy Bar Experience',
    category: 'F&B',
    stage: 'Building',
    description: 'Concepts with elegant collectible earth.',
    neededRoles: ['Chef', 'Branding', 'Mixologist'],
    members: 5,
    progress: 40,
    createdBy: 'Nina',
    updates: [
      { id: 'u4', projectId: '5', projectTitle: 'Speakeasy Bar Experience', type: 'milestone', text: '48% Build Sprint completed', timestamp: '5h ago' },
    ],
    tasks: [],
    team: [
      { id: 'tm7', name: 'Nina', role: 'Founder', avatar: 'N' },
    ],
  },
  {
    id: '6',
    title: 'OnSpot Media Agency',
    category: 'Business',
    stage: 'Scaling',
    description: 'Youth-focused content agency.',
    neededRoles: ['Sales', 'Strategy', 'Marketing'],
    members: 8,
    progress: 80,
    createdBy: 'Arjun',
    updates: [
      { id: 'u5', projectId: '6', projectTitle: 'OnSpot Media Agency', type: 'progress', text: 'Revenue milestone: ₹820 earned', timestamp: '1d ago' },
    ],
    tasks: [],
    team: [],
  },
];

export const mockExecutionFeed: Update[] = [
  { id: 'f1', projectId: '3', projectTitle: 'VisionAI', type: 'mvp_launched', text: 'MVP launched — first 50 beta users onboarded', timestamp: '3h ago' },
  { id: 'f2', projectId: '2', projectTitle: 'Gen Z Media Brand', type: 'team_formed', text: 'Core team of 6 assembled and ready to build', timestamp: '1d ago' },
  { id: 'f3', projectId: '5', projectTitle: 'Speakeasy Bar Experience', type: 'milestone', text: '48% Build Sprint — location secured', timestamp: '5h ago' },
  { id: 'f4', projectId: '6', projectTitle: 'OnSpot Media Agency', type: 'progress', text: '30K Followers milestone reached', timestamp: '2d ago' },
  { id: 'f5', projectId: '1', projectTitle: 'Specialty Cafe', type: 'milestone', text: 'Location scouting completed — 3 options shortlisted', timestamp: '3d ago' },
];

export const mockProfile: UserProfile = {
  name: 'Arjun',
  username: '@arjun_builds',
  projectsCreated: 3,
  projectsJoined: 5,
  executionScore: 820,
  skills: ['Strategy', 'Branding', 'Tech', 'Leadership'],
  recentActivity: [
    { id: 'a1', projectId: '1', projectTitle: 'Specialty Cafe', type: 'milestone', text: 'Location scouting completed', timestamp: '2h ago' },
    { id: 'a2', projectId: '6', projectTitle: 'OnSpot Media Agency', type: 'progress', text: 'Revenue milestone reached', timestamp: '1d ago' },
  ],
};
