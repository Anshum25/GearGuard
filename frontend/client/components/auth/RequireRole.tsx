import { Navigate } from "react-router-dom";
import { useAuth, type UserRole } from "@/contexts/AuthContext";

export function RequireRole({
    role,
    children,
}: {
    role: UserRole | UserRole[];
    children: React.ReactNode;
}) {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" replace />;

    const allowed = Array.isArray(role) ? role.includes(user.role) : user.role === role;

    if (!allowed) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}
