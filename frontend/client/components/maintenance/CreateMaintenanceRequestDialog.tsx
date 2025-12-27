import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
    useGearGuard,
    type MaintenanceRequestType,
} from "@/contexts/GearGuardContext";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    defaultDate?: string;
    defaultEquipmentId?: string;
}

export function CreateMaintenanceRequestDialog({
    open,
    onOpenChange,
    defaultDate,
    defaultEquipmentId,
}: Props) {
    const navigate = useNavigate();
    const { equipment, createRequest } = useGearGuard();

    const [subject, setSubject] = useState("");
    const [notes, setNotes] = useState("");
    const [equipmentId, setEquipmentId] = useState<string>(defaultEquipmentId ?? "");
    const [requestType, setRequestType] = useState<MaintenanceRequestType>(
        defaultDate ? "preventive" : "corrective",
    );
    const [maintenanceTeam, setMaintenanceTeam] = useState<string>("");
    const [assignedTechnician, setAssignedTechnician] = useState<string>("");
    const [scheduledDate, setScheduledDate] = useState<string>(defaultDate ?? "");

    useEffect(() => {
        if (!open) return;
        setSubject("");
        setNotes("");
        setEquipmentId(defaultEquipmentId ?? "");
        setRequestType(defaultDate ? "preventive" : "corrective");
        const eq = defaultEquipmentId
            ? equipment.find((e) => e.id === defaultEquipmentId)
            : undefined;
        setMaintenanceTeam(eq?.maintenanceTeam ?? "");
        setAssignedTechnician(eq?.defaultTechnician ?? "");
        setScheduledDate(defaultDate ?? "");
    }, [defaultDate, defaultEquipmentId, equipment, open]);

    const selectedEquipment = useMemo(
        () => equipment.find((e) => e.id === equipmentId),
        [equipment, equipmentId],
    );

    const teams = useMemo(
        () => [...new Set(equipment.map((e) => e.maintenanceTeam))].sort(),
        [equipment],
    );

    const technicians = useMemo(
        () => [...new Set(equipment.map((e) => e.defaultTechnician).filter(Boolean))] as string[],
        [equipment],
    );

    const canSubmit =
        subject.trim().length > 0 &&
        equipmentId &&
        maintenanceTeam &&
        assignedTechnician &&
        (requestType === "preventive" ? Boolean(scheduledDate) : true);

    const reset = () => {
        setSubject("");
        setNotes("");
        setEquipmentId(defaultEquipmentId ?? "");
        setRequestType(defaultDate ? "preventive" : "corrective");
        setMaintenanceTeam("");
        setAssignedTechnician("");
        setScheduledDate(defaultDate ?? "");
    };

    const handleClose = (nextOpen: boolean) => {
        onOpenChange(nextOpen);
        if (!nextOpen) reset();
    };

    const handleCreate = () => {
        if (!canSubmit) return;

        const id = createRequest({
            subject: subject.trim(),
            equipmentId,
            requestType,
            maintenanceTeam,
            assignedTechnician,
            scheduledDate: requestType === "preventive" ? scheduledDate : undefined,
            durationHours: undefined,
            status: "new",
        });

        handleClose(false);
        navigate(`/maintenance/${id}`);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Create Maintenance Request</DialogTitle>
                    <DialogDescription>
                        Create a new corrective or preventive maintenance request.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-5">
                    <div className="grid gap-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                            id="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="e.g. Hydraulic pump vibration check"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label>Equipment</Label>
                        <Select
                            value={equipmentId}
                            onValueChange={(value) => {
                                setEquipmentId(value);
                                const eq = equipment.find((e) => e.id === value);
                                if (eq) {
                                    if (!maintenanceTeam) setMaintenanceTeam(eq.maintenanceTeam);
                                    if (!assignedTechnician && eq.defaultTechnician)
                                        setAssignedTechnician(eq.defaultTechnician);
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
                        {selectedEquipment && (
                            <p className="text-xs text-muted-foreground">
                                {selectedEquipment.serialNumber} · {selectedEquipment.department} · {selectedEquipment.location}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Request Type</Label>
                            <Select
                                value={requestType}
                                onValueChange={(v) => setRequestType(v as MaintenanceRequestType)}
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
                            <Label>Scheduled Date</Label>
                            <Input
                                type="date"
                                value={scheduledDate}
                                onChange={(e) => setScheduledDate(e.target.value)}
                                disabled={requestType !== "preventive"}
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Maintenance Team</Label>
                            <Select value={maintenanceTeam} onValueChange={setMaintenanceTeam}>
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
                            <Label>Assigned Technician</Label>
                            <Select value={assignedTechnician} onValueChange={setAssignedTechnician}>
                                <SelectTrigger>
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

                    <div className="grid gap-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                            id="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Optional internal notes"
                            rows={4}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => handleClose(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleCreate} disabled={!canSubmit}>
                        Create
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
