import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Wrench,
  Calendar,
  BarChart3,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  open?: boolean;
}

export function Sidebar({ open = true }: SidebarProps) {
  const location = useLocation();
  const { user } = useAuth();

  if (!user) return null;

  const navItems =
    user.role === "technician"
      ? [
        {
          label: "Maintenance Requests",
          href: "/maintenance",
          icon: Wrench,
        },
        {
          label: "Calendar",
          href: "/calendar",
          icon: Calendar,
        },
      ]
      : [
        {
          label: "Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          label: "Equipment",
          href: "/equipment",
          icon: Package,
        },
        {
          label: "Maintenance Requests",
          href: "/maintenance",
          icon: Wrench,
        },
        {
          label: "Calendar",
          href: "/calendar",
          icon: Calendar,
        },
        {
          label: "Reports",
          href: "/reports",
          icon: BarChart3,
        },
      ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] border-r border-border bg-white transition-all duration-300 lg:relative lg:top-0 lg:z-0 lg:h-screen",
        open ? "w-64" : "-translate-x-full lg:translate-x-0 lg:w-64",
      )}
    >
      <nav className="flex flex-col gap-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center justify-between gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-secondary text-muted-foreground hover:text-foreground",
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </div>
              {isActive && <ChevronRight className="h-4 w-4" />}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
