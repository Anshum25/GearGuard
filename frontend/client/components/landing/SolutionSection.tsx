import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CalendarCheck, Database, Kanban, Trash2, UserCheck } from "lucide-react";

const solutions = [
    {
        icon: Database,
        title: "Centralized Equipment Registry",
        description: "Single source of truth for all assets",
    },
    {
        icon: UserCheck,
        title: "Automated Team Assignment",
        description: "Smart routing to the right technicians",
    },
    {
        icon: Kanban,
        title: "Kanban-Based Repair Workflow",
        description: "Visual tracking from request to resolution",
    },
    {
        icon: CalendarCheck,
        title: "Calendar-Based Preventive Maintenance",
        description: "Never miss a scheduled check again",
    },
    {
        icon: Trash2,
        title: "Lifecycle-Aware Scrap Management",
        description: "Track assets from purchase to retirement",
    },
];

export default function SolutionSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="solution" className="py-24 bg-background relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
                        ✓ The Solution
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
                        How <span className="gradient-text">GearGuard</span> Fixes It
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        An integrated maintenance management system built natively for Odoo enterprises.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {solutions.map((solution, index) => (
                        <motion.div
                            key={solution.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                            className="group"
                        >
                            <div className="bg-card rounded-2xl p-6 border border-border shadow-md hover:shadow-xl hover:border-primary/30 transition-all duration-300 h-full text-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="relative z-10">
                                    <motion.div
                                        className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        <solution.icon className="w-8 h-8 text-primary" />
                                    </motion.div>

                                    <h3 className="text-lg font-heading font-semibold text-foreground mb-2 leading-tight">
                                        {solution.title}
                                    </h3>

                                    <p className="text-sm text-muted-foreground">{solution.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
