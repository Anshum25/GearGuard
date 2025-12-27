import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface KanbanCardProps {
  id: string;
  subject: string;
  equipment: string;
  technician: string;
  technicianInitial: string;
  scheduledDate?: string;
  isOverdue?: boolean;
  onDragStart: (e: React.DragEvent, cardId: string) => void;
  onOpen?: (id: string) => void;
}

export function KanbanCard({
  id,
  subject,
  equipment,
  technician,
  technicianInitial,
  scheduledDate,
  isOverdue,
  onDragStart,
  onOpen,
}: KanbanCardProps) {
  return (
    <Card
      draggable
      onDragStart={(e) => onDragStart(e, id)}
      onClick={() => onOpen?.(id)}
      className={cn(
        "cursor-pointer space-y-3 border-0 shadow-sm p-4 hover:shadow-md transition-shadow",
        isOverdue && "border-l-4 border-l-red-500",
      )}
    >
      {isOverdue && (
        <div className="flex items-center gap-2 rounded-md bg-red-50 px-2 py-1">
          <AlertCircle className="h-3 w-3 text-red-600" />
          <span className="text-xs font-semibold text-red-700">Overdue</span>
        </div>
      )}

      <div>
        <p className="font-semibold text-foreground text-sm line-clamp-2">
          {subject}
        </p>
        <p className="text-xs text-muted-foreground mt-1">{equipment}</p>
      </div>

      {scheduledDate && (
        <p className="text-xs text-muted-foreground">
          <span className="font-medium">Scheduled:</span> {scheduledDate}
        </p>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-purple-700 text-white text-xs font-semibold">
          {technicianInitial}
        </div>
        <p className="text-xs text-muted-foreground">{technician}</p>
      </div>
    </Card>
  );
}
