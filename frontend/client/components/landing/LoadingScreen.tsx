import { motion } from "framer-motion";
import { Cog, Settings } from "lucide-react";

interface LoadingScreenProps {
    onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center gradient-primary"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onAnimationComplete={(definition) => {
                if (definition === "exit") {
                    onComplete();
                }
            }}
        >
            <div className="flex flex-col items-center gap-8">
                <motion.div
                    className="relative"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <motion.div
                        className="relative z-10"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                        <Settings className="w-24 h-24 text-primary-foreground" strokeWidth={1.5} />
                    </motion.div>

                    <motion.div
                        className="absolute -top-4 -right-6 z-0"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    >
                        <Cog className="w-12 h-12 text-primary-foreground/70" strokeWidth={1.5} />
                    </motion.div>

                    <motion.div
                        className="absolute -bottom-3 -left-5 z-0"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    >
                        <Cog className="w-10 h-10 text-primary-foreground/50" strokeWidth={1.5} />
                    </motion.div>
                </motion.div>

                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                >
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-2">
                        GearGuard
                    </h1>
                    <motion.p
                        className="text-lg text-primary-foreground/80"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                    >
                        The Ultimate Maintenance Tracker
                    </motion.p>
                </motion.div>

                <motion.div
                    className="w-64 h-1.5 bg-primary-foreground/20 rounded-full overflow-hidden"
                    initial={{ opacity: 0, scaleX: 0.8 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                >
                    <motion.div
                        className="h-full bg-primary-foreground rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
                        onAnimationComplete={onComplete}
                    />
                </motion.div>

                <motion.p
                    className="text-primary-foreground/70 text-sm font-medium tracking-wide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    Optimizing Equipment. Eliminating Downtime.
                </motion.p>
            </div>
        </motion.div>
    );
}
