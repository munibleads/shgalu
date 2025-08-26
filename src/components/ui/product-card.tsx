import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface ProductData {
  asin: string;
  product_title: string;
  product_price: string;
  currency: string;
  country: string;
  product_byline: string;
  product_star_rating: number | null;
  product_num_ratings: number;
  product_url: string;
  product_photo: string;
  product_availability: string;
  category: {
    id: string;
    name: string;
    link: string;
  };
}

interface ProductCardProps {
  product: ProductData;
}

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations("ProductCard");
  const truncateWords = (text: string, maxWords: number = 10) => {
    const words = text.split(' ');
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
  };

  const getStarRating = (rating: number | null) => {
    const stars = [];
    const fullStars = rating ? Math.floor(rating) : 0;
    const hasHalfStar = rating ? rating % 1 >= 0.5 : false;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        // This is a simplification; a true half-star would require a different icon or masking
        stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400 opacity-50" />);
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow flex flex-col">
      <CardHeader className="flex-grow">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <CardTitle className="text-lg">{truncateWords(product.product_title, 8)}</CardTitle>
            {product.product_byline && (
              <CardDescription>{product.product_byline.replace('العلامة التجارية: ', `${t('by')}: `)}</CardDescription>
            )}
          </div>
          {product.category?.name && (
            <Badge variant="secondary">{product.category.name}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-6 flex-grow">
        {product.product_photo && (
          <div className="relative w-full h-48 mb-4">
            <Image
              src={product.product_photo}
              alt={product.product_title}
              layout="fill"
              objectFit="contain"
              className="rounded-md"
            />
          </div>
        )}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            {getStarRating(product.product_star_rating)}
          </div>
          {product.product_num_ratings > 0 && (
            <span className="text-sm text-muted-foreground">
              {product.product_star_rating?.toFixed(1) || 'N/A'} ({product.product_num_ratings} {t('reviews')})
            </span>
          )}
        </div>
        <p className="text-2xl font-bold text-primary">
          {product.product_price} {product.currency}
        </p>
        {product.product_availability && (
          <p className="text-sm text-muted-foreground mt-2">{product.product_availability}</p>
        )}
      </CardContent>
      <CardFooter>
        {product.product_url && (
          <Button variant="outline" className="w-full" asChild>
            <a href={product.product_url} target="_blank" rel="noopener noreferrer">
              {t('viewDetails')}
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
