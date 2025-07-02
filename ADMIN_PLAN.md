# Edusphere Teacher Admin: Detailed Project Plan

This document outlines the plan for creating a comprehensive, modern, and futuristic admin panel for teachers on the Edusphere platform.

**Project Language:** The codebase is maintained in **JavaScript** rather than TypeScript.

## 1. Project Analysis

### 1.1. Database Schema (`schema.sql`)

The database schema provides a solid foundation for the platform, with tables for:

-   **`profiles`**: Manages user data, including roles (student, teacher, admin).
-   **`courses`**: Stores course information, including teacher, title, price, and publication status.
-   **`content_items`**: A flexible table for different types of course content (video, quiz, text, assignment).
-   **`quizzes` & `quiz_questions`**: Tables for creating and managing quizzes.
-   **`meetings`**: Allows for scheduling and managing live meetings.

### 1.2. Existing Project Structure (`src` directory)

The project is a Next.js application with a good starting structure:

-   **`app/(admin)`**: A route group for the admin section, which is excellent for organization.
-   **`app/auth`**: Handles user authentication (login/register).
-   **`components/admin`**: Contains some initial admin components (`CourseBuilder`, `Sidebar`, `VideoUploader`).
-   **`lib/supabase`**: Supabase client for database interaction.
-   **`providers`**: Includes an `AuthProvider` for managing user sessions.

## 2. Core Features for Teacher Admin

Based on the schema and common e-learning platform requirements, the teacher admin should include the following core features:

-   **Dashboard:** An overview of key metrics (e.g., total students, course views, recent activity).
-   **Course Management:**
    -   Create, edit, and delete courses.
    -   Publish/unpublish courses.
    -   Manage course pricing and thumbnails.
-   **Content Management:**
    -   Add, edit, and reorder content items within a course.
    -   Support for different content types: video, text, quizzes, and assignments.
    -   A dedicated course builder interface for a seamless experience.
-   **Student Management:**
    -   View enrolled students for each course.
    -   Track student progress.
    -   Communicate with students (e.g., announcements, direct messages).
-   **Quiz & Assignment Management:**
    -   Create and manage quizzes with various question types.
    -   Create and manage assignments.
    -   Grade submissions and provide feedback.
-   **Meeting Management:**
    -   Schedule and manage live meetings for courses.
-   **Analytics & Reporting:**
    -   Detailed analytics on course performance, student engagement, and revenue.
-   **Profile Management:**
    -   Allow teachers to manage their public profiles.

## 3. Page Structure

The admin panel will have the following pages, accessible through a sidebar navigation:

-   **/admin/dashboard**: The main dashboard.
-   **/admin/courses**: A list of all courses created by the teacher.
    -   **/admin/courses/new**: A page to create a new course.
    -   **/admin/courses/[slug]**: The course editor/builder for a specific course.
        -   **/admin/courses/[slug]/content**: Manage course content.
        -   **/admin/courses/[slug]/students**: Manage enrolled students.
        -   **/admin/courses/[slug]/analytics**: View course-specific analytics.
-   **/admin/students**: A comprehensive list of all students across all courses.
-   **/admin/meetings**: A page to schedule and manage meetings.
-   **/admin/analytics**: Platform-wide analytics for the teacher.
-   **/admin/profile**: Teacher's profile management page.

## 4. UI/UX Components for a Modern & Futuristic Feel

To achieve a modern and futuristic look, we'll use a clean, component-based design system.

### 4.1. Design System & UI Library

-   **UI Library:** We'll use **Shadcn/UI** which is a collection of reusable components built on top of Radix UI and Tailwind CSS. It's highly customizable and provides a great foundation for a modern design.
-   **Icons:** We'll use **Lucide Icons** for a consistent and clean icon set.
-   **Charts:** We'll use **Recharts** or a similar library for creating beautiful and interactive charts for the analytics sections.

### 4.2. Key UI/UX Components

-   **Sidebar Navigation:** A collapsible sidebar with clear icons and labels for navigation. The current `Sidebar.tsx` can be enhanced.
-   **Dashboard Widgets:** Draggable and resizable widgets on the dashboard for a customizable experience.
-   **Course Builder:** A drag-and-drop interface for organizing course content. The existing `CourseBuilder.tsx` will be the foundation for this.
-   **Video Uploader:** A sleek video uploader with progress indicators. The `VideoUploader.tsx` can be improved with features like drag-and-drop and cloud uploads (e.g., to Supabase Storage).
-   **Rich Text Editor:** A Notion-style rich text editor for creating text-based content.
-   **Data Tables:** Interactive data tables with sorting, filtering, and pagination for managing courses, students, etc.
-   **Modals & Drawers:** For forms (e.g., creating a new course) and quick views (e.g., student details).
-   **Futuristic Elements:**
    -   **Glassmorphism/Neumorphism:** Subtle use of these effects for cards and sidebars.
    -   **Micro-interactions & Animations:** Smooth transitions and animations to provide feedback and enhance the user experience.
    -   **Customizable Themes:** Allow teachers to choose between a light and dark theme, and maybe even accent colors.

## 5. Detailed Implementation Plan

Here is a step-by-step plan to build the teacher admin panel:

1.  **Setup & Scaffolding:**
    -   Install Shadcn/UI, Lucide Icons, and a charting library.
    -   Create the main admin layout (`/app/(admin)/layout.tsx`) with the enhanced sidebar.

2.  **Dashboard (`/admin/dashboard`):**
    -   Design and build the dashboard widgets (e.g., "Total Students," "Course Views").
    -   Fetch and display the required data from the database.

3.  **Course Management (`/admin/courses`):**
    -   Create the "Courses" page to display a list of the teacher's courses.
    -   Implement the "Create New Course" form.
    -   Build the course editor page (`/admin/courses/[slug]`).

4.  **Course Builder (`/admin/courses/[slug]/content`):**
    -   Develop the drag-and-drop interface for managing content items.
    -   Implement forms for adding/editing each content type (video, text, quiz, assignment).

5.  **Student Management (`/admin/courses/[slug]/students` & `/admin/students`):**
    -   Create the UI to display enrolled students.
    -   Implement functionality to view student progress.

6.  **Meetings (`/admin/meetings`):**
    -   Build the interface for scheduling and managing meetings.

7.  **Analytics (`/admin/analytics` & `/admin/courses/[slug]/analytics`):**
    -   Integrate the charting library.
    -   Create the necessary API routes to fetch analytics data.
    -   Design and build the analytics dashboards.

8.  **Profile Management (`/admin/profile`):**
    -   Create the profile page with a form to update teacher information.

9.  **Authentication & Authorization:**
    -   Ensure that only users with the 'teacher' role can access the admin panel.
    -   Implement row-level security (RLS) in Supabase to restrict data access.

10. **Testing & Deployment:**
    -   Thoroughly test all features.
    -   Deploy the application.

This detailed plan provides a clear roadmap for creating a powerful and modern teacher admin panel for Edusphere.
