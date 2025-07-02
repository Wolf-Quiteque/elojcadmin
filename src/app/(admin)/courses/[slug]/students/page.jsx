"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card";
export default function CourseStudentsPage({ params, }) {
    const [students, setStudents] = useState([]);
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
                const { data, error } = await supabase
                    .from("enrollments")
                    .select("profiles(id, full_name)")
                    .eq("course_id", courseData.id);
                if (error) {
                    console.error("Error fetching students:", error);
                }
                else if (data) {
                    setStudents(data.map((enroll) => enroll.profiles));
                }
            }
        };
        fetchStudents();
    }, [slug, supabase]);
    return (<div>
      <h1 className="text-3xl font-bold mb-6">Enrolled Students</h1>
      <Card>
        <CardHeader>
          <CardTitle>Students</CardTitle>
        </CardHeader>
        <CardContent>
          {students.length > 0 ? (<ul>
              {students.map((student) => (<li key={student.id}>{student.full_name}</li>))}
            </ul>) : (<p>No students enrolled in this course yet.</p>)}
        </CardContent>
      </Card>
    </div>);
}
