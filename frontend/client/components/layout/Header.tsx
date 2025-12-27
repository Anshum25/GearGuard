import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-white font-bold">
              G
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                GearGuard
              </h1>
              <p className="text-xs text-muted-foreground">
                Maintenance Tracker
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 text-sm">
            <div className="flex flex-col items-end">
              <p className="font-medium text-foreground">Admin User</p>
              <p className="text-xs text-muted-foreground">
                Maintenance Manager
              </p>
            </div>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-purple-700 flex items-center justify-center text-white text-sm font-semibold">
              A
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
