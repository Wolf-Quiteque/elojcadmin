"use client";
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card";
export default function AnalyticsPage() {
    return (<div>
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>
      <Card>
        <CardHeader>
          <CardTitle>Platform Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Analytics data will be displayed here.</p>
        </CardContent>
      </Card>
    </div>);
}
