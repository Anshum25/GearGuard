import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { RequireRole } from "@/components/auth/RequireRole";
import { GearGuardProvider } from "@/contexts/GearGuardContext";
import { PublicLayout } from "@/components/layout/PublicLayout";
import HomeRedirect from "./pages/HomeRedirect";
import AuthLanding from "./pages/AuthLanding";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Maintenance from "./pages/Maintenance";
import MaintenanceRequestDetail from "./pages/MaintenanceRequestDetail";
import Equipment from "./pages/Equipment";
import EquipmentDetail from "./pages/EquipmentDetail";
import Calendar from "./pages/Calendar";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <GearGuardProvider>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
              <Route
                path="/auth"
                element={
                  <PublicLayout>
                    <Signup />
                  </PublicLayout>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicLayout>
                    <Login />
                  </PublicLayout>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicLayout>
                    <Signup />
                  </PublicLayout>
                }
              />

              <Route
                path="/"
                element={<HomeRedirect />}
              />

              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <RequireRole role="manager">
                      <Dashboard />
                    </RequireRole>
                  </RequireAuth>
                }
              />

              <Route
                path="/equipment"
                element={
                  <RequireAuth>
                    <RequireRole role="manager">
                      <Equipment />
                    </RequireRole>
                  </RequireAuth>
                }
              />
              <Route
                path="/equipment/:equipmentId"
                element={
                  <RequireAuth>
                    <RequireRole role="manager">
                      <EquipmentDetail />
                    </RequireRole>
                  </RequireAuth>
                }
              />

              <Route
                path="/reports"
                element={
                  <RequireAuth>
                    <RequireRole role="manager">
                      <Reports />
                    </RequireRole>
                  </RequireAuth>
                }
              />

              <Route
                path="/maintenance"
                element={
                  <RequireAuth>
                    <RequireRole role={["manager", "technician"]}>
                      <Maintenance />
                    </RequireRole>
                  </RequireAuth>
                }
              />
              <Route
                path="/maintenance/:requestId"
                element={
                  <RequireAuth>
                    <RequireRole role={["manager", "technician"]}>
                      <MaintenanceRequestDetail />
                    </RequireRole>
                  </RequireAuth>
                }
              />

              <Route
                path="/calendar"
                element={
                  <RequireAuth>
                    <RequireRole role={["manager", "technician"]}>
                      <Calendar />
                    </RequireRole>
                  </RequireAuth>
                }
              />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route
                path="*"
                element={
                  <RequireAuth>
                    <NotFound />
                  </RequireAuth>
                }
              />
            </Routes>
          </BrowserRouter>
        </GearGuardProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
