import { useMemo, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SimpleBarChart } from "@/components/charts/SimpleBarChart";
import { SimplePieChart } from "@/components/charts/SimplePieChart";
import {
  Download,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
} from "lucide-react";
import { useGearGuard } from "@/contexts/GearGuardContext";

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const { equipment, requests, isRequestOverdue } = useGearGuard();

  const hourlyRate = 100;

  const totalRequests = requests.length;
  const completedRequests = useMemo(
    () => requests.filter((r) => r.status === "repaired" || r.status === "scrap"),
    [requests],
  );

  const completionRate = useMemo(() => {
    if (totalRequests === 0) return 0;
    const repairedCount = requests.filter((r) => r.status === "repaired").length;
    return Math.round((repairedCount / totalRequests) * 100);
  }, [requests, totalRequests]);

  const openRequests = useMemo(
    () => requests.filter((r) => r.status !== "repaired" && r.status !== "scrap"),
    [requests],
  );

  const overdueTasks = useMemo(
    () => openRequests.filter((r) => isRequestOverdue(r)).length,
    [isRequestOverdue, openRequests],
  );

  const avgHours = useMemo(() => {
    const durations = completedRequests
      .map((r) => r.durationHours)
      .filter((n): n is number => typeof n === "number" && Number.isFinite(n));
    if (durations.length === 0) return 0;
    const sum = durations.reduce((a, b) => a + b, 0);
    return Math.round((sum / durations.length) * 10) / 10;
  }, [completedRequests]);

  const teamRequestsData = useMemo(() => {
    const counts = new Map<string, number>();
    for (const r of requests) {
      const team = r.maintenanceTeam || "Unassigned";
      counts.set(team, (counts.get(team) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  }, [requests]);

  const teamPerformance = useMemo(() => {
    const teamTotals = new Map<string, { total: number; repaired: number }>();
    for (const r of requests) {
      const team = r.maintenanceTeam || "Unassigned";
      const current = teamTotals.get(team) ?? { total: 0, repaired: 0 };
      current.total += 1;
      if (r.status === "repaired") current.repaired += 1;
      teamTotals.set(team, current);
    }

    const palette = ["bg-blue-500", "bg-green-500", "bg-orange-500", "bg-purple-500"];

    return Array.from(teamTotals.entries())
      .map(([name, counts]) => {
        const score = counts.total === 0 ? 0 : Math.round((counts.repaired / counts.total) * 100);
        return { name, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map((t, idx) => ({ ...t, color: palette[idx % palette.length] }));
  }, [requests]);

  const equipmentStatusCards = useMemo(() => {
    const total = equipment.length;
    const scrapped = equipment.filter((e) => e.status === "scrapped").length;
    const active = total - scrapped;

    const openPreventiveEquipment = new Set(
      openRequests
        .filter((r) => r.requestType === "preventive")
        .map((r) => r.equipmentId),
    );
    const openCorrectiveEquipment = new Set(
      openRequests
        .filter((r) => r.requestType === "corrective")
        .map((r) => r.equipmentId),
    );

    return [
      {
        label: "Operational",
        value: active,
        color: "text-green-600",
        bg: "bg-green-50",
      },
      {
        label: "Maintenance",
        value: openPreventiveEquipment.size,
        color: "text-blue-600",
        bg: "bg-blue-50",
      },
      {
        label: "Repair",
        value: openCorrectiveEquipment.size,
        color: "text-orange-600",
        bg: "bg-orange-50",
      },
      {
        label: "Scrapped",
        value: scrapped,
        color: "text-red-600",
        bg: "bg-red-50",
      },
    ];
  }, [equipment, openRequests]);

  const upcomingMaintenance = useMemo(() => {
    const todayIso = new Date().toISOString().slice(0, 10);
    return requests
      .filter(
        (r) =>
          r.requestType === "preventive" &&
          Boolean(r.scheduledDate) &&
          (r.scheduledDate as string) >= todayIso &&
          r.status !== "repaired" &&
          r.status !== "scrap",
      )
      .slice()
      .sort((a, b) => (a.scheduledDate as string).localeCompare(b.scheduledDate as string))
      .slice(0, 4)
      .map((r) => ({ task: r.subject, date: r.scheduledDate as string }));
  }, [requests]);

  const totalMaintenanceHours = useMemo(() => {
    const hours = requests
      .map((r) => r.durationHours)
      .filter((n): n is number => typeof n === "number" && Number.isFinite(n));
    return Math.round(hours.reduce((a, b) => a + b, 0) * 10) / 10;
  }, [requests]);

  const totalCost = useMemo(() => {
    return Math.round(totalMaintenanceHours * hourlyRate);
  }, [hourlyRate, totalMaintenanceHours]);

  const equipmentUptime = useMemo(() => {
    if (equipment.length === 0) return 0;
    const active = equipment.filter((e) => e.status === "active").length;
    return Math.round((active / equipment.length) * 1000) / 10;
  }, [equipment]);

  const preventiveVsCorrective = useMemo(() => {
    const preventive = requests.filter((r) => r.requestType === "preventive").length;
    const corrective = requests.filter((r) => r.requestType === "corrective").length;
    const total = preventive + corrective;
    if (total === 0) return { preventive: 0, corrective: 0 };
    return {
      preventive: Math.round((preventive / total) * 100),
      corrective: Math.round((corrective / total) * 100),
    };
  }, [requests]);

  const equipmentCategoryData = useMemo(() => {
    const palette = ["#7c3aed", "#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#6366f1"];
    const counts = new Map<string, number>();
    for (const e of equipment) {
      const key = e.department || "Unassigned";
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .map(([name, value], idx) => ({
        name,
        value,
        color: palette[idx % palette.length],
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [equipment]);

  const maintenanceTypeData = useMemo(() => {
    const corrective = requests.filter((r) => r.requestType === "corrective").length;
    const preventive = requests.filter((r) => r.requestType === "preventive").length;
    return [
      { name: "Corrective", value: corrective, color: "#ef4444" },
      { name: "Preventive", value: preventive, color: "#22c55e" },
    ].filter((d) => d.value > 0);
  }, [requests]);

  const costByTeamData = useMemo(() => {
    const totals = new Map<string, number>();
    for (const r of requests) {
      const hours = typeof r.durationHours === "number" ? r.durationHours : 0;
      if (!hours) continue;
      const team = r.maintenanceTeam || "Unassigned";
      totals.set(team, (totals.get(team) ?? 0) + hours * hourlyRate);
    }
    return Array.from(totals.entries())
      .map(([name, value]) => ({ name, value: Math.round(value) }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  }, [requests]);

  const stats = [
    {
      label: "Total Requests",
      value: String(totalRequests),
      change: "—",
      trend: "up",
      icon: BarChart3,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Avg Response Time",
      value: `${avgHours}h`,
      change: "—",
      trend: "down",
      icon: Clock,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      label: "Completion Rate",
      value: `${completionRate}%`,
      change: "—",
      trend: "up",
      icon: CheckCircle,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      label: "Overdue Tasks",
      value: String(overdueTasks),
      change: "—",
      trend: "down",
      icon: AlertCircle,
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports</h1>
            <p className="mt-1 text-muted-foreground">
              Analytics and insights on your maintenance operations
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* KPI Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className="border-0 shadow-sm overflow-hidden">
                <div className={stat.bgColor + " p-6"}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className="mt-2 text-3xl font-bold text-foreground">
                        {stat.value}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <TrendingUp
                          className={`h-3 w-3 ${stat.trend === "up"
                            ? "text-green-600"
                            : "text-red-600"
                            }`}
                        />
                        <span
                          className={`text-xs font-semibold ${stat.trend === "up"
                            ? "text-green-600"
                            : "text-red-600"
                            }`}
                        >
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div className={stat.bgColor + " rounded-lg p-3"}>
                      <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Requests by Team */}
          <Card className="border-0 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Requests by Team
            </h3>
            <SimpleBarChart data={teamRequestsData} height={300} />
          </Card>

          {/* Equipment Category Distribution */}
          <Card className="border-0 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Equipment Category Distribution
            </h3>
            <div className="flex justify-center">
              <SimplePieChart data={equipmentCategoryData} size={280} />
            </div>
          </Card>
        </div>

        {/* Additional Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Maintenance Type */}
          <Card className="border-0 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Maintenance Type Breakdown
            </h3>
            <div className="flex justify-center">
              <SimplePieChart data={maintenanceTypeData} size={280} />
            </div>
          </Card>

          {/* Cost by Team */}
          <Card className="border-0 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Cost by Team (in USD)
            </h3>
            <SimpleBarChart data={costByTeamData} height={300} />
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Team Performance */}
          <Card className="border-0 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Team Performance
            </h3>
            <div className="space-y-4">
              {teamPerformance.map((team) => (
                <div key={team.name}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-foreground">
                      {team.name}
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {team.score}%
                    </p>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className={`${team.color} h-2 rounded-full`}
                      style={{ width: `${team.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Equipment Status */}
          <Card className="border-0 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Equipment Status
            </h3>
            <div className="space-y-3">
              {equipmentStatusCards.map((status) => (
                <div
                  key={status.label}
                  className={`flex items-center justify-between p-3 rounded-lg ${status.bg}`}
                >
                  <p className="text-sm font-medium text-foreground">
                    {status.label}
                  </p>
                  <p className={`text-lg font-bold ${status.color}`}>
                    {status.value}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Maintenance Schedule */}
          <Card className="border-0 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Upcoming Maintenance
            </h3>
            <div className="space-y-3">
              {upcomingMaintenance.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">
                    No upcoming preventive maintenance.
                  </p>
                </div>
              ) : (
                upcomingMaintenance.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-secondary/50"
                  >
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">
                        {item.task}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Summary Section */}
        <Card className="border-0 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Report Summary
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Total Maintenance Hours
              </p>
              <p className="text-2xl font-bold text-foreground">
                {totalMaintenanceHours} hrs
              </p>
              <p className="text-xs text-muted-foreground mt-1">—</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Cost</p>
              <p className="text-2xl font-bold text-foreground">${totalCost}</p>
              <p className="text-xs text-muted-foreground mt-1">—</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Equipment Uptime
              </p>
              <p className="text-2xl font-bold text-foreground">{equipmentUptime}%</p>
              <p className="text-xs text-muted-foreground mt-1">—</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Preventive vs Corrective
              </p>
              <p className="text-2xl font-bold text-foreground">
                {preventiveVsCorrective.preventive}% / {preventiveVsCorrective.corrective}%
              </p>
              <p className="text-xs text-muted-foreground mt-1">—</p>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
