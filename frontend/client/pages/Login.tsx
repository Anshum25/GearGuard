import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

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

    const canSubmit = email.trim().length > 0 && password.length > 0;

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const res = login({ email, password });
        if (res.ok === false) {
            setError(res.error);
            return;
        }
        navigate(from, { replace: true });
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-background flex items-center justify-center p-6">
            <Card className="w-full max-w-md border-0 shadow-sm p-6">
                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold text-foreground">Sign in</h1>
                    <p className="text-sm text-muted-foreground">
                        Access GearGuard as a Manager or Technician.
                    </p>
                </div>

                <form className="mt-6 space-y-4" onSubmit={handleLogin}>
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
                            placeholder="••••••••"
                            autoComplete="current-password"
                        />
                    </div>

                    {error && (
                        <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <Button className="w-full" type="submit" disabled={!canSubmit}>
                        Sign in
                    </Button>

                    <p className="text-sm text-muted-foreground">
                        Don’t have an account?{" "}
                        <Link className="text-primary hover:underline" to="/signup">
                            Create one
                        </Link>
                    </p>
                </form>
            </Card>
        </div>
    );
}
