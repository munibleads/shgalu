import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingDown } from "lucide-react"

export function NegativeFeedbackTrend() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Negative Feedback Trend
        </CardTitle>
        <TrendingDown className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <p className="text-4xl font-bold text-emerald-500">-5.2%</p>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Decrease in negative mentions vs. last month
        </p>
      </CardContent>
    </Card>
  )
}
