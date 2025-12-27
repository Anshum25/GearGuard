import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Monitor, Kanban, Calendar, LayoutGrid } from "lucide-react";

const previews = [
  {
    id: "dashboard",
    icon: LayoutGrid,
    title: "Dashboard",
    description: "At-a-glance overview of all maintenance activities",
  },
  {
    id: "kanban",
    icon: Kanban,
    title: "Kanban Board",
    description: "Visual task management for maintenance requests",
  },
  {
    id: "calendar",
    icon: Calendar,
    title: "Calendar View",
    description: "Scheduled maintenance and preventive tasks",
  },
];

const PreviewSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activePreview, setActivePreview] = useState("dashboard");

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Monitor className="w-4 h-4" />
            Product Preview
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            See <span className="gradient-text">GearGuard</span> in Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the intuitive interface designed for maintenance teams.
          </p>
        </motion.div>

        {/* Preview tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {previews.map((preview) => (
            <button
              key={preview.id}
              onClick={() => setActivePreview(preview.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
                activePreview === preview.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-card border border-border text-foreground hover:border-primary/50"
              }`}
            >
              <preview.icon className="w-5 h-5" />
              {preview.title}
            </button>
          ))}
        </motion.div>

        {/* Preview content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative max-w-5xl mx-auto"
        >
          <motion.div
            className="relative bg-card rounded-2xl border border-border shadow-2xl overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Browser header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-warning/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
              </div>
              <div className="flex-1 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-background text-xs text-muted-foreground">
                  <Monitor className="w-3 h-3" />
                  gearguard.odoo.com/{activePreview}
                </div>
              </div>
            </div>

            {/* Screen content */}
            <div className="aspect-video bg-gradient-to-br from-muted/30 to-background p-8">
              {activePreview === "dashboard" && <DashboardMockup />}
              {activePreview === "kanban" && <KanbanMockup />}
              {activePreview === "calendar" && <CalendarMockup />}
            </div>
          </motion.div>

          {/* Decorative glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-3xl -z-10 opacity-50" />
        </motion.div>

        {/* Preview description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-muted-foreground mt-8"
        >
          {previews.find((p) => p.id === activePreview)?.description}
        </motion.p>
      </div>
    </section>
  );
};

const DashboardMockup = () => (
  <div className="h-full flex flex-col gap-4">
    <div className="flex items-center justify-between">
      <div>
        <div className="h-6 w-48 bg-foreground/10 rounded mb-2" />
        <div className="h-4 w-32 bg-muted-foreground/20 rounded" />
      </div>
      <div className="flex gap-2">
        <div className="h-10 w-24 bg-primary/20 rounded-lg" />
        <div className="h-10 w-10 bg-muted rounded-lg" />
      </div>
    </div>
    <div className="grid grid-cols-4 gap-4 flex-1">
      {[
        { label: "Active Equipment", value: "248", trend: "+12" },
        { label: "Open Requests", value: "18", trend: "-3" },
        { label: "Scheduled Today", value: "5", trend: "0" },
        { label: "Overdue", value: "2", trend: "-1" },
      ].map((stat, i) => (
        <div key={i} className="bg-card rounded-xl p-4 border border-border shadow-sm">
          <div className="text-xs text-muted-foreground mb-2">{stat.label}</div>
          <div className="text-2xl font-heading font-bold text-foreground">{stat.value}</div>
          <div className={`text-xs ${stat.trend.startsWith('+') ? 'text-success' : stat.trend.startsWith('-') ? 'text-destructive' : 'text-muted-foreground'}`}>
            {stat.trend !== '0' && stat.trend} vs last week
          </div>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-3 gap-4 flex-1">
      <div className="col-span-2 bg-card rounded-xl p-4 border border-border">
        <div className="h-4 w-32 bg-foreground/10 rounded mb-4" />
        <div className="flex items-end gap-2 h-24">
          {[40, 65, 45, 80, 55, 70, 85, 60, 75, 90, 65, 80].map((h, i) => (
            <div key={i} className="flex-1 bg-primary/20 rounded-t" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
      <div className="bg-card rounded-xl p-4 border border-border">
        <div className="h-4 w-24 bg-foreground/10 rounded mb-4" />
        <div className="space-y-3">
          {['CNC', 'Hydraulic', 'Conveyor'].map((type, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" style={{ opacity: 1 - i * 0.25 }} />
              <div className="flex-1 h-2 bg-muted rounded-full">
                <div className="h-2 bg-primary rounded-full" style={{ width: `${80 - i * 20}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const KanbanMockup = () => (
  <div className="h-full">
    <div className="flex items-center justify-between mb-4">
      <div className="h-6 w-40 bg-foreground/10 rounded" />
      <div className="flex gap-2">
        <div className="h-8 w-20 bg-primary/20 rounded-lg" />
        <div className="h-8 w-8 bg-muted rounded-lg" />
      </div>
    </div>
    <div className="grid grid-cols-4 gap-4 h-[calc(100%-3rem)]">
      {[
        { title: "New", count: 4, color: "muted-foreground" },
        { title: "In Progress", count: 3, color: "accent" },
        { title: "Review", count: 2, color: "warning" },
        { title: "Done", count: 8, color: "success" },
      ].map((col) => (
        <div key={col.title} className="bg-muted/50 rounded-xl p-3 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">{col.title}</span>
            <span className={`text-xs font-bold bg-${col.color}/20 text-${col.color} px-2 py-0.5 rounded-full`}>
              {col.count}
            </span>
          </div>
          <div className="space-y-2 flex-1 overflow-hidden">
            {Array.from({ length: Math.min(col.count, 3) }).map((_, i) => (
              <div key={i} className="bg-card rounded-lg p-3 shadow-sm border border-border">
                <div className="h-3 bg-foreground/10 rounded w-4/5 mb-2" />
                <div className="h-2 bg-muted-foreground/20 rounded w-3/5 mb-3" />
                <div className="flex items-center justify-between">
                  <div className="w-6 h-6 rounded-full bg-primary/30" />
                  <div className={`text-xs px-2 py-0.5 rounded bg-${col.color}/20`}>
                    <div className="h-2 w-8 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CalendarMockup = () => (
  <div className="h-full flex flex-col">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        <div className="h-6 w-32 bg-foreground/10 rounded" />
        <div className="flex gap-1">
          <div className="h-8 w-8 bg-muted rounded" />
          <div className="h-8 w-8 bg-muted rounded" />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="h-8 w-20 bg-primary/20 rounded-lg" />
        <div className="h-8 w-20 bg-muted rounded-lg" />
      </div>
    </div>
    <div className="flex-1 grid grid-cols-7 gap-1">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
        <div key={d} className="text-center text-xs text-muted-foreground py-2">{d}</div>
      ))}
      {Array.from({ length: 35 }).map((_, i) => {
        const day = i - 6;
        const hasEvent = [8, 10, 15, 17, 22, 24, 25].includes(day);
        const isToday = day === 27;
        return (
          <div
            key={i}
            className={`rounded-lg p-1 ${isToday ? 'bg-primary/20 ring-2 ring-primary' : ''} ${day > 0 && day <= 31 ? '' : 'opacity-30'}`}
          >
            <div className="text-xs text-right text-muted-foreground mb-1">
              {day > 0 && day <= 31 ? day : ''}
            </div>
            {hasEvent && day > 0 && day <= 31 && (
              <div className={`text-xs px-1 py-0.5 rounded text-primary-foreground ${hasEvent ? (day % 3 === 0 ? 'bg-primary' : day % 3 === 1 ? 'bg-accent' : 'bg-success') : ''}`}>
                <div className="h-2 rounded" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

export default PreviewSection;