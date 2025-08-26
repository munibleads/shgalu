"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquareText } from "lucide-react"
import { useTranslations } from "next-intl"

export function TotalReviews() {
  const t = useTranslations("TotalReviews")

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{t("title")}</CardTitle>
        <MessageSquareText className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold">12,345</p>
        <p className="text-xs text-muted-foreground mt-1">
          {t("description")}
        </p>
      </CardContent>
    </Card>
  )
}
