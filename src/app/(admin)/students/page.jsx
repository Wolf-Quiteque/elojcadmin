"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card";
export default function StudentsPage() {
    const [students, setStudents] = useState([]);
    const supabase = createClient();
    useEffect(() => {
        const fetchStudents = async () => {
            // This is a placeholder. We need to fetch all students.
            // For now, we'll just display a message.
            setStudents([]);
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
              {students.map((student) => (<li key={student.id}>{student.full_name}</li>))}
            </ul>) : (<p>Nehum Estudante encontrado.</p>)}
        </CardContent>
      </Card>
    </div>);
}
