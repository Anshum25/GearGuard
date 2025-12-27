import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import LandingPro from "./LandingPro";

export default function HomeRedirect() {
    const { user } = useAuth();

    if (!user) return <LandingPro />;

    if (user.role === "technician") return <Navigate to="/maintenance" replace />;

    return <Navigate to="/dashboard" replace />;
}
