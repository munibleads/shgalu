"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  IconBrandAmazon,
  IconBrandInstagram,
  IconBrandSnapchat,
  IconBrandX,
  IconBrandYoutube,
} from "@tabler/icons-react"
import { Flame } from "lucide-react"
import { useTranslations } from "next-intl"

const rawInsights = [
  {
    icon: <IconBrandSnapchat className="size-5" />,
    textKey: "insight1",
  },
  {
    icon: <IconBrandAmazon className="size-5" />,
    textKey: "insight2",
  },
  {
    icon: <IconBrandInstagram className="size-5" />,
    textKey: "insight3",
  },
]

const sources = [
  {
    name: "Amazon",
    icon: <IconBrandAmazon className="size-4" />,
    className:
      "border-orange-200 bg-orange-100 text-orange-800 dark:border-orange-800 dark:bg-orange-900/50 dark:text-orange-300",
  },
  {
    name: "Noon",
    icon: <Flame className="size-4" />,
    className:
      "border-yellow-200 bg-yellow-100 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
  },
  {
    name: "Salla",
    icon: <Flame className="size-4" />,
    className:
      "border-purple-200 bg-purple-100 text-purple-800 dark:border-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
  },
  {
    name: "Snapchat",
    icon: <IconBrandSnapchat className="size-4" />,
    className:
      "border-yellow-200 bg-yellow-100 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
  },
  {
    name: "Instagram",
    icon: <IconBrandInstagram className="size-4" />,
    className:
      "border-pink-200 bg-pink-100 text-pink-800 dark:border-pink-800 dark:bg-pink-900/50 dark:text-pink-300",
  },
  {
    name: "YouTube",
    icon: <IconBrandYoutube className="size-4" />,
    className:
      "border-red-200 bg-red-100 text-red-800 dark:border-red-800 dark:bg-red-900/50 dark:text-red-300",
  },
  {
    name: "X.com",
    icon: <IconBrandX className="size-4" />,
    className:
      "border-zinc-300 bg-zinc-200 text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-300",
  },
]

export function AiAnalysis() {
  const t = useTranslations("AiAnalysis")

  const insights = rawInsights.map((insight) => ({
    ...insight,
    text: t(insight.textKey),
  }))

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <p className="mb-4 text-sm text-muted-foreground">
            {t("overallSentiment")}
          </p>
          <div className="flex flex-wrap gap-2">
            {sources.map((source) => (
              <Badge
                key={source.name}
                variant="outline"
                className={cn("flex items-center gap-1.5", source.className)}
              >
                {source.icon}
                <span>{source.name}</span>
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold">{t("topInsights")}</h4>
          <ul className="space-y-4">
            {insights.map((insight, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-muted">
                  {insight.icon}
                </div>
                <span className="flex-1 text-sm text-muted-foreground">
                  {insight.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
