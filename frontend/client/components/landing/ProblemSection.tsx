import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AlertTriangle, CalendarX, Users } from "lucide-react";

type Tone = "destructive" | "warning";

const toneMap: Record<
    Tone,
    {
        gradientFrom: string;
        iconBg: string;
        iconText: string;
        bar: string;
    }
> = {
    destructive: {
        gradientFrom: "from-destructive/5",
        iconBg: "bg-destructive/10",
        iconText: "text-destructive",
        bar: "bg-destructive",
    },
    warning: {
        gradientFrom: "from-warning/5",
        iconBg: "bg-warning/10",
        iconText: "text-warning",
        bar: "bg-warning",
    },
};

export default function ProblemSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const problems = [
        {
            icon: AlertTriangle,
            title: "Untracked Equipment",
            description:
                "Critical assets disappear into spreadsheets. No visibility into equipment status, location, or maintenance history.",
            tone: "destructive" as const,
        },
        {
            icon: Users,
            title: "Manual Team Coordination",
            description:
                "Technicians waste hours on phone calls and emails. Assignments get lost, responsibilities overlap or fall through.",
            tone: "warning" as const,
        },
        {
            icon: CalendarX,
            title: "Missed Preventive Maintenance",
            description:
                "Without automated scheduling, preventive checks slip. Equipment fails unexpectedly, costing time and money.",
            tone: "destructive" as const,
        },
    ];

    return (
        <section id="problem" className="py-24 bg-muted/30 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-destructive/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-warning/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-4">
                        <AlertTriangle className="w-4 h-4" />
                        The Problem
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
                        Why Maintenance Fails in Most Organizations
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Traditional maintenance management creates silos, inefficiencies, and unexpected breakdowns.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {problems.map((problem, index) => {
                        const tone = toneMap[problem.tone];
                        return (
                            <motion.div
                                key={problem.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                                className="group"
                            >
                                <div className="bg-card rounded-2xl p-8 border border-border shadow-lg hover:shadow-xl transition-all duration-300 h-full relative overflow-hidden">
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${tone.gradientFrom} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                    />

                                    <div className="relative z-10">
                                        <div
                                            className={`w-14 h-14 rounded-xl ${tone.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                                        >
                                            <problem.icon className={`w-7 h-7 ${tone.iconText}`} />
                                        </div>

                                        <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                                            {problem.title}
                                        </h3>

                                        <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
                                    </div>

                                    <div
                                        className={`absolute bottom-0 left-0 right-0 h-1 ${tone.bar} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex justify-center mt-16"
                >
                    <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 text-primary font-medium">
                        <span>There's a better way</span>
                        <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                            →
                        </motion.span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
