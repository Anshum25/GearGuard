import { useMemo } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { Card } from "@/components/ui/card";
import { SimpleBarChart } from "@/components/charts/SimpleBarChart";
import { SimplePieChart } from "@/components/charts/SimplePieChart";
import { useGearGuard } from "@/contexts/GearGuardContext";
import {
  Package,
  AlertCircle,
  Wrench,
  CheckCircle,
  BarChart3,
} from "lucide-react";

function toISODate(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function statusLabel(status: string) {
  if (status === "in-progress") return "In Progress";
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function Dashboard() {
  const { equipment, requests, isRequestOverdue, getEquipmentById } = useGearGuard();

  const totalEquipment = useMemo(
    () => equipment.filter((e) => e.status === "active").length,
    [equipment],
  );
  const openRequests = useMemo(
    () => requests.filter((r) => r.status !== "repaired" && r.status !== "scrap"),
    [requests],
  );
  const overdueRequestsCount = useMemo(
    () => openRequests.filter((r) => isRequestOverdue(r)).length,
    [isRequestOverdue, openRequests],
  );

  const preventiveScheduledCount = useMemo(() => {
    const today = new Date();
    const start = toISODate(today);
    const end = toISODate(addDays(today, 7));
    return requests.filter(
      (r) =>
        r.requestType === "preventive" &&
        Boolean(r.scheduledDate) &&
        (r.scheduledDate as string) >= start &&
        (r.scheduledDate as string) <= end &&
        r.status !== "repaired" &&
        r.status !== "scrap",
    ).length;
  }, [requests]);

  const requestsByTeamData = useMemo(() => {
    const counts = new Map<string, number>();
    for (const r of requests) {
      const team = r.maintenanceTeam || "Unassigned";
      counts.set(team, (counts.get(team) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [requests]);

  const requestsByStatusData = useMemo(() => {
    const order = ["new", "in-progress", "repaired", "scrap"];
    const colors: Record<string, string> = {
      new: "#9ca3af",
      "in-progress": "#3b82f6",
      repaired: "#22c55e",
      scrap: "#ef4444",
    };
    const counts = new Map<string, number>();
    for (const r of requests) {
      counts.set(r.status, (counts.get(r.status) ?? 0) + 1);
    }
    return order
      .map((key) => ({
        name: statusLabel(key),
        value: counts.get(key) ?? 0,
        color: colors[key],
      }))
      .filter((d) => d.value > 0);
  }, [requests]);

  const recentActivity = useMemo(() => {
    return requests
      .slice()
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      .slice(0, 5)
      .map((r) => {
        const eq = getEquipmentById(r.equipmentId);
        return {
          title: r.subject,
          equipment: eq?.name ?? "Equipment",
          status: statusLabel(r.status),
          createdAt: r.createdAt,
        };
      });
  }, [getEquipmentById, requests]);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Overview of your maintenance operations
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            label="Total Equipment"
            value={totalEquipment}
            icon={Package}
            bgColor="bg-indigo-50"
            iconColor="text-indigo-600"
            description="Active assets"
          />
          <KPICard
            label="Open Requests"
            value={openRequests.length}
            icon={Wrench}
            bgColor="bg-blue-50"
            iconColor="text-blue-600"
            description="In progress and new"
          />
          <KPICard
            label="Overdue Requests"
            value={overdueRequestsCount}
            icon={AlertCircle}
            bgColor="bg-red-50"
            iconColor="text-red-600"
            description="Requires attention"
          />
          <KPICard
            label="Preventive Scheduled"
            value={preventiveScheduledCount}
            icon={CheckCircle}
            bgColor="bg-green-50"
            iconColor="text-green-600"
            description="Next 7 days"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Requests by Team */}
          <Card className="border-0 shadow-sm p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Requests by Team
              </h2>
            </div>
            <SimpleBarChart data={requestsByTeamData} height={300} />
          </Card>

          {/* Requests by Status */}
          <Card className="border-0 shadow-sm p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Requests by Status
              </h2>
            </div>
            <div className="flex justify-center">
              <SimplePieChart data={requestsByStatusData} size={280} />
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="border-0 shadow-sm p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Recent Activity
          </h2>
          <div className="space-y-3">
            {recentActivity.map((activity, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between border-b border-border pb-3 last:border-0"
              >
                <div>
                  <p className="font-medium text-foreground">
                    {activity.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.equipment}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    {activity.createdAt}
                  </span>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${activity.status === "In Progress"
                      ? "bg-blue-100 text-blue-700"
                      : activity.status === "Repaired"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
