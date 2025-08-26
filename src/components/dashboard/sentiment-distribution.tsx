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

const chartData = [
  { sentiment: "Positive", value: 650, fill: "var(--color-Positive)" },
  { sentiment: "Neutral", value: 200, fill: "var(--color-Neutral)" },
  { sentiment: "Negative", value: 150, fill: "var(--color-Negative)" },
]

const chartConfig = {
  value: {
    label: "Count",
  },
  Positive: {
    label: "Positive",
    color: "var(--positive)",
  },
  Neutral: {
    label: "Neutral",
    color: "var(--neutral)",
  },
  Negative: {
    label: "Negative",
    color: "var(--negative)",
  },
} satisfies ChartConfig

export function SentimentDistribution() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Sentiment Distribution</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
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
