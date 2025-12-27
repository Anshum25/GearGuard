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
    const [companyName, setCompanyName] = useState("");
    const [role, setRole] = useState<UserRole>("manager");
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    
    // Real-time validation states
    const [emailValid, setEmailValid] = useState<boolean | null>(null);
    const [passwordValid, setPasswordValid] = useState<boolean | null>(null);
    const [fullNameValid, setFullNameValid] = useState<boolean | null>(null);
    const [companyValid, setCompanyValid] = useState<boolean | null>(null);

    const canSubmit = email.trim().length > 0 && password.length >= 8 && fullName.trim().length > 0 && companyName.trim().length > 0 && emailValid === true && passwordValid === true && fullNameValid === true && companyValid === true;
    
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
    
    const validateCompany = (company: string) => {
        return company.trim().length >= 2;
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
    
    const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCompanyName(value);
        if (value.length > 0) {
            setCompanyValid(validateCompany(value));
        } else {
            setCompanyValid(null);
        }
    };

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const res = signup({ email, password, role, fullName, companyName });
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                <Label htmlFor="companyName" className="text-sm font-medium">Company Name</Label>
                                <div className="relative">
                                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="companyName"
                                        type="text"
                                        value={companyName}
                                        onChange={handleCompanyChange}
                                        placeholder="Acme Corp"
                                        autoComplete="organization"
                                        className={`pl-10 pr-10 ${companyValid === true ? 'border-green-500 focus:border-green-500' : companyValid === false ? 'border-red-500 focus:border-red-500' : ''}`}
                                    />
                                    {companyValid === true && (
                                        <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                                    )}
                                    {companyValid === false && (
                                        <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
                                    )}
                                </div>
                                {companyValid === false && (
                                    <p className="text-xs text-red-500">Company name must be at least 2 characters</p>
                                )}
                            </div>
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

                        {/* Social Auth */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-muted-foreground">Or sign up with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" className="h-11" type="button">
                                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Google
                            </Button>
                            <Button variant="outline" className="h-11" type="button">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                                GitHub
                            </Button>
                        </div>

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
