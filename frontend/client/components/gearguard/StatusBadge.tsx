import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { MaintenanceRequestStatus } from "@/contexts/GearGuardContext";

const statusLabels: Record<MaintenanceRequestStatus, string> = {
    new: "New",
    "in-progress": "In Progress",
    repaired: "Repaired",
    scrap: "Scrap",
};

const statusClasses: Record<MaintenanceRequestStatus, string> = {
    new: "bg-gray-100 text-gray-700 border-transparent",
    "in-progress": "bg-blue-100 text-blue-700 border-transparent",
    repaired: "bg-green-100 text-green-700 border-transparent",
    scrap: "bg-red-100 text-red-700 border-transparent",
};

export function StatusBadge({
    status,
    className,
}: {
    status: MaintenanceRequestStatus;
    className?: string;
}) {
    return (
        <Badge
            variant="secondary"
            className={cn("font-semibold", statusClasses[status], className)}
        >
            {statusLabels[status]}
        </Badge>
    );
}
