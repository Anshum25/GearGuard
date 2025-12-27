import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Building2, Layers, Settings, Shield } from "lucide-react";

const features = [
    {
        icon: Layers,
        title: "Native Odoo UI",
        description: "Seamlessly integrates with Odoo's look and feel. No learning curve for your team.",
    },
    {
        icon: Shield,
        title: "Role-Based Workflows",
        description: "Granular permissions for technicians, supervisors, and admins based on Odoo groups.",
    },
    {
        icon: Settings,
        title: "ERP-Ready Architecture",
        description: "Connects with inventory, purchasing, HR, and other Odoo modules out of the box.",
    },
    {
        icon: Building2,
        title: "Enterprise Scalability",
        description: "Handles multi-site operations with thousands of assets and concurrent users.",
    },
];

export default function BuiltForOdooSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="py-24 bg-muted/30 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage:
                            "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            <div className="container mx-auto px-4 relative z-10" ref={ref}>
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                            <Settings className="w-4 h-4" />
                            Built for Odoo
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
                            Designed for the <span className="gradient-text">Odoo Ecosystem</span>
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            GearGuard isn't just compatible with Odoo—it's built from the ground up to feel like a native part of your ERP.
                            Same UI patterns, same user permissions, same data model philosophy.
                        </p>

                        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-card border border-border shadow-md">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <span className="text-xl font-bold text-primary">O</span>
                            </div>
                            <div>
                                <div className="font-heading font-semibold text-foreground">Odoo Ready</div>
                                <div className="text-xs text-muted-foreground">Community & Enterprise Edition</div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                className="group"
                            >
                                <div className="bg-card rounded-xl p-6 border border-border shadow-md hover:shadow-lg hover:border-primary/30 transition-all duration-300 h-full">
                                    <motion.div
                                        className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <feature.icon className="w-6 h-6 text-primary" />
                                    </motion.div>

                                    <h3 className="text-lg font-heading font-semibold text-foreground mb-2">{feature.title}</h3>

                                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
