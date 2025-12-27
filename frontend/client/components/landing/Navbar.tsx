import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Settings, X } from "lucide-react";

import { Button } from "@/components/ui/button";

const navLinks = [
    { label: "Features", id: "features" },
    { label: "How It Works", id: "how-it-works" },
    { label: "Preview", id: "preview" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                        ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
                        : "bg-transparent"
                    }`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        <motion.div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
                                <Settings className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-heading font-bold text-foreground">GearGuard</span>
                        </motion.div>

                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={() => scrollToSection(link.id)}
                                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium"
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>

                        <div className="hidden md:flex items-center gap-3">
                            <Button asChild variant="ghost">
                                <Link to="/login">Login</Link>
                            </Button>
                            <Button
                                asChild
                                className="gradient-primary text-primary-foreground shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                            >
                                <Link to="/auth">Get Started</Link>
                            </Button>
                        </div>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-foreground"
                            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-x-0 top-16 z-40 bg-background border-b border-border shadow-lg md:hidden"
                    >
                        <div className="container mx-auto px-4 py-6">
                            <div className="flex flex-col gap-4">
                                {navLinks.map((link) => (
                                    <button
                                        key={link.id}
                                        onClick={() => scrollToSection(link.id)}
                                        className="text-left text-lg font-medium text-foreground hover:text-primary transition-colors duration-300 py-2"
                                    >
                                        {link.label}
                                    </button>
                                ))}
                                <Button asChild className="gradient-primary text-primary-foreground mt-4">
                                    <Link to="/auth">Get Started</Link>
                                </Button>
                                <Button asChild variant="outline">
                                    <Link to="/signup">Create account</Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
