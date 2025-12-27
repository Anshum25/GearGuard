import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { KanbanColumn } from "@/components/maintenance/KanbanColumn";
import { CreateMaintenanceRequestDialog } from "@/components/maintenance/CreateMaintenanceRequestDialog";
import { Button } from "@/components/ui/button";
import { useGearGuard, type MaintenanceRequestStatus } from "@/contexts/GearGuardContext";
import { Plus } from "lucide-react";

export default function Maintenance() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const equipmentIdFilter = searchParams.get("equipmentId") ?? undefined;

  const { requests, getEquipmentById, updateRequest, isRequestOverdue } =
    useGearGuard();

  const [draggedCard, setDraggedCard] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const handleDragStart = (e: React.DragEvent, cardId: string) => {
    setDraggedCard(cardId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();

    if (!draggedCard) return;

    updateRequest(draggedCard, { status: newStatus as MaintenanceRequestStatus });

    setDraggedCard(null);
  };

  const visibleRequests = useMemo(() => {
    if (!equipmentIdFilter) return requests;
    return requests.filter((r) => r.equipmentId === equipmentIdFilter);
  }, [equipmentIdFilter, requests]);

  const cards = useMemo(() => {
    return visibleRequests
      .map((r) => {
        const eq = getEquipmentById(r.equipmentId);
        return {
          id: r.id,
          subject: r.subject,
          equipment: eq?.name ?? "Equipment",
          technician: r.assignedTechnician,
          technicianInitial: (r.assignedTechnician || "?").slice(0, 1).toUpperCase(),
          scheduledDate: r.scheduledDate,
          isOverdue: isRequestOverdue(r),
          status: r.status,
        };
      })
      .sort((a, b) => (a.isOverdue === b.isOverdue ? 0 : a.isOverdue ? -1 : 1));
  }, [getEquipmentById, isRequestOverdue, visibleRequests]);

  const getCardsByStatus = (status: MaintenanceRequestStatus) => {
    return cards.filter((r) => r.status === status);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Maintenance Requests
            </h1>
            <p className="mt-1 text-muted-foreground">
              Manage and track maintenance work across your equipment
            </p>
          </div>
          <Button className="gap-2" onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4" />
            New Request
          </Button>
        </div>

        <CreateMaintenanceRequestDialog
          open={createOpen}
          onOpenChange={setCreateOpen}
          defaultEquipmentId={equipmentIdFilter}
        />

        {/* Kanban Board */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
          <KanbanColumn
            title="New"
            status="new"
            cards={getCardsByStatus("new")}
            cardCount={getCardsByStatus("new").length}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onCardDragStart={handleDragStart}
            onCardOpen={(id) => navigate(`/maintenance/${id}`)}
          />

          <KanbanColumn
            title="In Progress"
            status="in-progress"
            cards={getCardsByStatus("in-progress")}
            cardCount={getCardsByStatus("in-progress").length}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onCardDragStart={handleDragStart}
            onCardOpen={(id) => navigate(`/maintenance/${id}`)}
          />

          <KanbanColumn
            title="Repaired"
            status="repaired"
            cards={getCardsByStatus("repaired")}
            cardCount={getCardsByStatus("repaired").length}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onCardDragStart={handleDragStart}
            onCardOpen={(id) => navigate(`/maintenance/${id}`)}
          />

          <KanbanColumn
            title="Scrap"
            status="scrap"
            cards={getCardsByStatus("scrap")}
            cardCount={getCardsByStatus("scrap").length}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onCardDragStart={handleDragStart}
            onCardOpen={(id) => navigate(`/maintenance/${id}`)}
          />
        </div>
      </div>
    </MainLayout>
  );
}
