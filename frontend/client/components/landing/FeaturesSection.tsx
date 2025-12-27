import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    Calendar,
    Clock,
    Database,
    MapPin,
    Shield,
    Zap,
    Kanban,
} from "lucide-react";

function EquipmentPreview() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h4 className="font-heading font-semibold text-foreground">Equipment Registry</h4>
                <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-full">248 Assets</span>
            </div>
            <div className="space-y-3">
                {[
                    { name: "CNC Machine #12", location: "Factory A", status: "Active" },
                    { name: "Hydraulic Press #3", location: "Factory B", status: "Maintenance" },
                    { name: "Conveyor Belt #7", location: "Warehouse", status: "Active" },
                ].map((item) => (
                    <div
                        key={item.name}
                        className="flex items-center gap-4 p-3 bg-background rounded-lg border border-border"
                    >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                            <div className="font-medium text-sm text-foreground">{item.name}</div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <MapPin className="w-3 h-3" />
                                {item.location}
                            </div>
                        </div>
                        <span
                            className={`text-xs px-2 py-1 rounded-full ${item.status === "Active" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"
                                }`}
                        >
                            {item.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function KanbanPreview() {
    const cols = [
        { title: "New", count: 3, countText: "text-muted-foreground" },
        { title: "In Progress", count: 2, countText: "text-accent" },
        { title: "Review", count: 1, countText: "text-warning" },
        { title: "Done", count: 5, countText: "text-success" },
    ] as const;

    return (
        <div className="space-y-4">
            <h4 className="font-heading font-semibold text-foreground">Maintenance Board</h4>
            <div className="grid grid-cols-4 gap-3">
                {cols.map((col) => (
                    <div key={col.title} className="bg-muted/50 rounded-lg p-2">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-muted-foreground">{col.title}</span>
                            <span className={`text-xs font-bold ${col.countText}`}>{col.count}</span>
                        </div>
                        <div className="space-y-1.5">
                            {Array.from({ length: Math.min(col.count, 2) }).map((_, i) => (
                                <div key={i} className="bg-card rounded p-2 shadow-sm border border-border">
                                    <div className="h-2 bg-muted rounded w-4/5 mb-1" />
                                    <div className="h-1.5 bg-muted rounded w-3/5" />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function CalendarPreview() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h4 className="font-heading font-semibold text-foreground">December 2024</h4>
                <div className="flex gap-1">
                    <button className="w-6 h-6 rounded bg-muted flex items-center justify-center text-muted-foreground">
                        ←
                    </button>
                    <button className="w-6 h-6 rounded bg-muted flex items-center justify-center text-muted-foreground">
                        →
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
                {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                    <div key={d} className="text-xs text-muted-foreground py-1">
                        {d}
                    </div>
                ))}
                {Array.from({ length: 35 }).map((_, i) => {
                    const day = i - 6;
                    const hasEvent = [8, 15, 22, 24].includes(day);
                    return (
                        <div
                            key={i}
                            className={`text-xs py-2 rounded ${day > 0 && day <= 31 ? "text-foreground" : "text-muted-foreground/30"
                                } ${hasEvent ? "bg-primary text-primary-foreground font-medium" : ""} ${day === 27 ? "ring-2 ring-primary" : ""
                                }`}
                        >
                            {day > 0 && day <= 31 ? day : ""}
                        </div>
                    );
                })}
            </div>
            <div className="flex items-center gap-2 p-2 bg-primary/10 rounded-lg">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">3 maintenance tasks scheduled</span>
            </div>
        </div>
    );
}

function AutomationPreview() {
    return (
        <div className="space-y-4">
            <h4 className="font-heading font-semibold text-foreground">Automation Rules</h4>
            <div className="space-y-3">
                {[
                    { trigger: "When equipment type = CNC", action: "Assign to CNC Team", active: true },
                    { trigger: "When priority = High", action: "Notify supervisor", active: true },
                    { trigger: "When overdue > 2 days", action: "Escalate to manager", active: false },
                ].map((rule) => (
                    <div
                        key={rule.trigger}
                        className="flex items-start gap-3 p-3 bg-background rounded-lg border border-border"
                    >
                        <div className={`w-2 h-2 rounded-full mt-2 ${rule.active ? "bg-success" : "bg-muted-foreground"}`} />
                        <div className="flex-1">
                            <div className="text-sm text-foreground">{rule.trigger}</div>
                            <div className="flex items-center gap-1 text-xs text-primary mt-1">
                                <Zap className="w-3 h-3" />
                                {rule.action}
                            </div>
                        </div>
                        <div
                            className={`text-xs px-2 py-0.5 rounded ${rule.active ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                                }`}
                        >
                            {rule.active ? "Active" : "Inactive"}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const features = [
    {
        icon: Database,
        title: "Equipment as a Single Source of Truth",
        description:
            "Track ownership, warranty, location, and responsibility for every asset in your organization. Complete visibility across departments with real-time status updates.",
        highlights: ["Ownership tracking", "Warranty alerts", "Location mapping", "Responsibility chains"],
        preview: EquipmentPreview,
        imagePosition: "right" as const,
    },
    {
        icon: Kanban,
        title: "Kanban Maintenance Workflow",
        description:
            "Drag and drop maintenance requests from New → In Progress → Review → Repaired. Technician avatars and overdue indicators keep everyone accountable.",
        highlights: ["Visual task boards", "Drag & drop", "Technician avatars", "Overdue alerts"],
        preview: KanbanPreview,
        imagePosition: "left" as const,
    },
    {
        icon: Calendar,
        title: "Preventive Maintenance Calendar",
        description:
            "Schedule and visualize upcoming maintenance with a beautiful calendar interface. Never miss a preventive check with smart reminders and recurring schedules.",
        highlights: ["Calendar view", "Recurring schedules", "Smart reminders", "History tracking"],
        preview: CalendarPreview,
        imagePosition: "right" as const,
    },
    {
        icon: Zap,
        title: "Smart Automation",
        description:
            "Auto-fill teams and equipment data based on intelligent rules. Reduce manual coordination by 60% with workflow automation that learns your patterns.",
        highlights: ["Auto-assignment", "Smart routing", "Rule-based triggers", "Pattern learning"],
        preview: AutomationPreview,
        imagePosition: "left" as const,
    },
];

export default function FeaturesSection() {
    const headerRef = useRef(null);
    const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

    return (
        <section id="features" className="py-24 bg-muted/20 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        Core Features
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
                        Everything You Need to <span className="gradient-text">Manage Maintenance</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        From equipment tracking to automated workflows, GearGuard handles it all.
                    </p>
                </motion.div>

                {features.map((feature, index) => {
                    const isLeft = feature.imagePosition === "left";
                    const Preview = feature.preview;

                    return (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={headerInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={`grid lg:grid-cols-2 gap-12 items-center ${index !== features.length - 1 ? "mb-24" : ""}`}
                        >
                            <div className={`${isLeft ? "lg:order-2" : ""}`}>
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                                    <feature.icon className="w-4 h-4" />
                                    Feature {index + 1}
                                </div>

                                <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                                    {feature.title}
                                </h3>

                                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{feature.description}</p>

                                <div className="grid grid-cols-2 gap-3">
                                    {feature.highlights.map((highlight, i) => (
                                        <motion.div
                                            key={highlight}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={headerInView ? { opacity: 1, x: 0 } : {}}
                                            transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                                            className="flex items-center gap-2 text-sm text-foreground"
                                        >
                                            <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                                                <span className="text-success text-xs">✓</span>
                                            </div>
                                            {highlight}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div className={`${isLeft ? "lg:order-1" : ""}`}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={headerInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="relative"
                                >
                                    <div className="bg-card rounded-2xl border border-border shadow-xl overflow-hidden">
                                        <div className="p-6 bg-gradient-to-br from-muted/50 to-background">
                                            <Preview />
                                        </div>
                                    </div>

                                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-2xl -z-10 opacity-60" />
                                </motion.div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
