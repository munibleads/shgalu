import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { MostDislikedProducts } from "@/components/dashboard/most-disliked-products"
import { MostLikedProducts } from "@/components/dashboard/most-liked-products"
import { NegativeFeedbackTrend } from "@/components/dashboard/negative-feedback-trend"
import { OverallSentimentScore } from "@/components/dashboard/overall-sentiment-score"
import { SentimentDistribution } from "@/components/dashboard/sentiment-distribution"
import { TotalReviews } from "@/components/dashboard/total-reviews"
import { AiAnalysis } from "@/components/dashboard/ai-analysis"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Home() {
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
                  <BreadcrumbPage>Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <OverallSentimentScore />
            <TotalReviews />
            <NegativeFeedbackTrend />
            <Card className="group hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Brain className="h-5 w-5 text-primary" />
                  AI Product Analyzer
                </CardTitle>
                <CardDescription className="text-sm">
                  Analyze reviews of your products using advanced AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="en/ai-analyzer">
                  <Button className="w-full group-hover:shadow-md transition-all duration-200" size="sm">
                    Analyze Now
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <SentimentDistribution />
            </div>
            <div className="lg:col-span-2">
              <AiAnalysis />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <MostDislikedProducts />
            <MostLikedProducts />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
