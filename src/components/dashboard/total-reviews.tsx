import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquareText } from "lucide-react"

export function TotalReviews() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Reviews & Mentions
        </CardTitle>
        <MessageSquareText className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold">12,345</p>
        <p className="text-xs text-muted-foreground mt-1">
          Analyzed across all platforms
        </p>
      </CardContent>
    </Card>
  )
}
