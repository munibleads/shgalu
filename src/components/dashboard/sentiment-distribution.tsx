"use client"

import { Bar, BarChart, CartesianGrid, Cell, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useTranslations } from "next-intl"

const rawChartData = [
  { sentiment: "Positive", value: 650, fill: "var(--color-Positive)" },
  { sentiment: "Neutral", value: 200, fill: "var(--color-Neutral)" },
  { sentiment: "Negative", value: 150, fill: "var(--color-Negative)" },
]

export function SentimentDistribution() {
  const t = useTranslations("SentimentDistribution")

  const chartData = rawChartData.map((item) => ({
    ...item,
    sentiment: t(item.sentiment.toLowerCase()),
  }))

  const chartConfig = {
    value: {
      label: t("count"),
    },
    Positive: {
      label: t("positive"),
      color: "var(--positive)",
    },
    Neutral: {
      label: t("neutral"),
      color: "var(--neutral)",
    },
    Negative: {
      label: t("negative"),
      color: "var(--negative)",
    },
  } satisfies ChartConfig

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-[4/3] max-h-[300px]"
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="sentiment"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="sentiment" />}
            />
            <Bar dataKey="value" radius={8}>
              {chartData.map((entry) => (
                <Cell key={entry.sentiment} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
