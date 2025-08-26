"use client"

import * as React from "react"
import Image from "next/image"
import {
  AudioWaveform,
  Bot,
  Command,
  FileText,
  GalleryVerticalEnd,
  Languages,
  LayoutDashboard,
  Package,
  Settings2,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useSidebar } from "@/components/ui/sidebar"
import { LanguageSwitcher } from "./language-switcher"
import { useLocale, useTranslations } from "next-intl"

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
  const locale = useLocale()
  const t = useTranslations("Nav")

  const navMain = [
    {
      title: t("dashboard"),
      url: `/${locale}`,
      icon: LayoutDashboard,
    },
    {
      title: t("aiAnalyzer"),
      url: `/${locale}/ai-analyzer`,
      icon: Bot,
    },
    {
      title: t("products"),
      url: `/${locale}/products`,
      icon: Package,
    },
    {
      title: t("reports"),
      url: `/${locale}/reports`,
      icon: FileText,
    },
    {
      title: t("settings"),
      url: `/${locale}/settings`,
      icon: Settings2,
    },
    {
      title: t("language"),
      icon: Languages,
      customComponent: <LanguageSwitcher />,
    },
  ]

  return (
    <Sidebar side="right" collapsible="icon" {...props}>
      <SidebarHeader className="h-18 w-full flex flex-row items-center justify-start p-0 pl-4">
        {!isCollapsed && <Image src="/shagalu_logo.png" alt="Shagalu Logo" width={100} height={56} className="h-14 w-auto" />}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter className="flex-row items-center">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
