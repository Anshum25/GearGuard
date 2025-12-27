import { ReactNode } from "react";
import { Header } from "./Header";

interface PublicLayoutProps {
    children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <div className="min-h-screen bg-background">
            <Header onToggleSidebar={() => { }} />
            <main className="flex-1 overflow-auto">{children}</main>
        </div>
    );
}
