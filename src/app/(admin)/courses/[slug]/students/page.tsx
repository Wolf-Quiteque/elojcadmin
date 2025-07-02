"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Student } from "@/types";

export default function CourseStudentsPage({
  params,
}: {
  params: { slug: string };
}) {
  const [students, setStudents] = useState<Student[]>([]);
  const supabase = createClient();
  const { slug } = params;

  useEffect(() => {
    const fetchStudents = async () => {
      const { data: courseData } = await supabase
        .from("courses")
        .select("id")
        .eq("slug", slug)
        .single();

      if (courseData) {
        // This is a placeholder. We need a table that links students to courses.
        // For now, we'll just display a message.
        setStudents([]);
      }
    };
    fetchStudents();
  }, [slug, supabase]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Enrolled Students</h1>
      <Card>
        <CardHeader>
          <CardTitle>Students</CardTitle>
        </CardHeader>
        <CardContent>
          {students.length > 0 ? (
            <ul>
              {students.map((student) => (
                <li key={student.id}>{student.full_name}</li>
              ))}
            </ul>
          ) : (
            <p>No students enrolled in this course yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
