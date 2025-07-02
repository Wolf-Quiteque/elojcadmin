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
import { Meeting } from "@/types";

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchMeetings = async () => {
      const { data } = await supabase.from("meetings").select("*");
      if (data) {
        setMeetings(data);
      }
    };
    fetchMeetings();
  }, [supabase]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Meetings</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Schedule Meeting
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Meetings</CardTitle>
        </CardHeader>
        <CardContent>
          {meetings.length > 0 ? (
            <ul>
              {meetings.map((meeting) => (
                <li key={meeting.id}>{meeting.title}</li>
              ))}
            </ul>
          ) : (
            <p>No upcoming meetings.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
