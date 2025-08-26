import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Smile, Star } from "lucide-react"

export function OverallSentimentScore() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Overall Sentiment
        </CardTitle>
        <Smile className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <p className="text-4xl font-bold">4.2</p>
          <div className="flex text-yellow-400">
            <Star className="h-5 w-5 fill-current" />
            <Star className="h-5 w-5 fill-current" />
            <Star className="h-5 w-5 fill-current" />
            <Star className="h-5 w-5 fill-current" />
            <Star className="h-5 w-5 stroke-yellow-400 stroke-1" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Based on 12,345 reviews and mentions
        </p>
      </CardContent>
    </Card>
  )
}
