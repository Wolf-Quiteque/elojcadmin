"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card";
export default function StudentsPage() {
    const [students, setStudents] = useState([]);
    const supabase = createClient();
    useEffect(() => {
        const fetchStudents = async () => {
            const { data, error } = await supabase
                .from("profiles")
                .select("id, full_name, enrollments(courses(title, slug))")
                .eq("role", "student");
            if (error) {
                console.error("Error fetching students:", error);
            }
            else if (data) {
                setStudents(data);
            }
        };
        fetchStudents();
    }, [supabase]);
    return (<div>
      <h1 className="text-3xl font-bold mb-6">Todos Estudantes</h1>
      <Card>
        <CardHeader>
          <CardTitle>Estudantes</CardTitle>
        </CardHeader>
        <CardContent>
          {students.length > 0 ? (<ul>
              {students.map((student) => (<li key={student.id} className="mb-2">
                  <div>{student.full_name}</div>
                  {student.enrollments && student.enrollments.length > 0 && (<ul className="ml-4 list-disc">
                        {student.enrollments.map((enroll) => (<li key={enroll.course_id}>{enroll.courses.title}</li>))}
                      </ul>)}
                </li>))}
            </ul>) : (<p>Nehum Estudante encontrado.</p>)}
        </CardContent>
      </Card>
    </div>);
}
