-- Profiles Table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users,
  username VARCHAR(50) UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'teacher', 'admin')) DEFAULT 'student'
);

-- Courses Table
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_id UUID REFERENCES profiles(id),
  title VARCHAR(200) NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price NUMERIC(10,2) DEFAULT 0,
  thumbnail_url TEXT,
  is_published BOOLEAN DEFAULT false,
  view_count INT DEFAULT 0
);

-- Content Items
CREATE TYPE content_type AS ENUM ('video', 'quiz', 'text', 'assignment');
CREATE TABLE content_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES courses(id),
  title VARCHAR(200) NOT NULL,
  type content_type NOT NULL,
  position SMALLINT NOT NULL,
  video_url TEXT,
  text_content TEXT,
  duration_minutes INT,
  completion_rate FLOAT
);

-- Quizzes & Questions
CREATE TABLE quizzes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_item_id UUID REFERENCES content_items(id),
  title VARCHAR(200) NOT NULL,
  pass_score SMALLINT DEFAULT 70
);
CREATE TABLE quiz_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id UUID REFERENCES quizzes(id),
  question TEXT NOT NULL,
  position SMALLINT NOT NULL
);

-- Meetings
CREATE TABLE meetings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES courses(id),
  title VARCHAR(200) NOT NULL,
  meeting_url TEXT NOT NULL,
  scheduled_time TIMESTAMPTZ NOT NULL
);
