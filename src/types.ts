export type RaceCategory = 'full' | 'half' | '10k' | 'fun_5k';

export interface RaceInfo {
  id: RaceCategory;
  name: string;
  distanceKm: number;
  distanceLabel: string;
  tagline: string;
  description: string;
  startTime: string;
  difficulty: 'Beginner Friendly' | 'Intermediate' | 'Advanced' | 'Challenging';
  elevationGainM: number;
  timeLimit: string;
  feeINR: number;
  slotsTotal: number;
  slotsRemaining: number;
  status: 'Open' | 'Fast Filling' | 'Waitlist';
  inclusions: string[];
  courseHighlights: string[];
}

export interface RouteMarker {
  id: string;
  name: string;
  km: number;
  type: 'start' | 'finish' | 'split' | 'hydration' | 'medical' | 'toilet' | 'entertainment' | 'landmark';
  description: string;
  x: number; // percentage on SVG map
  y: number; // percentage on SVG map
  elevationM: number;
}

export interface RunnerTrackingData {
  bib: string;
  name: string;
  gender: 'M' | 'F' | 'Other';
  ageGroup: string;
  category: RaceCategory;
  city: string;
  distanceCoveredKm: number;
  totalDistanceKm: number;
  currentPace: string;
  avgPace: string;
  estimatedFinishTime: string;
  gunTime: string;
  chipTime: string;
  currentPosition: number;
  categoryPosition: number;
  genderPosition: number;
  status: 'On Course' | 'Finished' | 'Starting Soon' | 'DNF';
  lastCheckpoint: string;
  lastCheckpointTime: string;
  heartRateBpm: number;
  cheersCount: number;
  splits: {
    checkpoint: string;
    km: number;
    splitTime: string;
    pace: string;
    passed: boolean;
  }[];
}

export interface TrainingPlan {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'First Marathon';
  durationWeeks: number;
  weeklyMileageKm: string;
  description: string;
  targetRace: RaceCategory;
  suitableFor: string;
}

export interface TrainingWorkout {
  id: string;
  title: string;
  type: 'Long Run' | 'Intervals' | 'Tempo Run' | 'Easy Run' | 'Recovery' | 'Strength';
  distanceKm?: number;
  durationMinutes: number;
  targetPace: string;
  intensity: 'Low' | 'Moderate' | 'High' | 'Max Effort';
  notes: string;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  location: string;
  runTitle: string;
  distanceKm: number;
  duration: string;
  pace: string;
  photoUrl?: string;
  caption: string;
  likes: number;
  commentsCount: number;
  cheers: number;
  timestamp: string;
  isLikedByMe?: boolean;
  isCheeredByMe?: boolean;
  club?: string;
}

export interface LeaderboardEntry {
  rank: number;
  bib: string;
  name: string;
  country: string;
  countryCode: string;
  category: RaceCategory;
  gender: 'M' | 'F';
  ageGroup: string;
  gunTime: string;
  chipTime: string;
  pace: string;
  status: 'Finished';
}

export interface ResultRecord {
  bib: string;
  name: string;
  category: RaceCategory;
  email: string;
  finishTime: string;
  chipTime: string;
  avgPace: string;
  overallRank: number;
  totalRunners: number;
  genderRank: number;
  totalGender: number;
  categoryRank: number;
  totalCategory: number;
  splits: { checkpoint: string; time: string; splitPace: string }[];
  certificateId: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  category: 'race' | 'training' | 'bib' | 'weather' | 'results';
  isRead: boolean;
  actionUrl?: string;
}

export interface ScheduleEvent {
  id: string;
  phase: 'BEFORE THE RACE' | 'RACE DAY' | 'AFTER THE RACE';
  date: string;
  time: string;
  title: string;
  venue: string;
  description: string;
  badge?: string;
}

export interface FAQItem {
  id: string;
  category: 'Registration' | 'Race Day' | 'Bib Collection' | 'Route' | 'Parking' | 'Transport' | 'Medical' | 'Results';
  question: string;
  answer: string;
}

export interface Sponsor {
  id: string;
  name: string;
  tier: 'Title Sponsor' | 'Powered By' | 'Associate Sponsors' | 'Official Partners';
  logoPlaceholder: string;
  role: string;
}
