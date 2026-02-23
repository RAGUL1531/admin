import { LayoutDashboard, Users, Stethoscope, CalendarCheck, MessageCircle, Brain, Heart, Video } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Patients", url: "/patients", icon: Users },
  { title: "Doctors", url: "/doctors", icon: Stethoscope },
  { title: "Consultations", url: "/consultations", icon: CalendarCheck },
];

const toolItems = [
  { title: "Chat Console", url: "/chat", icon: MessageCircle },
  { title: "Doctor Chat", url: "/doctor-chat", icon: Video },
  { title: "AI Assistance", url: "/ai", icon: Brain },
];

export function AppSidebar() {
  const sidebar = useSidebar();
  const collapsed = sidebar?.state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar className="border-r-0" style={{ background: "var(--gradient-sidebar)" }}>
      <div className="p-4 flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg gradient-accent flex items-center justify-center shrink-0">
          <Heart className="h-5 w-5 text-accent-foreground" />
        </div>
        {!collapsed && (
          <div>
            <p className="font-bold font-heading text-sm text-sidebar-primary-foreground">HealthSync</p>
            <p className="text-[10px] text-sidebar-foreground/60">Smart Healthcare System</p>
          </div>
        )}
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/40 text-[10px] uppercase tracking-widest">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors rounded-lg"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/40 text-[10px] uppercase tracking-widest">
            Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors rounded-lg"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Bottom section */}
      {!collapsed && (
        <div className="p-4 mt-auto">
          <div className="rounded-lg bg-sidebar-accent/50 p-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-7 w-7 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">RA</div>
              <div>
                <p className="text-xs font-medium text-sidebar-accent-foreground">Dr. Admin</p>
                <p className="text-[10px] text-sidebar-foreground/50">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Sidebar>
  );
}
