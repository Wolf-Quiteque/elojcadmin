"use client";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { VideoUploader } from "@/components/admin/VideoUploader";
export default function NewCoursePage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const supabase = createClient();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const handleThumbnailUpload = async (e) => {
        var _a;
        const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file)
            return;
        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            setThumbnail(data.url);
        }
        catch (error) {
            console.error("Upload failed:", error);
        }
    };
    const generateSlug = (str) => {
        return str
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { data: { user }, } = await supabase.auth.getUser();
        if (!user) {
            setLoading(false);
            return;
        }
        const { data: courseData, error: courseError } = await supabase
            .from("courses")
            .insert([
            {
                title,
                slug: generateSlug(title),
                description,
                price: parseFloat(price),
                teacher_id: user.id,
                thumbnail_url: thumbnail,
            },
        ])
            .select();
        if (courseError) {
            console.error("Error creating course:", courseError);
        }
        else if (courseData) {
            const courseId = courseData[0].id;
            const { error: contentError } = await supabase
                .from("content_items")
                .insert([
                {
                    course_id: courseId,
                    title: "Introduction Video",
                    type: "video",
                    position: 1,
                    video_url: videoUrl,
                },
            ]);
            if (contentError) {
                console.error("Error creating content item:", contentError);
            }
            else {
                router.push("/courses");
            }
        }
        setLoading(false);
    };
    return (<div>
      <h1 className="text-3xl font-bold mb-6">Create New Course</h1>
      <Card>
        <CardHeader>
          <CardTitle>Course Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input id="title" placeholder="e.g. Introduction to Next.js" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="e.g. In this course, you will learn the fundamentals of Next.js..." value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" placeholder="e.g. 99.99" value={price} onChange={(e) => setPrice(e.target.value)}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="thumbnail">Thumbnail</Label>
              <Input id="thumbnail" type="file" onChange={handleThumbnailUpload}/>
            </div>
            <div className="space-y-2">
              <Label>Course Video</Label>
              <VideoUploader onUploadComplete={setVideoUrl}/>
            </div>
            <Button type="submit" disabled={loading} className="gap-2">
              {loading && <Spinner className="h-4 w-4" />} Create Course
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>);
}
