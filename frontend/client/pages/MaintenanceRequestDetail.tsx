import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@/components/gearguard/StatusBadge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    useGearGuard,
    type MaintenanceRequestStatus,
    type MaintenanceRequestType,
} from "@/contexts/GearGuardContext";
import { AlertCircle, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MaintenanceRequestDetail() {
    const navigate = useNavigate();
    const { requestId } = useParams();

    const {
        equipment,
        getEquipmentById,
        getRequestById,
        updateRequest,
        isRequestOverdue,
    } = useGearGuard();

    const request = requestId ? getRequestById(requestId) : undefined;

    const eq = useMemo(() => {
        if (!request) return undefined;
        return getEquipmentById(request.equipmentId);
    }, [getEquipmentById, request]);

    const [draft, setDraft] = useState(() => ({
        subject: request?.subject ?? "",
        equipmentId: request?.equipmentId ?? "",
        requestType: request?.requestType ?? ("corrective" as MaintenanceRequestType),
        maintenanceTeam: request?.maintenanceTeam ?? "",
        assignedTechnician: request?.assignedTechnician ?? "",
        scheduledDate: request?.scheduledDate ?? "",
        durationHours: request?.durationHours?.toString() ?? "",
        status: request?.status ?? ("new" as MaintenanceRequestStatus),
    }));

    const overdue = request ? isRequestOverdue(request) : false;

    const technicians = useMemo(
        () => [...new Set(equipment.map((e) => e.defaultTechnician).filter(Boolean))] as string[],
        [equipment],
    );

    const teams = useMemo(
        () => [...new Set(equipment.map((e) => e.maintenanceTeam))].sort(),
        [equipment],
    );

    const canSave = Boolean(request) && draft.subject.trim().length > 0;

    if (!request) {
        return (
            <MainLayout>
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Button variant="outline" onClick={() => navigate("/maintenance")}>
                            <ChevronLeft className="h-4 w-4 mr-2" />
                            Back
                        </Button>
                        <div>
                            <h1 className="text-2xl font-semibold text-foreground">
                                Request not found
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                The maintenance request you’re looking for doesn’t exist.
                            </p>
                        </div>
                    </div>
                </div>
            </MainLayout>
        );
    }

    const handleSave = () => {
        if (!canSave) return;
        updateRequest(request.id, {
            subject: draft.subject.trim(),
            equipmentId: draft.equipmentId,
            requestType: draft.requestType,
            maintenanceTeam: draft.maintenanceTeam,
            assignedTechnician: draft.assignedTechnician,
            scheduledDate:
                draft.requestType === "preventive" ? draft.scheduledDate : undefined,
            durationHours: draft.durationHours
                ? Number(draft.durationHours)
                : undefined,
        });
    };

    const setStatus = (status: MaintenanceRequestStatus) => {
        updateRequest(request.id, { status });
        setDraft((p) => ({ ...p, status }));
    };

    const technicianInitial = (draft.assignedTechnician || "?").slice(0, 1).toUpperCase();

    return (
        <MainLayout>
            <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                        <Button
                            variant="ghost"
                            className="px-0 text-muted-foreground hover:text-foreground"
                            onClick={() => navigate("/maintenance")}
                        >
                            <ChevronLeft className="h-4 w-4 mr-2" />
                            Maintenance Requests
                        </Button>

                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold text-foreground">Request</h1>
                            <StatusBadge status={draft.status} />
                            {overdue && (
                                <div className="inline-flex items-center gap-2 rounded-md bg-red-50 px-2 py-1">
                                    <AlertCircle className="h-3 w-3 text-red-600" />
                                    <span className="text-xs font-semibold text-red-700">
                                        Overdue
                                    </span>
                                </div>
                            )}
                        </div>

                        <p className="text-sm text-muted-foreground">
                            {eq ? eq.name : "Equipment"}
                            {draft.scheduledDate ? ` · Scheduled ${draft.scheduledDate}` : ""}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 justify-end">
                        {draft.status === "new" && (
                            <Button onClick={() => setStatus("in-progress")}>Start Work</Button>
                        )}
                        {draft.status !== "repaired" && draft.status !== "scrap" && (
                            <Button
                                variant="outline"
                                onClick={() => setStatus("repaired")}
                            >
                                Mark Repaired
                            </Button>
                        )}
                        {draft.status !== "scrap" && (
                            <Button variant="destructive" onClick={() => setStatus("scrap")}>
                                Mark Scrap
                            </Button>
                        )}
                        <Button variant="outline" onClick={handleSave} disabled={!canSave}>
                            Save
                        </Button>
                    </div>
                </div>

                <Card className="border-0 shadow-sm p-6">
                    <div className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input
                                    id="subject"
                                    value={draft.subject}
                                    onChange={(e) =>
                                        setDraft((p) => ({ ...p, subject: e.target.value }))
                                    }
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label>Assigned Technician</Label>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="bg-gradient-to-br from-primary to-purple-700 text-white text-xs font-semibold">
                                            {technicianInitial}
                                        </AvatarFallback>
                                    </Avatar>
                                    <Select
                                        value={draft.assignedTechnician}
                                        onValueChange={(value) =>
                                            setDraft((p) => ({ ...p, assignedTechnician: value }))
                                        }
                                    >
                                        <SelectTrigger className="flex-1">
                                            <SelectValue placeholder="Select technician" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {technicians
                                                .slice()
                                                .sort((a, b) => a.localeCompare(b))
                                                .map((t) => (
                                                    <SelectItem key={t} value={t}>
                                                        {t}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label>Equipment</Label>
                                <Select
                                    value={draft.equipmentId}
                                    onValueChange={(value) => {
                                        setDraft((p) => ({ ...p, equipmentId: value }));
                                        const selected = equipment.find((e) => e.id === value);
                                        if (selected) {
                                            if (!draft.maintenanceTeam)
                                                setDraft((p) => ({ ...p, maintenanceTeam: selected.maintenanceTeam }));
                                            if (!draft.assignedTechnician && selected.defaultTechnician)
                                                setDraft((p) => ({ ...p, assignedTechnician: selected.defaultTechnician ?? "" }));
                                        }
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select equipment" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {equipment
                                            .slice()
                                            .sort((a, b) => a.name.localeCompare(b.name))
                                            .map((e) => (
                                                <SelectItem key={e.id} value={e.id}>
                                                    {e.name}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label>Request Type</Label>
                                <Select
                                    value={draft.requestType}
                                    onValueChange={(value) =>
                                        setDraft((p) => ({ ...p, requestType: value as MaintenanceRequestType }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="corrective">Corrective</SelectItem>
                                        <SelectItem value="preventive">Preventive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label>Maintenance Team</Label>
                                <Select
                                    value={draft.maintenanceTeam}
                                    onValueChange={(value) =>
                                        setDraft((p) => ({ ...p, maintenanceTeam: value }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select team" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {teams.map((team) => (
                                            <SelectItem key={team} value={team}>
                                                {team}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label>Scheduled Date</Label>
                                <Input
                                    type="date"
                                    value={draft.scheduledDate}
                                    disabled={draft.requestType !== "preventive"}
                                    onChange={(e) =>
                                        setDraft((p) => ({ ...p, scheduledDate: e.target.value }))
                                    }
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label>Duration (Hours spent)</Label>
                                <Input
                                    value={draft.durationHours}
                                    onChange={(e) =>
                                        setDraft((p) => ({ ...p, durationHours: e.target.value }))
                                    }
                                    placeholder="e.g. 1.5"
                                />
                            </div>

                            <div
                                className={cn(
                                    "rounded-lg border border-border p-4",
                                    overdue && "border-red-200 bg-red-50",
                                )}
                            >
                                <p className="text-sm font-semibold text-foreground">Lifecycle</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Keep status updated as work progresses.
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <StatusBadge status={draft.status} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </MainLayout>
    );
}
