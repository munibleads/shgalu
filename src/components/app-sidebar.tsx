"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  FileText,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  Map,
  Package,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useSidebar } from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Jadathon",
      logo: GalleryVerticalEnd,
      plan: "Hackathon",
    },
    {
      name: "Jadathon",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Jadathon",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/en",
      icon: LayoutDashboard,
    },
    {
      title: "AI Analyzer",
      url: "/en/ai-analyzer",
      icon: Bot,
    },
    {
      title: "Products",
      url: "/en/products",
      icon: Package,
    },
    {
      title: "Reports",
      url: "/en/reports",
      icon: FileText,
    },
    {
      title: "Settings",
      url: "/en/settings",
      icon: Settings2,
    },
  ],
  projects: [],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="h-18 w-full flex flex-row items-center justify-start p-0 pl-4">
        {!isCollapsed && <img src="/shagalu_logo.png" alt="Shagalu Logo" className="h-14 w-auto" />}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
