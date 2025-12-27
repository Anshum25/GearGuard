import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useGearGuard, type EquipmentStatus } from "@/contexts/GearGuardContext";
import { ChevronLeft, Wrench } from "lucide-react";

export default function EquipmentDetail() {
    const navigate = useNavigate();
    const { equipmentId } = useParams();
    const { getEquipmentById, updateEquipment, getOpenRequestCountForEquipment } =
        useGearGuard();

    const equipment = equipmentId ? getEquipmentById(equipmentId) : undefined;

    const [draft, setDraft] = useState(() => ({
        name: equipment?.name ?? "",
        serialNumber: equipment?.serialNumber ?? "",
        department: equipment?.department ?? "",
        assignedEmployee: equipment?.assignedEmployee ?? "",
        purchaseDate: equipment?.purchaseDate ?? "",
        warrantyExpiry: equipment?.warrantyExpiry ?? "",
        location: equipment?.location ?? "",
        maintenanceTeam: equipment?.maintenanceTeam ?? "",
        defaultTechnician: equipment?.defaultTechnician ?? "",
        status: equipment?.status ?? ("active" as EquipmentStatus),
    }));

    const canSave = Boolean(equipment) && draft.name.trim().length > 0;

    const openCount = useMemo(() => {
        if (!equipment) return 0;
        return getOpenRequestCountForEquipment(equipment.id);
    }, [equipment, getOpenRequestCountForEquipment]);

    if (!equipment) {
        return (
            <MainLayout>
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Button variant="outline" onClick={() => navigate("/equipment")}>
                            <ChevronLeft className="h-4 w-4 mr-2" />
                            Back
                        </Button>
                        <div>
                            <h1 className="text-2xl font-semibold text-foreground">
                                Equipment not found
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                The equipment record you’re looking for doesn’t exist.
                            </p>
                        </div>
                    </div>
                </div>
            </MainLayout>
        );
    }

    const handleSave = () => {
        if (!canSave) return;
        updateEquipment(equipment.id, {
            name: draft.name.trim(),
            serialNumber: draft.serialNumber.trim(),
            department: draft.department.trim(),
            assignedEmployee: draft.assignedEmployee.trim(),
            purchaseDate: draft.purchaseDate || undefined,
            warrantyExpiry: draft.warrantyExpiry || undefined,
            location: draft.location.trim(),
            maintenanceTeam: draft.maintenanceTeam.trim(),
            defaultTechnician: draft.defaultTechnician.trim() || undefined,
            status: draft.status,
        });
    };

    return (
        <MainLayout>
            <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                        <Button
                            variant="ghost"
                            className="px-0 text-muted-foreground hover:text-foreground"
                            onClick={() => navigate("/equipment")}
                        >
                            <ChevronLeft className="h-4 w-4 mr-2" />
                            Equipment
                        </Button>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold text-foreground">
                                {equipment.name}
                            </h1>
                            <Badge
                                variant="secondary"
                                className={
                                    equipment.status === "active"
                                        ? "bg-green-100 text-green-700 border-transparent"
                                        : "bg-red-100 text-red-700 border-transparent"
                                }
                            >
                                {equipment.status === "active" ? "Active" : "Scrapped"}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {equipment.serialNumber} · {equipment.department} · {equipment.location}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            className="gap-2"
                            onClick={() => navigate(`/maintenance?equipmentId=${equipment.id}`)}
                        >
                            <Wrench className="h-4 w-4" />
                            Maintenance
                            <span className="ml-1 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-primary/10 px-2 text-xs font-semibold text-primary">
                                {openCount}
                            </span>
                        </Button>
                        <Button onClick={handleSave} disabled={!canSave}>
                            Save
                        </Button>
                    </div>
                </div>

                <Card className="border-0 shadow-sm p-6">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-lg font-semibold text-foreground">Basic Info</h2>
                            <p className="text-sm text-muted-foreground">
                                Core identification and ownership fields.
                            </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Equipment Name</Label>
                                <Input
                                    id="name"
                                    value={draft.name}
                                    onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="serial">Serial Number</Label>
                                <Input
                                    id="serial"
                                    value={draft.serialNumber}
                                    onChange={(e) =>
                                        setDraft((p) => ({ ...p, serialNumber: e.target.value }))
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="department">Department</Label>
                                <Input
                                    id="department"
                                    value={draft.department}
                                    onChange={(e) =>
                                        setDraft((p) => ({ ...p, department: e.target.value }))
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="employee">Assigned Employee</Label>
                                <Input
                                    id="employee"
                                    value={draft.assignedEmployee}
                                    onChange={(e) =>
                                        setDraft((p) => ({ ...p, assignedEmployee: e.target.value }))
                                    }
                                />
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h2 className="text-lg font-semibold text-foreground">
                                Technical Info
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Procurement and location details.
                            </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="purchase">Purchase Date</Label>
                                <Input
                                    id="purchase"
                                    type="date"
                                    value={draft.purchaseDate}
                                    onChange={(e) =>
                                        setDraft((p) => ({ ...p, purchaseDate: e.target.value }))
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="warranty">Warranty Expiry</Label>
                                <Input
                                    id="warranty"
                                    type="date"
                                    value={draft.warrantyExpiry}
                                    onChange={(e) =>
                                        setDraft((p) => ({ ...p, warrantyExpiry: e.target.value }))
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    value={draft.location}
                                    onChange={(e) =>
                                        setDraft((p) => ({ ...p, location: e.target.value }))
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Status</Label>
                                <Select
                                    value={draft.status}
                                    onValueChange={(value) =>
                                        setDraft((p) => ({ ...p, status: value as EquipmentStatus }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="scrapped">Scrapped</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h2 className="text-lg font-semibold text-foreground">
                                Responsibility
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Default assignment to a team and technician.
                            </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="team">Maintenance Team</Label>
                                <Input
                                    id="team"
                                    value={draft.maintenanceTeam}
                                    onChange={(e) =>
                                        setDraft((p) => ({ ...p, maintenanceTeam: e.target.value }))
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="tech">Default Technician</Label>
                                <Input
                                    id="tech"
                                    value={draft.defaultTechnician}
                                    onChange={(e) =>
                                        setDraft((p) => ({ ...p, defaultTechnician: e.target.value }))
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </MainLayout>
    );
}
