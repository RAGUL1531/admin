import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Dashboard from "./pages/Dashboard";
import PatientManagement from "./pages/PatientManagement";
import DoctorManagement from "./pages/DoctorManagement";
import ConsultationMonitoring from "./pages/ConsultationMonitoring";
import ChatInterface from "./pages/ChatInterface";
import AIAssistance from "./pages/AIAssistance";
import NotFound from "./pages/NotFound";
import DoctorChat from "./pages/DoctorChat";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <main className="flex-1 flex flex-col min-w-0">
              <header className="h-14 flex items-center border-b bg-card/80 backdrop-blur-sm px-4 sticky top-0 z-10">
                <SidebarTrigger />
                <div className="ml-auto flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Smart Healthcare System</span>
                </div>
              </header>
              <div className="flex-1 p-4 md:p-6 lg:p-8">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/patients" element={<PatientManagement />} />
                  <Route path="/doctors" element={<DoctorManagement />} />
                  <Route path="/consultations" element={<ConsultationMonitoring />} />
                  <Route path="/chat" element={<ChatInterface />} />
                  <Route path="/ai" element={<AIAssistance />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="/doctor-chat" element={<DoctorChat />} />            
                </Routes>
              </div>
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
