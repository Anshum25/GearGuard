import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle, ClipboardList, FileText, Users, Wrench } from "lucide-react";

const steps = [
    {
        icon: ClipboardList,
        number: "01",
        title: "Register Equipment",
        description: "Add assets with details like type, location, warranty, and assigned team.",
    },
    {
        icon: Users,
        number: "02",
        title: "Assign Maintenance Team",
        description: "Define responsible technicians and supervisors for each equipment category.",
    },
    {
        icon: FileText,
        number: "03",
        title: "Create Request",
        description: "Log maintenance needs—corrective or preventive—with priority and details.",
    },
    {
        icon: Wrench,
        number: "04",
        title: "Execute & Track",
        description: "Technicians work through Kanban boards with real-time status updates.",
    },
    {
        icon: CheckCircle,
        number: "05",
        title: "Close or Scrap",
        description: "Complete the task or retire equipment with full lifecycle documentation.",
    },
];

export default function HowItWorksSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="how-it-works" className="py-24 bg-background relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>

            <div className="container mx-auto px-4 relative z-10" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                        How It Works
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
                        Five Steps to <span className="gradient-text">Maintenance Excellence</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        A streamlined workflow that takes you from equipment registration to task completion.
                    </p>
                </motion.div>

                <div className="hidden lg:block">
                    <div className="relative">
                        <div className="absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

                        <motion.div
                            className="absolute top-16 left-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                            initial={{ width: "0%" }}
                            animate={isInView ? { width: "100%" } : {}}
                            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                        />

                        <div className="grid grid-cols-5 gap-4">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={step.number}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                                    className="relative"
                                >
                                    <div className="flex justify-center mb-6">
                                        <motion.div
                                            className="relative w-32 h-32 rounded-full bg-card border-4 border-primary/20 flex items-center justify-center shadow-lg"
                                            whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary))" }}
                                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                        >
                                            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shadow-md">
                                                {step.number}
                                            </div>
                                            <step.icon className="w-12 h-12 text-primary" />
                                        </motion.div>
                                    </div>

                                    <div className="text-center">
                                        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">{step.title}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:hidden">
                    <div className="relative">
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary to-primary/20" />

                        <div className="space-y-8">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={step.number}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                    className="relative flex gap-6"
                                >
                                    <div className="relative z-10 flex-shrink-0">
                                        <div className="w-16 h-16 rounded-full bg-card border-4 border-primary/30 flex items-center justify-center shadow-lg">
                                            <step.icon className="w-7 h-7 text-primary" />
                                        </div>
                                        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                                            {step.number}
                                        </div>
                                    </div>

                                    <div className="flex-1 pt-2">
                                        <h3 className="text-lg font-heading font-semibold text-foreground mb-1">{step.title}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
