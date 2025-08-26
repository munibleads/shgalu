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

const dislikedProducts = [
  {
    name: "QuantumCore Processor",
    negativeMentions: 98,
    rating: 2.1,
  },
  {
    name: "NovaGlow Smartphone",
    negativeMentions: 72,
    rating: 2.5,
  },
  {
    name: "EchoSphere Smart Speaker",
    negativeMentions: 65,
    rating: 2.8,
  },
  {
    name: "Vortex Gaming Mouse",
    negativeMentions: 51,
    rating: 3.1,
  },
  {
    name: "Aura Mechanical Keyboard",
    negativeMentions: 45,
    rating: 3.2,
  },
]

export function MostDislikedProducts() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Most Disliked Products</CardTitle>
        <CardDescription>
          Products with the highest negative feedback.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Neg. Mentions</TableHead>
              <TableHead className="text-right">Avg. Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dislikedProducts.map((product) => (
              <TableRow key={product.name}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="text-right">
                  {product.negativeMentions}
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant="destructive">{product.rating.toFixed(1)}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
