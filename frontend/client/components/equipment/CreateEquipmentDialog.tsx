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
import {
    useGearGuard,
    type EquipmentStatus,
} from "@/contexts/GearGuardContext";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CreateEquipmentDialog({ open, onOpenChange }: Props) {
    const navigate = useNavigate();
    const { equipment, createEquipment } = useGearGuard();

    const [name, setName] = useState("");
    const [serialNumber, setSerialNumber] = useState("");
    const [department, setDepartment] = useState("");
    const [assignedEmployee, setAssignedEmployee] = useState("");
    const [maintenanceTeam, setMaintenanceTeam] = useState("");
    const [location, setLocation] = useState("");
    const [status, setStatus] = useState<EquipmentStatus>("active");
    const [purchaseDate, setPurchaseDate] = useState("");
    const [warrantyExpiry, setWarrantyExpiry] = useState("");
    const [defaultTechnician, setDefaultTechnician] = useState("");

    const departments = useMemo(
        () => [...new Set(equipment.map((e) => e.department))].sort(),
        [equipment],
    );

    const teams = useMemo(
        () => [...new Set(equipment.map((e) => e.maintenanceTeam))].sort(),
        [equipment],
    );

    const people = useMemo(() => {
        const values = new Set<string>();
        for (const e of equipment) {
            if (e.assignedEmployee) values.add(e.assignedEmployee);
            if (e.defaultTechnician) values.add(e.defaultTechnician);
        }
        return Array.from(values).sort();
    }, [equipment]);

    const reset = () => {
        setName("");
        setSerialNumber("");
        setDepartment("");
        setAssignedEmployee("");
        setMaintenanceTeam("");
        setLocation("");
        setStatus("active");
        setPurchaseDate("");
        setWarrantyExpiry("");
        setDefaultTechnician("");
    };

    useEffect(() => {
        if (!open) return;
        reset();
    }, [open]);

    const canSubmit = name.trim().length > 0;

    const handleClose = (nextOpen: boolean) => {
        onOpenChange(nextOpen);
        if (!nextOpen) reset();
    };

    const handleCreate = () => {
        if (!canSubmit) return;

        const id = createEquipment({
            name: name.trim(),
            serialNumber: serialNumber.trim(),
            department: department.trim(),
            assignedEmployee: assignedEmployee.trim(),
            maintenanceTeam: maintenanceTeam.trim(),
            location: location.trim(),
            status,
            purchaseDate: purchaseDate || undefined,
            warrantyExpiry: warrantyExpiry || undefined,
            defaultTechnician: defaultTechnician.trim() || undefined,
        });

        handleClose(false);
        navigate(`/equipment/${id}`);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Create Equipment</DialogTitle>
                    <DialogDescription>
                        Add a new equipment record. You can complete additional fields later.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-5">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Equipment Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Air Compressor #1"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="serial">Serial Number</Label>
                            <Input
                                id="serial"
                                value={serialNumber}
                                onChange={(e) => setSerialNumber(e.target.value)}
                                placeholder="e.g. AC-2025-001"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Department</Label>
                            <Select value={department} onValueChange={setDepartment}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent>
                                    {departments.map((d) => (
                                        <SelectItem key={d} value={d}>
                                            {d}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label>Assigned Employee</Label>
                            <Select value={assignedEmployee} onValueChange={setAssignedEmployee}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select employee" />
                                </SelectTrigger>
                                <SelectContent>
                                    {people.map((p) => (
                                        <SelectItem key={p} value={p}>
                                            {p}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label>Maintenance Team</Label>
                            <Select value={maintenanceTeam} onValueChange={setMaintenanceTeam}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select team" />
                                </SelectTrigger>
                                <SelectContent>
                                    {teams.map((t) => (
                                        <SelectItem key={t} value={t}>
                                            {t}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="e.g. Floor A, Zone 2"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Status</Label>
                            <Select
                                value={status}
                                onValueChange={(value) => setStatus(value as EquipmentStatus)}
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

                        <div className="grid gap-2">
                            <Label>Default Technician</Label>
                            <Select value={defaultTechnician} onValueChange={setDefaultTechnician}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select technician" />
                                </SelectTrigger>
                                <SelectContent>
                                    {people.map((p) => (
                                        <SelectItem key={p} value={p}>
                                            {p}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label>Purchase Date</Label>
                            <Input
                                type="date"
                                value={purchaseDate}
                                onChange={(e) => setPurchaseDate(e.target.value)}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Warranty Expiry</Label>
                            <Input
                                type="date"
                                value={warrantyExpiry}
                                onChange={(e) => setWarrantyExpiry(e.target.value)}
                            />
                        </div>
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
