export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'IoT & ML' | 'Cloud & AI' | 'Optical Comm' | 'Wireless Comm';
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  paperUrl?: string;
  architectureDiagram?: string;
  problemStatement: string;
  workflow: string[];
  features: string[];
  techStack: { category: string; items: string[] }[];
  metrics: { label: string; value: string }[];
  codeSnippet?: { language: string; filename: string; code: string };
  futureImprovements: string[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level: number; // 0-100
    experience: string;
    icon: string;
    categoryColor: string;
  }[];
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  conferenceOrJournal: string;
  year: string;
  status: 'Published' | 'Under Review' | 'Accepted' | 'In Preparation';
  researchArea: string;
  abstract: string;
  citation: string;
  doi?: string;
  pdfUrl: string;
  keyFindings: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Internship' | 'Full-time' | 'Research Assistant';
  logo?: string;
  description: string[];
  technologies: string[];
  certificateUrl?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  skills: string[];
  imageUrl: string;
  verifyUrl: string;
}

export interface Achievement {
  id: string;
  title: string;
  category: 'Academic' | 'Technical' | 'Research' | 'Leadership';
  value: string;
  label: string;
  description: string;
  iconName: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  deliverables: string[];
  techUsed: string[];
}

export interface CommitItem {
  id: string;
  repo: string;
  message: string;
  time: string;
  branch: string;
  hash: string;
}
