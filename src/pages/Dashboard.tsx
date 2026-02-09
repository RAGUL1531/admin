import { Users, Stethoscope, UserCheck, Clock, Activity, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { dashboardStats, consultations, doctors } from "@/data/mockData";

export default function Dashboard() {
  const recentConsultations = consultations.filter(c => c.status !== "Cancelled").slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Welcome back, Dr. Admin. Here's your healthcare overview.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Patients"
          value={dashboardStats.totalPatients.toLocaleString()}
          icon={Users}
          trend={{ value: dashboardStats.weeklyGrowth.patients, label: "this week" }}
          variant="primary"
        />
        <StatCard
          title="Active Consultations"
          value={dashboardStats.activeConsultations}
          icon={Activity}
          trend={{ value: dashboardStats.weeklyGrowth.consultations, label: "this week" }}
        />
        <StatCard
          title="Available Doctors"
          value={dashboardStats.availableDoctors}
          icon={Stethoscope}
        />
        <StatCard
          title="Pending Requests"
          value={dashboardStats.pendingRequests}
          icon={Clock}
          variant="warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Consultations */}
        <div className="lg:col-span-2 bg-card rounded-xl border shadow-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold font-heading">Recent Consultations</h2>
            <span className="text-xs text-muted-foreground">Today</span>
          </div>
          <div className="space-y-3">
            {recentConsultations.map((c, i) => (
              <div
                key={c.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/40 hover:bg-muted/70 transition-colors animate-fade-in"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{c.patientName}</p>
                  <p className="text-xs text-muted-foreground">{c.doctorName} · {c.scheduledAt}</p>
                </div>
                <div className="flex items-center gap-2 ml-3">
                  <StatusBadge status={c.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Doctor Availability */}
        <div className="bg-card rounded-xl border shadow-card p-5">
          <h2 className="text-lg font-semibold font-heading mb-4">Doctor Status</h2>
          <div className="space-y-3">
            {doctors.map((d, i) => (
              <div
                key={d.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/40 animate-fade-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="h-9 w-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold shrink-0">
                  {d.name.split(" ").slice(1).map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{d.name}</p>
                  <p className="text-xs text-muted-foreground">{d.specialty}</p>
                </div>
                <StatusBadge status={d.availability} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
