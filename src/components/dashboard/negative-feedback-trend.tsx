"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingDown } from "lucide-react"
import { useTranslations } from "next-intl"

export function NegativeFeedbackTrend() {
  const t = useTranslations("NegativeFeedbackTrend")

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{t("title")}</CardTitle>
        <TrendingDown className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <p className="text-4xl font-bold text-emerald-500">-5.2%</p>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {t("description")}
        </p>
      </CardContent>
    </Card>
  )
}
