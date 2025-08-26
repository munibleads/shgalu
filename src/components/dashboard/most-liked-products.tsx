"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useTranslations } from "next-intl"

const likedProducts = [
  {
    name: "Stellar HD Drone",
    positiveMentions: 152,
    rating: 4.9,
  },
  {
    name: "Apex Gaming Laptop",
    positiveMentions: 138,
    rating: 4.8,
  },
  {
    name: "Zenith Smartwatch",
    positiveMentions: 120,
    rating: 4.8,
  },
  {
    name: "Orion VR Headset",
    positiveMentions: 115,
    rating: 4.7,
  },
  {
    name: "Eclipse Headphones",
    positiveMentions: 105,
    rating: 4.7,
  },
]

export function MostLikedProducts() {
  const t = useTranslations("MostLikedProducts")

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("product")}</TableHead>
              <TableHead className="text-right">{t("positiveMentions")}</TableHead>
              <TableHead className="text-right">{t("avgRating")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {likedProducts.map((product) => (
              <TableRow key={product.name}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="text-right">
                  {product.positiveMentions}
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline" className="text-emerald-500 border-emerald-500">
                    {product.rating.toFixed(1)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
