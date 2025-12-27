import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Calendar, Package, Wrench } from "lucide-react";

export default function Landing() {
    return (
        <div className="min-h-[calc(100vh-4rem)] bg-background">
            <div className="relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
                    <div className="absolute top-32 -right-24 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-6xl px-6 py-16 lg:py-24">
                    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="bg-primary/10 text-primary border-transparent">
                                    Odoo-style
                                </Badge>
                                <Badge variant="secondary" className="bg-muted text-muted-foreground border-transparent">
                                    Maintenance Tracker
                                </Badge>
                            </div>

                            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                                Keep equipment healthy.
                                <span className="block text-primary">Ship maintenance faster.</span>
                            </h1>

                            <p className="text-lg text-muted-foreground max-w-xl">
                                GearGuard helps managers and technicians track equipment, schedule preventive work,
                                and close requests with a clean, data-centric workflow.
                            </p>

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <Button asChild className="sm:w-auto">
                                    <Link to="/auth">Get started</Link>
                                </Button>
                                <Button asChild variant="outline" className="sm:w-auto">
                                    <a href="#features">Explore features</a>
                                </Button>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-4">
                                <div>
                                    <p className="text-2xl font-semibold text-foreground">Kanban</p>
                                    <p className="text-sm text-muted-foreground">Requests</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-semibold text-foreground">Calendar</p>
                                    <p className="text-sm text-muted-foreground">Preventive</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-semibold text-foreground">Assets</p>
                                    <p className="text-sm text-muted-foreground">Equipment</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-semibold text-foreground">KPIs</p>
                                    <p className="text-sm text-muted-foreground">Reports</p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:justify-self-end">
                            <Card className="border-0 shadow-sm p-6 bg-white/60 backdrop-blur">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <p className="font-semibold text-foreground">Today</p>
                                        <Badge variant="secondary" className="bg-green-100 text-green-700 border-transparent">
                                            Live
                                        </Badge>
                                    </div>

                                    <div className="grid gap-3">
                                        <div className="rounded-lg border border-border bg-white p-4">
                                            <div className="flex items-start gap-3">
                                                <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                                                    <Wrench className="h-5 w-5 text-primary" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-foreground">Repair request</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Conveyor belt inspection · Assigned to Technician
                                                    </p>
                                                </div>
                                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-transparent">
                                                    In progress
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="rounded-lg border border-border bg-white p-4">
                                            <div className="flex items-start gap-3">
                                                <div className="h-10 w-10 rounded-md bg-purple-500/10 flex items-center justify-center">
                                                    <Calendar className="h-5 w-5 text-purple-700" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-foreground">Preventive plan</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Scheduled tasks for next 7 days
                                                    </p>
                                                </div>
                                                <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-transparent">
                                                    Planned
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="rounded-lg border border-border bg-white p-4">
                                            <div className="flex items-start gap-3">
                                                <div className="h-10 w-10 rounded-md bg-green-500/10 flex items-center justify-center">
                                                    <Package className="h-5 w-5 text-green-700" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-foreground">Assets overview</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Equipment, warranties, and assignments
                                                    </p>
                                                </div>
                                                <Badge variant="secondary" className="bg-muted text-muted-foreground border-transparent">
                                                    Updated
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="rounded-lg border border-border bg-white p-4">
                                            <div className="flex items-center gap-3">
                                                <BarChart3 className="h-5 w-5 text-primary" />
                                                <div>
                                                    <p className="text-sm font-medium text-foreground">Insights</p>
                                                    <p className="text-xs text-muted-foreground">KPIs & charts</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="rounded-lg border border-border bg-white p-4">
                                            <div className="flex items-center gap-3">
                                                <Wrench className="h-5 w-5 text-primary" />
                                                <div>
                                                    <p className="text-sm font-medium text-foreground">Workflow</p>
                                                    <p className="text-xs text-muted-foreground">From new to repaired</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>

                    <div id="features" className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <Card className="border-0 shadow-sm p-5">
                            <div className="space-y-2">
                                <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                                    <Package className="h-5 w-5 text-primary" />
                                </div>
                                <p className="font-semibold text-foreground">Equipment registry</p>
                                <p className="text-sm text-muted-foreground">
                                    Keep serials, owners, locations, and warranties in one place.
                                </p>
                            </div>
                        </Card>

                        <Card className="border-0 shadow-sm p-5">
                            <div className="space-y-2">
                                <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                                    <Wrench className="h-5 w-5 text-primary" />
                                </div>
                                <p className="font-semibold text-foreground">Kanban workflow</p>
                                <p className="text-sm text-muted-foreground">
                                    Drag requests across stages and keep teams aligned.
                                </p>
                            </div>
                        </Card>

                        <Card className="border-0 shadow-sm p-5">
                            <div className="space-y-2">
                                <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                                    <Calendar className="h-5 w-5 text-primary" />
                                </div>
                                <p className="font-semibold text-foreground">Preventive calendar</p>
                                <p className="text-sm text-muted-foreground">
                                    Plan upcoming work with a fast date-first workflow.
                                </p>
                            </div>
                        </Card>

                        <Card className="border-0 shadow-sm p-5">
                            <div className="space-y-2">
                                <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                                    <BarChart3 className="h-5 w-5 text-primary" />
                                </div>
                                <p className="font-semibold text-foreground">Manager reports</p>
                                <p className="text-sm text-muted-foreground">
                                    Spot trends, SLA risk, and workload by team.
                                </p>
                            </div>
                        </Card>
                    </div>

                    <div className="mt-16 rounded-2xl border border-border bg-white/60 backdrop-blur p-8">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-2xl font-semibold text-foreground">Ready to run maintenance like a pro?</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Start with the auth hub, then sign in as a Manager or Technician.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Button asChild>
                                    <Link to="/auth">Continue</Link>
                                </Button>
                                <Button asChild variant="outline">
                                    <Link to="/signup">Create account</Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <footer className="mt-12 pb-2 text-center text-sm text-muted-foreground">
                        GearGuard · Maintenance Tracker
                    </footer>
                </div>
            </div>
        </div>
    );
}
