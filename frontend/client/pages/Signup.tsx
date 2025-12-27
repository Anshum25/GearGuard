import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group";
import { useAuth, type UserRole } from "@/contexts/AuthContext";
import { Mail, Lock, User, Building, Users, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";

export default function Signup() {
    const navigate = useNavigate();
    const { signup } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [role, setRole] = useState<UserRole>("manager");
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    
    // Real-time validation states
    const [emailValid, setEmailValid] = useState<boolean | null>(null);
    const [passwordValid, setPasswordValid] = useState<boolean | null>(null);
    const [fullNameValid, setFullNameValid] = useState<boolean | null>(null);

    const canSubmit = email.trim().length > 0 && password.length >= 8 && fullName.trim().length > 0 && emailValid === true && passwordValid === true && fullNameValid === true;
    
    // Validation functions
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    const validatePassword = (password: string) => {
        return password.length >= 8;
    };
    
    const validateFullName = (name: string) => {
        return name.trim().length >= 2;
    };
    // Handle input changes with validation
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        if (value.length > 0) {
            setEmailValid(validateEmail(value));
        } else {
            setEmailValid(null);
        }
    };
    
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        if (value.length > 0) {
            setPasswordValid(validatePassword(value));
        } else {
            setPasswordValid(null);
        }
    };
    
    const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFullName(value);
        if (value.length > 0) {
            setFullNameValid(validateFullName(value));
        } else {
            setFullNameValid(null);
        }
    };

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const res = signup({ email, password, role, fullName });
        if (res.ok === false) {
            setError(res.error);
            return;
        }
        navigate("/", { replace: true });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-blue-500/5"></div>
            <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
            
            <div className="w-full max-w-lg mx-auto relative z-10">
                <Card className="backdrop-blur-xl bg-white/70 border border-white/20 shadow-2xl p-8">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-semibold text-foreground">Create account</h1>
                        <p className="text-sm text-muted-foreground">
                            Join GearGuard and start managing your equipment efficiently.
                        </p>
                    </div>

                    <form className="mt-6 space-y-5" onSubmit={handleSignup}>
                        <div className="grid gap-2">
                            <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="fullName"
                                    type="text"
                                    value={fullName}
                                    onChange={handleFullNameChange}
                                    placeholder="John Doe"
                                    autoComplete="name"
                                    className={`pl-10 pr-10 ${fullNameValid === true ? 'border-green-500 focus:border-green-500' : fullNameValid === false ? 'border-red-500 focus:border-red-500' : ''}`}
                                />
                                {fullNameValid === true && (
                                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                                )}
                                {fullNameValid === false && (
                                    <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
                                )}
                            </div>
                            {fullNameValid === false && (
                                <p className="text-xs text-red-500">Name must be at least 2 characters</p>
                            )}
                        </div>

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
                                    placeholder="Min 8 characters"
                                    autoComplete="new-password"
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

                        <div className="grid gap-2">
                            <Label className="text-sm font-medium">Specialized Team</Label>
                            <RadioGroup value={role} onValueChange={(v) => setRole(v as UserRole)}>
                                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                                    <RadioGroupItem value="manager" id="role-manager" />
                                    <div className="flex-1">
                                        <Label htmlFor="role-manager" className="font-medium cursor-pointer">Manager</Label>
                                        <p className="text-xs text-muted-foreground">Oversee operations and team coordination</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                                    <RadioGroupItem value="technician" id="role-technician" />
                                    <div className="flex-1">
                                        <Label htmlFor="role-technician" className="font-medium cursor-pointer">Technician</Label>
                                        <p className="text-xs text-muted-foreground">Handle equipment maintenance and repairs</p>
                                    </div>
                                </div>
                            </RadioGroup>
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
                            Create account
                        </Button>

                        <p className="text-sm text-muted-foreground text-center">
                            Already have an account?{" "}
                            <Link className="text-primary hover:underline font-medium" to="/login">
                                Sign in
                            </Link>
                        </p>
                    </form>
                </Card>
            </div>
        </div>
    );
}
