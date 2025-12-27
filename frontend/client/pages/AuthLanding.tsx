import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AuthLanding() {
    return (
        <div className="min-h-[calc(100vh-4rem)] bg-background flex items-center justify-center p-6">
            <Card className="w-full max-w-md border-0 shadow-sm p-6">
                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold text-foreground">Welcome</h1>
                    <p className="text-sm text-muted-foreground">
                        Choose how you want to continue.
                    </p>
                </div>

                <div className="mt-6 grid gap-3">
                    <Button asChild className="w-full">
                        <Link to="/login">Login</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                        <Link to="/signup">Sign up</Link>
                    </Button>
                </div>
            </Card>
        </div>
    );
}
