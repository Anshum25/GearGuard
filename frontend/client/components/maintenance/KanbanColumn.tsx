import { Card } from "@/components/ui/card";
import { KanbanCard } from "./KanbanCard";
import { cn } from "@/lib/utils";

interface Request {
  id: string;
  subject: string;
  equipment: string;
  technician: string;
  technicianInitial: string;
  scheduledDate?: string;
  isOverdue?: boolean;
}

interface KanbanColumnProps {
  title: string;
  status: "new" | "in-progress" | "repaired" | "scrap";
  cards: Request[];
  cardCount: number;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, status: string) => void;
  onCardDragStart: (e: React.DragEvent, cardId: string) => void;
  onCardOpen?: (id: string) => void;
}

const statusConfig = {
  new: {
    bgColor: "bg-gray-50",
    dotColor: "bg-gray-400",
    textColor: "text-gray-700",
  },
  "in-progress": {
    bgColor: "bg-blue-50",
    dotColor: "bg-blue-400",
    textColor: "text-blue-700",
  },
  repaired: {
    bgColor: "bg-green-50",
    dotColor: "bg-green-400",
    textColor: "text-green-700",
  },
  scrap: {
    bgColor: "bg-red-50",
    dotColor: "bg-red-400",
    textColor: "text-red-700",
  },
};

export function KanbanColumn({
  title,
  status,
  cards,
  cardCount,
  onDragOver,
  onDrop,
  onCardDragStart,
  onCardOpen,
}: KanbanColumnProps) {
  const config = statusConfig[status as keyof typeof statusConfig];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className={cn("h-2 w-2 rounded-full", config.dotColor)} />
        <h3 className={cn("font-semibold", config.textColor)}>{title}</h3>
        <span className="ml-auto text-sm font-medium text-muted-foreground bg-muted rounded-full px-2 py-0.5">
          {cardCount}
        </span>
      </div>

      <div
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, status)}
        className={cn(
          "min-h-96 rounded-lg border-2 border-dashed p-4 transition-colors",
          config.bgColor,
          "border-gray-300 hover:border-primary",
        )}
      >
        <div className="space-y-3">
          {cards.length === 0 ? (
            <div className="flex h-96 items-center justify-center">
              <p className="text-sm text-muted-foreground">No requests</p>
            </div>
          ) : (
            cards.map((card) => (
              <KanbanCard
                key={card.id}
                {...card}
                onDragStart={onCardDragStart}
                onOpen={onCardOpen}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
