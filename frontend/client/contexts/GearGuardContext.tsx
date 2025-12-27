import React, { createContext, useContext, useMemo, useState } from "react";

export type EquipmentStatus = "active" | "scrapped";
export type MaintenanceRequestStatus = "new" | "in-progress" | "repaired" | "scrap";
export type MaintenanceRequestType = "corrective" | "preventive";

export interface Equipment {
    id: string;
    name: string;
    serialNumber: string;
    department: string;
    assignedEmployee: string;
    maintenanceTeam: string;
    location: string;
    status: EquipmentStatus;
    purchaseDate?: string;
    warrantyExpiry?: string;
    defaultTechnician?: string;
}

export interface MaintenanceRequest {
    id: string;
    subject: string;
    equipmentId: string;
    requestType: MaintenanceRequestType;
    maintenanceTeam: string;
    assignedTechnician: string;
    scheduledDate?: string;
    durationHours?: number;
    status: MaintenanceRequestStatus;
    createdAt: string;
}

interface GearGuardContextValue {
    equipment: Equipment[];
    requests: MaintenanceRequest[];
    getEquipmentById: (id: string) => Equipment | undefined;
    getRequestById: (id: string) => MaintenanceRequest | undefined;
    createEquipment: (equipment: Omit<Equipment, "id">) => string;
    updateEquipment: (id: string, patch: Partial<Equipment>) => void;
    updateRequest: (id: string, patch: Partial<MaintenanceRequest>) => void;
    createRequest: (request: Omit<MaintenanceRequest, "id" | "createdAt">) => string;
    getOpenRequestCountForEquipment: (equipmentId: string) => number;
    isRequestOverdue: (req: MaintenanceRequest) => boolean;
}

const GearGuardContext = createContext<GearGuardContextValue | null>(null);

function toISODate(d: Date) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}

