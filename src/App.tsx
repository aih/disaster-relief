
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StaffDashboard from "./pages/StaffDashboard";
import SurvivorApplication from "./pages/SurvivorApplication";
import ApplicationStatus from "./pages/ApplicationStatus";
import DisasterManagement from "./pages/DisasterManagement";
import PolicyReview from "./pages/PolicyReview";
import PolicyEdit from "./pages/PolicyEdit";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/staff-dashboard" element={<StaffDashboard />} />
          <Route path="/apply" element={<SurvivorApplication />} />
          <Route path="/application-status" element={<ApplicationStatus />} />
          <Route path="/disaster-management/:id" element={<DisasterManagement />} />
          <Route path="/policy-review/:policyId" element={<PolicyReview />} />
          <Route path="/policy-edit/:policyId" element={<PolicyEdit />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
