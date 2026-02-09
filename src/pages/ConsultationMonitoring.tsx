import { useState } from "react";
import { consultations } from "@/data/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, FileText } from "lucide-react";

export default function ConsultationMonitoring() {
  const [tab, setTab] = useState("all");

  const filtered = tab === "all" ? consultations : consultations.filter(c => c.status.toLowerCase().replace(" ", "-") === tab);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Consultation Monitoring</h1>
        <p className="text-muted-foreground text-sm">Track and manage all consultations</p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-muted/50">
          <TabsTrigger value="all">All ({consultations.length})</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4">
          <div className="space-y-3">
            {filtered.map((c, i) => (
              <div
                key={c.id}
                className="bg-card rounded-xl border shadow-card p-5 hover:shadow-card-hover transition-all duration-200 animate-fade-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">{c.patientName}</p>
                      <span className="text-muted-foreground">→</span>
                      <p className="text-sm text-muted-foreground">{c.doctorName}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{c.scheduledAt}{c.duration ? ` · ${c.duration}` : ""}</p>
                  </div>
                  <StatusBadge status={c.status} />
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {c.symptoms.map(s => (
                    <span key={s} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">{s}</span>
                  ))}
                </div>

                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4 mt-0.5 shrink-0" />
                  <p>{c.notes}</p>
                </div>

                {c.aiSuggestion && (
                  <div className="mt-3 flex items-start gap-2 p-2.5 rounded-lg bg-info/5 border border-info/10 text-sm">
                    <Brain className="h-4 w-4 text-info mt-0.5 shrink-0" />
                    <p className="text-info">{c.aiSuggestion}</p>
                  </div>
                )}
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No consultations in this category.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
