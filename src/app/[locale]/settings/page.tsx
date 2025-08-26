import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Plus, ExternalLink, Settings as SettingsIcon, Star, ShoppingBag, Truck } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"
import { LucideProps } from "lucide-react"

// Define a common interface for both types of integrations
interface IntegrationType {
  id: number;
  name: string;
  description: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  status: "connected" | "available";
  lastSync?: string; // Optional for available integrations
  ordersCount?: number; // Optional for available integrations
  reviewsCount?: number; // Optional for available integrations
}

// Mock data for integrations
const connectedIntegrations: IntegrationType[] = [
  {
    id: 1,
    name: "Amazon",
    description: "Sync products and orders from Amazon marketplace",
    icon: ShoppingBag,
    status: "connected",
    lastSync: "2 hours ago",
    ordersCount: 1247,
  },
  {
    id: 2,
    name: "Noon",
    description: "Middle East's leading online marketplace",
    icon: ShoppingBag,
    status: "connected",
    lastSync: "1 hour ago",
    ordersCount: 892,
  },
  {
    id: 3,
    name: "Salla",
    description: "Saudi Arabia's #1 eCommerce platform",
    icon: Truck,
    status: "connected",
    lastSync: "30 minutes ago",
    ordersCount: 456,
  },
  {
    id: 4,
    name: "Google Reviews",
    description: "Monitor and respond to customer reviews",
    icon: Star,
    status: "connected",
    lastSync: "15 minutes ago",
    reviewsCount: 2341,
  },
]

const availableIntegrations: IntegrationType[] = [
  {
    id: 5,
    name: "Shopify",
    description: "Connect your Shopify store",
    icon: ShoppingBag,
    status: "available",
  },
  {
    id: 6,
    name: "WooCommerce",
    description: "WordPress eCommerce solution",
    icon: ShoppingBag,
    status: "available",
  },
  {
    id: 7,
    name: "Magento",
    description: "Enterprise eCommerce platform",
    icon: ShoppingBag,
    status: "available",
  },
  {
    id: 8,
    name: "Trustpilot",
    description: "Customer review management",
    icon: Star,
    status: "available",
  },
]

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Settings</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-6 p-4 pt-0">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold md:text-2xl">Integrations</h1>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Integration
            </Button>
          </div>

          {/* All Integrations */}
          <div className="grid gap-4 grid-cols-4 grid-rows-2">
            {[...connectedIntegrations, ...availableIntegrations].map((integration) => {
              const IconComponent = integration.icon
              const isConnected = integration.status === "connected"
              return (
                <Card key={integration.id} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isConnected ? 'bg-green-100' : 'bg-gray-100'}`}>
                          <IconComponent className={`h-5 w-5 ${isConnected ? 'text-green-600' : 'text-gray-600'}`} />
                        </div>
                        <div>
                          <CardTitle className="text-base">{integration.name}</CardTitle>
                          <Badge 
                            variant={isConnected ? "secondary" : "outline"} 
                            className={`text-xs mt-1 ${isConnected ? 'bg-green-100 text-green-700' : ''}`}
                          >
                            {isConnected ? "Connected" : "Available"}
                          </Badge>
                        </div>
                      </div>
                      {isConnected && (
                        <Button variant="ghost" size="sm">
                          <SettingsIcon className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="mb-3">
                      {integration.description}
                    </CardDescription>
                    {isConnected && (
                      <div className="space-y-2 text-sm mb-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Last sync:</span>
                          <span>{integration.lastSync}</span>
                        </div>
                        {integration.ordersCount && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Orders:</span>
                            <span>{integration.ordersCount.toLocaleString()}</span>
                          </div>
                        )}
                        {integration.reviewsCount && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Reviews:</span>
                            <span>{integration.reviewsCount.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    )}
                    {isConnected ? (
                      <Button variant="outline" size="sm" className="w-full gap-2">
                        <ExternalLink className="h-3 w-3" />
                        View Details
                      </Button>
                    ) : (
                      <Button className="w-full gap-2">
                        <Plus className="h-3 w-3" />
                        Connect
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
