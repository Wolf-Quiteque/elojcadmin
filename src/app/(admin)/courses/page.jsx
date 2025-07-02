"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
export default function CoursesPage() {
    const [courses, setCourses] = useState([]);
    const supabase = createClient();
    const router = useRouter();
    useEffect(() => {
        const fetchCourses = async () => {
            const { data } = await supabase
                .from("courses")
                .select("*")
                .order("created_at", { ascending: false });
            if (data) {
                setCourses(data);
            }
        };
        fetchCourses();
    }, [supabase]);
    return (<div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Cursos</h1>
        <Button onClick={() => router.push("/courses/new")}>
          <PlusCircle className="mr-2 h-4 w-4"/>
          Novo Curso
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Seus Cursos</CardTitle>
        </CardHeader>
        <CardContent>
          {courses.length > 0 ? (<ul>
              {courses.map((course) => (<li key={course.id}>
                  <a href={`/courses/${course.slug}`} className="text-blue-600 hover:underline">
                    {course.title}
                  </a>
                </li>))}
            </ul>) : (<p>Você ainda não criou nenhum curso.</p>)}
        </CardContent>
      </Card>
    </div>);
}
