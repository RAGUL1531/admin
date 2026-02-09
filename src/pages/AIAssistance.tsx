import { aiInsights } from "@/data/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { Brain, Stethoscope, AlertTriangle, ChevronRight } from "lucide-react";

export default function AIAssistance() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">AI Assistance</h1>
        <p className="text-muted-foreground text-sm">Intelligent symptom analysis and doctor matching powered by NLP</p>
      </div>

      {/* How it works */}
      <div className="gradient-primary rounded-xl p-6 text-primary-foreground">
        <div className="flex items-center gap-3 mb-3">
          <Brain className="h-6 w-6" />
          <h2 className="text-lg font-bold font-heading">Smart Healthcare Matching</h2>
        </div>
        <p className="text-sm opacity-90 leading-relaxed max-w-2xl">
          Our AI system uses Natural Language Processing to understand patient symptoms in free text,
          maps them to medical conditions, and recommends the most suitable specialist based on expertise,
          availability, and patient feedback — as described in the research framework.
        </p>
        <div className="flex gap-6 mt-4">
          {["NLP Symptom Analysis", "ML Doctor Matching", "Feedback Optimization"].map((step, i) => (
            <div key={step} className="flex items-center gap-2 text-xs font-medium">
              <span className="h-6 w-6 rounded-full bg-primary-foreground/20 flex items-center justify-center text-primary-foreground font-bold">{i + 1}</span>
              {step}
            </div>
          ))}
        </div>
      </div>

      {/* Insight Cards */}
      <div className="space-y-4">
        {aiInsights.map((insight, i) => (
          <div
            key={i}
            className="bg-card rounded-xl border shadow-card p-5 hover:shadow-card-hover transition-all duration-200 animate-fade-in"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-info/10 flex items-center justify-center shrink-0">
                  <AlertTriangle className="h-5 w-5 text-info" />
                </div>
                <div>
                  <p className="font-semibold">{insight.symptom}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">AI Confidence: {insight.confidence}%</p>
                </div>
              </div>
              <StatusBadge status={insight.urgencyLevel} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Possible Conditions</p>
                <ul className="space-y-1">
                  {insight.possibleConditions.map(c => (
                    <li key={c} className="flex items-center gap-1.5 text-sm">
                      <ChevronRight className="h-3 w-3 text-muted-foreground" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Suggested Specialty</p>
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{insight.suggestedSpecialty}</span>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Recommended Doctors</p>
                {insight.suggestedDoctors.map(d => (
                  <span key={d} className="inline-flex items-center gap-1.5 text-sm bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Confidence bar */}
            <div className="mt-4 pt-3 border-t">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                <span>Match Confidence</span>
                <span className="font-semibold">{insight.confidence}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full gradient-primary transition-all duration-500"
                  style={{ width: `${insight.confidence}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