function isPastDate(dateIso: string) {
    const today = new Date();
    const todayIso = toISODate(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
    return dateIso < todayIso;
}

const initialEquipment: Equipment[] = [
    {
        id: "1",
        name: "Hydraulic Pump #3",
        serialNumber: "HPM-2023-001",
        department: "Production",
        assignedEmployee: "John Smith",
        maintenanceTeam: "Hydraulics",
        location: "Floor A, Zone 3",
        status: "active",
        purchaseDate: "2023-03-12",
        warrantyExpiry: "2026-03-12",
        defaultTechnician: "John Smith",
    },
    {
        id: "2",
        name: "Conveyor Belt B2",
        serialNumber: "CB-2023-045",
        department: "Logistics",
        assignedEmployee: "Mike Johnson",
        maintenanceTeam: "Mechanical",
        location: "Warehouse 1",
        status: "active",
        purchaseDate: "2023-08-02",
        warrantyExpiry: "2025-08-02",
        defaultTechnician: "Mike Johnson",
    },
    {
        id: "3",
        name: "Main Motor Unit",
        serialNumber: "MMU-2022-089",
        department: "Production",
        assignedEmployee: "Sarah Davis",
        maintenanceTeam: "Electrical",
        location: "Floor B, Zone 1",
        status: "active",
        purchaseDate: "2022-11-20",
        warrantyExpiry: "2025-11-20",
        defaultTechnician: "Sarah Davis",
    },
    {
        id: "4",
        name: "Hydraulic Press #1",
        serialNumber: "HP-2023-012",
        department: "Manufacturing",
        assignedEmployee: "Robert Brown",
        maintenanceTeam: "Hydraulics",
        location: "Floor A, Zone 1",
        status: "active",
        purchaseDate: "2023-05-09",
        warrantyExpiry: "2026-05-09",
        defaultTechnician: "Robert Brown",
    },
    {
        id: "5",
        name: "Air Filter System",
        serialNumber: "AFS-2023-067",
        department: "Production",
        assignedEmployee: "Emily Wilson",
        maintenanceTeam: "Controls",
        location: "Floor C, Zone 2",
        status: "active",
        purchaseDate: "2023-01-18",
        warrantyExpiry: "2025-01-18",
        defaultTechnician: "Emily Wilson",
    },
    {
        id: "6",
        name: "Control Panel #1",
        serialNumber: "CP-2022-034",
        department: "Manufacturing",
        assignedEmployee: "John Smith",
        maintenanceTeam: "Electrical",
        location: "Floor B, Zone 3",
        status: "active",
        purchaseDate: "2022-09-15",
        warrantyExpiry: "2025-09-15",
        defaultTechnician: "John Smith",
    },
    {
        id: "7",
        name: "Spindle Motor",
        serialNumber: "SM-2023-156",
        department: "Production",
        assignedEmployee: "Mike Johnson",
        maintenanceTeam: "Electrical",
        location: "Floor A, Zone 2",
        status: "active",
        purchaseDate: "2023-10-01",
        warrantyExpiry: "2026-10-01",
        defaultTechnician: "Mike Johnson",
    },
    {
        id: "8",
        name: "Hoist System A",
        serialNumber: "HS-2022-078",
        department: "Logistics",
        assignedEmployee: "Sarah Davis",
        maintenanceTeam: "Mechanical",
        location: "Warehouse 2",
        status: "active",
        purchaseDate: "2022-07-11",
        warrantyExpiry: "2025-07-11",
        defaultTechnician: "Sarah Davis",
    },
    {
        id: "9",
        name: "Pump Assembly #2",
        serialNumber: "PA-2023-023",
        department: "Manufacturing",
        assignedEmployee: "Robert Brown",
        maintenanceTeam: "Hydraulics",
        location: "Floor C, Zone 1",
        status: "active",
        purchaseDate: "2023-06-22",
        warrantyExpiry: "2026-06-22",
        defaultTechnician: "Robert Brown",
    },
    {
        id: "10",
        name: "Legacy Motor #5",
        serialNumber: "LM-2020-091",
        department: "Production",
        assignedEmployee: "Emily Wilson",
        maintenanceTeam: "Electrical",
        location: "Storage",
        status: "scrapped",
        purchaseDate: "2020-02-10",
        warrantyExpiry: "2021-02-10",
        defaultTechnician: "Emily Wilson",
    },
];

const initialRequests: MaintenanceRequest[] = [
    {
        id: "1",
        subject: "Emergency Pump Repair",
        equipmentId: "1",
        requestType: "corrective",
        maintenanceTeam: "Hydraulics",
        assignedTechnician: "John Smith",
        status: "new",
        createdAt: "2024-12-22",
        scheduledDate: "2024-12-20",
    },
    {
        id: "2",
        subject: "Belt Replacement",
        equipmentId: "2",
        requestType: "preventive",
        maintenanceTeam: "Mechanical",
        assignedTechnician: "Mike Johnson",
        status: "new",
        createdAt: "2024-12-21",
        scheduledDate: "2024-12-28",
    },
    {
        id: "3",
        subject: "Motor Inspection",
        equipmentId: "3",
        requestType: "preventive",
        maintenanceTeam: "Electrical",
        assignedTechnician: "Sarah Davis",
        status: "new",
        createdAt: "2024-12-21",
        scheduledDate: "2024-12-29",
    },
    {
        id: "4",
        subject: "Hydraulic Fluid Change",
        equipmentId: "4",
        requestType: "preventive",
        maintenanceTeam: "Hydraulics",
        assignedTechnician: "John Smith",
        status: "in-progress",
        createdAt: "2024-12-20",
        scheduledDate: "2024-12-27",
        durationHours: 1.5,
    },
    {
        id: "5",
        subject: "Seal Replacement",
        equipmentId: "9",
        requestType: "corrective",
        maintenanceTeam: "Hydraulics",
        assignedTechnician: "Mike Johnson",
        status: "in-progress",
        createdAt: "2024-12-20",
    },
    {
        id: "6",
        subject: "Bearing Lubrication",
        equipmentId: "7",
        requestType: "preventive",
        maintenanceTeam: "Electrical",
        assignedTechnician: "Robert Brown",
        status: "in-progress",
        createdAt: "2024-12-19",
        durationHours: 2,
    },
    {
        id: "7",
        subject: "Cable Inspection",
        equipmentId: "8",
        requestType: "preventive",
        maintenanceTeam: "Mechanical",
        assignedTechnician: "Emily Wilson",
        status: "in-progress",
        createdAt: "2024-12-19",
    },
    {
        id: "8",
        subject: "Valve Calibration",
        equipmentId: "1",
        requestType: "preventive",
        maintenanceTeam: "Hydraulics",
        assignedTechnician: "John Smith",
        status: "repaired",
        createdAt: "2024-12-10",
        scheduledDate: "2024-12-20",
        durationHours: 1,
    },
    {
        id: "9",
        subject: "Filter Replacement",
        equipmentId: "5",
        requestType: "preventive",
        maintenanceTeam: "Controls",
        assignedTechnician: "Sarah Davis",
        status: "repaired",
        createdAt: "2024-12-09",
        scheduledDate: "2024-12-19",
        durationHours: 0.75,
    },
    {
        id: "10",
        subject: "Electrical Wiring Update",
        equipmentId: "6",
        requestType: "corrective",
        maintenanceTeam: "Electrical",
        assignedTechnician: "Robert Brown",
        status: "repaired",
        createdAt: "2024-12-08",
        durationHours: 3,
    },
    {
        id: "11",
        subject: "Paint Touch-up",
        equipmentId: "5",
        requestType: "corrective",
        maintenanceTeam: "Controls",
        assignedTechnician: "Emily Wilson",
        status: "repaired",
        createdAt: "2024-12-08",
        durationHours: 0.5,
    },
    {
        id: "12",
        subject: "Decommission Old Motor",
        equipmentId: "10",
        requestType: "corrective",
        maintenanceTeam: "Electrical",
        assignedTechnician: "Mike Johnson",
        status: "scrap",
        createdAt: "2024-12-07",
    },
    {
        id: "13",
        subject: "Remove Damaged Bearing",
        equipmentId: "7",
        requestType: "corrective",
        maintenanceTeam: "Electrical",
        assignedTechnician: "Robert Brown",
        status: "scrap",
        createdAt: "2024-12-07",
    },
];

export function GearGuardProvider({ children }: { children: React.ReactNode }) {
    const [equipment, setEquipment] = useState<Equipment[]>(initialEquipment);
    const [requests, setRequests] = useState<MaintenanceRequest[]>(initialRequests);

    const getEquipmentById = (id: string) => equipment.find((e) => e.id === id);

    const getRequestById = (id: string) => requests.find((r) => r.id === id);

    const createEquipment = (newEquipment: Omit<Equipment, "id">): string => {
        const newId = String(Date.now());
        setEquipment((prev) => [{ ...newEquipment, id: newId }, ...prev]);
        return newId;
    };

    const isRequestOverdue = (req: MaintenanceRequest) => {
        if (!req.scheduledDate) return false;
        if (req.status === "repaired" || req.status === "scrap") return false;
        return isPastDate(req.scheduledDate);
    };

    const updateEquipment = (id: string, patch: Partial<Equipment>) => {
        setEquipment((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));
    };

    const updateRequest = (id: string, patch: Partial<MaintenanceRequest>) => {
        setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    };

    const createRequest = (
        request: Omit<MaintenanceRequest, "id" | "createdAt">,
    ): string => {
        const newId = String(Date.now());
        setRequests((prev) => [
            {
                ...request,
                id: newId,
                createdAt: toISODate(new Date()),
            },
            ...prev,
        ]);
        return newId;
    };

    const getOpenRequestCountForEquipment = (equipmentId: string) => {
        return requests.filter(
            (r) =>
                r.equipmentId === equipmentId && r.status !== "repaired" && r.status !== "scrap",
        ).length;
    };

    const value = useMemo<GearGuardContextValue>(
        () => ({
            equipment,
            requests,
            getEquipmentById,
            getRequestById,
            createEquipment,
            updateEquipment,
            updateRequest,
            createRequest,
            getOpenRequestCountForEquipment,
            isRequestOverdue,
        }),
        [equipment, requests],
    );

    return (
        <GearGuardContext.Provider value={value}>{children}</GearGuardContext.Provider>
    );
}

export function useGearGuard() {
    const ctx = useContext(GearGuardContext);
    if (!ctx) throw new Error("useGearGuard must be used within GearGuardProvider");
    return ctx;
}
