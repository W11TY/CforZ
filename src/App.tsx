import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Entry from "./pages/Entry";
import Dashboard from "./pages/Dashboard";
import OpportunityEngine from "./pages/OpportunityEngine";
import ProjectWorkspace from "./pages/ProjectWorkspace";
import ExecutionFeed from "./pages/ExecutionFeed";
import Profile from "./pages/Profile";
import AppLayout from "./components/AppLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Entry />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/opportunity" element={<OpportunityEngine />} />
          <Route path="/project/:id" element={<ProjectWorkspace />} />
          <Route path="/feed" element={<ExecutionFeed />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
