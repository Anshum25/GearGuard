import { motion } from "framer-motion";
import { ArrowRight, Calendar, Monitor, Play, Settings, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function HeroSection() {
    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const stats = [
        { value: "40%", label: "Less Downtime" },
        { value: "100%", label: "Visibility" },
        { value: "60%", label: "Less Manual Work" },
    ];

    const dashboardStats = [
        {
            icon: Settings,
            label: "Equipment",
            value: "248",
            iconBg: "bg-primary/10",
            iconText: "text-primary",
        },
        {
            icon: Calendar,
            label: "Scheduled",
            value: "12",
            iconBg: "bg-accent/10",
            iconText: "text-accent",
        },
        {
            icon: Users,
            label: "Technicians",
            value: "24",
            iconBg: "bg-success/10",
            iconText: "text-success",
        },
    ] as const;

    return (
        <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle at center, hsl(var(--primary)) 0%, transparent 70%)",
                        opacity: 0.03,
                    }}
                />
            </div>

            <div className="container mx-auto px-4 py-20 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-center lg:text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
                        >
                            <Settings className="w-4 h-4" />
                            Odoo Native Module
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6 leading-tight"
                        >
                            Smarter Maintenance.{" "}
                            <span className="gradient-text">Zero Downtime.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
                        >
                            GearGuard is an Odoo-native maintenance management system that connects
                            equipment, teams, and tasks—keeping your operations running without disruption.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <Button
                                size="lg"
                                className="gradient-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 px-8"
                                onClick={() => scrollToSection("features")}
                            >
                                Explore the System
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="group border-2 hover:bg-secondary transition-all duration-300"
                                onClick={() => scrollToSection("how-it-works")}
                            >
                                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                                View Workflow
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                            className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start"
                        >
                            {stats.map((stat) => (
                                <div key={stat.label} className="text-center lg:text-left">
                                    <div className="text-2xl font-heading font-bold text-primary">{stat.value}</div>
                                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="relative">
                            <motion.div
                                className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-destructive/60" />
                                        <div className="w-3 h-3 rounded-full bg-warning/60" />
                                        <div className="w-3 h-3 rounded-full bg-success/60" />
                                    </div>
                                    <div className="flex-1 text-center">
                                        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-background text-xs text-muted-foreground">
                                            <Monitor className="w-3 h-3" />
                                            gearguard.odoo.com/dashboard
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-gradient-to-br from-background to-muted/30">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h3 className="font-heading font-semibold text-foreground">Maintenance Dashboard</h3>
                                            <p className="text-sm text-muted-foreground">Equipment Overview</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                                <Settings className="w-4 h-4 text-primary" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 mb-6">
                                        {dashboardStats.map((item) => (
                                            <div key={item.label} className="bg-card rounded-xl p-4 border border-border">
                                                <div className={`w-8 h-8 rounded-lg ${item.iconBg} flex items-center justify-center mb-2`}>
                                                    <item.icon className={`w-4 h-4 ${item.iconText}`} />
                                                </div>
                                                <div className="text-xl font-heading font-bold text-foreground">{item.value}</div>
                                                <div className="text-xs text-muted-foreground">{item.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-4 gap-3">
                                        {["New", "In Progress", "Review", "Done"].map((status, index) => (
                                            <div key={status} className="bg-muted/50 rounded-lg p-3">
                                                <div className="text-xs font-medium text-muted-foreground mb-2">{status}</div>
                                                <div className="space-y-2">
                                                    {Array.from({ length: Math.max(1, 3 - index) }).map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className="bg-card rounded-md p-2 shadow-sm border border-border"
                                                        >
                                                            <div className="h-2 w-3/4 bg-muted rounded mb-1" />
                                                            <div className="h-1.5 w-1/2 bg-muted rounded" />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="absolute -top-4 -right-4 bg-success text-success-foreground px-4 py-2 rounded-xl shadow-lg text-sm font-medium"
                                animate={{ y: [0, -5, 0], rotate: [0, 2, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            >
                                ✓ 3 Tasks Completed
                            </motion.div>

                            <motion.div
                                className="absolute -bottom-4 -left-4 bg-card border border-border px-4 py-2 rounded-xl shadow-lg text-sm"
                                animate={{ y: [0, 5, 0], rotate: [0, -2, 0] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            >
                                <span className="text-warning">⚠</span> Preventive check due
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
                    <motion.div
                        className="w-1.5 h-3 bg-primary rounded-full"
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
            </motion.div>
        </section>
    );
}
