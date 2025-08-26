"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Smile, Star } from "lucide-react"
import { useTranslations } from "next-intl"

export function OverallSentimentScore() {
  const t = useTranslations("OverallSentimentScore")

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{t("title")}</CardTitle>
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
          {t("description")}
        </p>
      </CardContent>
    </Card>
  )
}
