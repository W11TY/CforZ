import { Project, UserProfile } from './mockData';

export interface MatchResult {
  score: number;
  reasoning: string;
  urgency?: string;
}

export const calculateMatch = (project: Project, profile: UserProfile): MatchResult => {
  let score = 0;
  let matchingSkill = '';

  // 1. Skill Match (Primary weight - 60%)
  const skillOverlap = project.neededRoles.filter(role => 
    profile.skills.some(skill => role.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(role.toLowerCase()))
  );

  if (skillOverlap.length > 0) {
    score += 60;
    matchingSkill = skillOverlap[0];
  } else {
    // Partial skill match heuristic (e.g. 'Tech' skill matches 'Frontend Dev' role)
    const techSkills = ['Tech', 'Strategy', 'Frontend', 'Backend', 'Design'];
    const matchesTech = profile.skills.some(s => techSkills.includes(s)) && project.category === 'Tech';
    if (matchesTech) score += 30;
  }

  // 2. Category Alignment (20%)
  if (profile.skills.includes(project.category)) {
    score += 20;
  } else if (project.category === 'Tech' || project.category === 'Business') {
    score += 10; // Generic high-value categories
  }

  // 3. Activity & Momentum (10%)
  const recentUpdates = project.updates.length;
  score += Math.min(recentUpdates * 5, 10);

  // 4. Urgency Heuristic (10%)
  // For mock purposes, certain projects have higher urgency
  const isUrgent = project.neededRoles.length > 2 || project.stage === 'Idea';
  if (isUrgent) score += 10;

  // Final Clamp
  score = Math.min(score, 99);

  // Reasoning Generation
  let reasoning = 'High alignment with your execution profile';
  if (matchingSkill) {
    reasoning = `Matches your ${matchingSkill} expertise`;
  } else if (project.category === 'Tech' && profile.skills.includes('Tech')) {
    reasoning = 'Aligned with your technical background';
  }

  // Urgency Signal
  const urgency = isUrgent ? `Needs ${project.neededRoles[0]} Urgently` : 'Active Team';

  return { score, reasoning, urgency };
};
