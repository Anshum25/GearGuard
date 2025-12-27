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

export default function Signup() {
    const navigate = useNavigate();
    const { signup } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<UserRole>("manager");
    const [error, setError] = useState<string | null>(null);

    const canSubmit = email.trim().length > 0 && password.length >= 4;

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const res = signup({ email, password, role });
        if (res.ok === false) {
            setError(res.error);
            return;
        }
        navigate("/", { replace: true });
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-background flex items-center justify-center p-6">
            <Card className="w-full max-w-md border-0 shadow-sm p-6">
                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold text-foreground">Create account</h1>
                    <p className="text-sm text-muted-foreground">
                        Choose a role to access the right panel.
                    </p>
                </div>

                <form className="mt-6 space-y-4" onSubmit={handleSignup}>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@company.com"
                            autoComplete="email"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Min 4 characters"
                            autoComplete="new-password"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label>Role</Label>
                        <RadioGroup value={role} onValueChange={(v) => setRole(v as UserRole)}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="manager" id="role-manager" />
                                <Label htmlFor="role-manager">Manager</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="technician" id="role-technician" />
                                <Label htmlFor="role-technician">Technician</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {error && (
                        <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <Button className="w-full" type="submit" disabled={!canSubmit}>
                        Create account
                    </Button>

                    <p className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link className="text-primary hover:underline" to="/login">
                            Sign in
                        </Link>
                    </p>
                </form>
            </Card>
        </div>
    );
}
