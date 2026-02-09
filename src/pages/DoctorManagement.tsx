import { useState } from "react";
import { doctors as initialDoctors } from "@/data/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { Switch } from "@/components/ui/switch";
import { Star, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { Doctor } from "@/types/healthcare";

export default function DoctorManagement() {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [search, setSearch] = useState("");

  const filtered = doctors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialty.toLowerCase().includes(search.toLowerCase())
  );

  const toggleEnabled = (id: string) => {
    setDoctors(prev => prev.map(d => d.id === id ? { ...d, isEnabled: !d.isEnabled } : d));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading">Doctor Management</h1>
          <p className="text-muted-foreground text-sm">Manage doctor profiles and availability</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search doctors..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((d, i) => (
          <div
            key={d.id}
            className="bg-card rounded-xl border shadow-card p-5 hover:shadow-card-hover transition-all duration-200 animate-fade-in"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg shrink-0">
                  {d.name.split(" ").slice(1).map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="font-semibold">{d.name}</p>
                  <p className="text-sm text-muted-foreground">{d.specialty}</p>
                </div>
              </div>
              <StatusBadge status={d.availability} />
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-2 bg-muted/50 rounded-lg">
                <p className="text-lg font-bold font-heading">{d.experience}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Years</p>
              </div>
              <div className="text-center p-2 bg-muted/50 rounded-lg">
                <p className="text-lg font-bold font-heading">{d.patients}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Patients</p>
              </div>
              <div className="text-center p-2 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-3.5 w-3.5 text-warning fill-warning" />
                  <span className="text-lg font-bold font-heading">{d.rating}</span>
                </div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{d.reviewCount} reviews</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t">
              <span className="text-sm text-muted-foreground">Visibility</span>
              <Switch checked={d.isEnabled} onCheckedChange={() => toggleEnabled(d.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
