import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Clock, Brain, Eye } from "lucide-react";

const stats = [
  {
    icon: Clock,
    value: 40,
    suffix: "%",
    label: "Reduction in Downtime",
    description: "Equipment runs longer with proactive maintenance",
    color: "primary",
  },
  {
    icon: Brain,
    value: 60,
    suffix: "%",
    label: "Less Manual Coordination",
    description: "Automation handles assignments and notifications",
    color: "accent",
  },
  {
    icon: Eye,
    value: 100,
    suffix: "%",
    label: "Maintenance Visibility",
    description: "Complete oversight of all assets and tasks",
    color: "success",
  },
];

const CountUpNumber = ({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    const increment = value / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const ImpactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 gradient-cta relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-4 backdrop-blur-sm">
            📊 Business Impact
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            Results That Speak for Themselves
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Organizations using GearGuard see measurable improvements across all maintenance metrics.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center hover:bg-white/15 transition-all duration-300 h-full">
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>

                <div className="text-5xl md:text-6xl font-heading font-bold text-white mb-2">
                  <CountUpNumber value={stat.value} suffix={stat.suffix} inView={isInView} />
                </div>

                <h3 className="text-xl font-heading font-semibold text-white mb-2">
                  {stat.label}
                </h3>

                <p className="text-white/70 text-sm">
                  {stat.description}
                </p>

                {/* Progress bar visualization */}
                <div className="mt-6 h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white rounded-full"
                    initial={{ width: "0%" }}
                    animate={isInView ? { width: `${stat.value}%` } : {}}
                    transition={{ duration: 1.5, delay: 0.5 + index * 0.2, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;