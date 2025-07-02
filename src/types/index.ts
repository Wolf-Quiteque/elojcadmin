export type Course = {
  id: string;
  teacher_id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  thumbnail_url: string | null;
  is_published: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
};

export type ContentItem = {
  id: string;
  course_id: string;
  title: string;
  type: 'video' | 'quiz' | 'text' | 'assignment';
  position: number;
  video_url: string | null;
  text_content: string | null;
  duration_minutes: number | null;
  completion_rate: number | null;
};

export type Student = {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
};

export type Meeting = {
  id: string;
  course_id: string;
  title: string;
  meeting_url: string;
  scheduled_time: string;
};

// Additional types for quizzes, meetings, etc.
