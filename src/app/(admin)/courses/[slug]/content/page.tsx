"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ContentItem } from "@/types";

export default function CourseContentPage({
  params,
}: {
  params: { slug: string };
}) {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const supabase = createClient();
  const { slug } = params;

  useEffect(() => {
    const fetchContentItems = async () => {
      const { data: courseData } = await supabase
        .from("courses")
        .select("id")
        .eq("slug", slug)
        .single();

      if (courseData) {
        const { data: contentData } = await supabase
          .from("content_items")
          .select("*")
          .eq("course_id", courseData.id)
          .order("position");
        if (contentData) {
          setContentItems(contentData);
        }
      }
    };
    fetchContentItems();
  }, [slug, supabase]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Course Content</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Content
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Content Items</CardTitle>
        </CardHeader>
        <CardContent>
          {contentItems.length > 0 ? (
            <ul>
              {contentItems.map((item) => (
                <li key={item.id}>{item.title}</li>
              ))}
            </ul>
          ) : (
            <p>No content items yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
