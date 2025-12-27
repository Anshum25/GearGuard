import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const from = useMemo(() => {
        const state = location.state as any;
        return state?.from ?? "/";
    }, [location.state]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    
    // Real-time validation states
    const [emailValid, setEmailValid] = useState<boolean | null>(null);
    const [passwordValid, setPasswordValid] = useState<boolean | null>(null);

    const canSubmit = email.trim().length > 0 && password.length > 0 && emailValid === true && passwordValid === true;
    
    // Email validation
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    // Password validation
    const validatePassword = (password: string) => {
        return password.length >= 8;
    };
    
    // Handle email change with validation
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        if (value.length > 0) {
            setEmailValid(validateEmail(value));
        } else {
            setEmailValid(null);
        }
    };
    
    // Handle password change with validation
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        if (value.length > 0) {
            setPasswordValid(validatePassword(value));
        } else {
            setPasswordValid(null);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const res = await login({ email, password });
        if (res.ok === false) {
            setError(res.error);
            return;
        }
        navigate(from, { replace: true });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-blue-500/5"></div>
            <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
            
            {/* Split screen layout with glassmorphism */}
            <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center relative z-10">
                {/* Left side - Brand/Marketing */}
                <div className="hidden lg:flex flex-col space-y-6 p-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold gradient-text">Welcome to GearGuard</h1>
                        <p className="text-lg text-muted-foreground">
                            Professional equipment management for modern teams. Monitor, maintain, and optimize your gear with enterprise-grade reliability.
                        </p>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <span className="text-muted-foreground">Real-time equipment monitoring</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="text-muted-foreground">Automated maintenance scheduling</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-purple-600" />
                            </div>
                            <span className="text-muted-foreground">Team collaboration tools</span>
                        </div>
                    </div>
                </div>
                
                {/* Right side - Login Form */}
                <Card className="backdrop-blur-xl bg-white/70 border border-white/20 shadow-2xl p-8">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-semibold text-foreground">Sign in</h1>
                        <p className="text-sm text-muted-foreground">
                            Access GearGuard as a Manager or Technician.
                        </p>
                    </div>

                    <form className="mt-6 space-y-5" onSubmit={handleLogin}>
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="you@company.com"
                                    autoComplete="email"
                                    className={`pl-10 pr-10 ${emailValid === true ? 'border-green-500 focus:border-green-500' : emailValid === false ? 'border-red-500 focus:border-red-500' : ''}`}
                                />
                                {emailValid === true && (
                                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                                )}
                                {emailValid === false && (
                                    <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
                                )}
                            </div>
                            {emailValid === false && (
                                <p className="text-xs text-red-500">Please enter a valid email address</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    className={`pl-10 pr-10 ${passwordValid === true ? 'border-green-500 focus:border-green-500' : passwordValid === false ? 'border-red-500 focus:border-red-500' : ''}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {passwordValid === false && (
                                <p className="text-xs text-red-500">Password must be at least 8 characters</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember"
                                    checked={rememberMe}
                                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                                />
                                <Label htmlFor="remember" className="text-sm text-muted-foreground">
                                    Remember me
                                </Label>
                            </div>
                            <Link className="text-sm text-primary hover:underline" to="/forgot-password">
                                Forgot password?
                            </Link>
                        </div>

                        {error && (
                            <div className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 flex items-center space-x-2">
                                <AlertCircle className="w-4 h-4" />
                                <span>{error}</span>
                            </div>
                        )}

                        <Button 
                            className="w-full h-11 gradient-primary text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200" 
                            type="submit" 
                            disabled={!canSubmit}
                        >
                            Sign in
                        </Button>

                        <p className="text-sm text-muted-foreground text-center">
                            Don't have an account?{" "}
                            <Link className="text-primary hover:underline font-medium" to="/signup">
                                Create one
                            </Link>
                        </p>
                    </form>
                </Card>
            </div>
        </div>
    );
}
