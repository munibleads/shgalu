"use client"

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Package, Users, MessageSquare } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface Review {
  author: string
  author_avatar_url: string
  author_profile_url: string
  body: string
  comments_count: number
  date: string
  helpful_count: number
  image_urls: string[]
  product_variation: Record<string, unknown> | null
  rating: string
  review_id: string
  review_url: string
  title: string
  verified_purchase: boolean
  video_urls: string[]
}

interface ReviewsResponse {
  data?: {
    current_page: number
    reviews: Review[]
    total_pages: number
    total_reviews: number
    with_reviews: number
  }
  success?: boolean
  // Allow for different API response structures
  reviews?: Review[]
  total_reviews?: number
  with_reviews?: number
  total_pages?: number
  current_page?: number
  [key: string]: unknown
}

interface ProductData {
  asin: string
  availability: {
    message: string | null
    type: string
  }
  country: string
  currency: string
  description: string
  price: string
  product_details: string[]
  product_images: string[]
  product_info: string[]
  product_reviews: {
    count: number
    rating: number
  }
  product_variations?: {
    color?: Array<{
      asin: string
      color: string
    }>
    size?: Array<{
      asin: string
      size: string
    }>
  }
  product_videos?: Array<{
    previewUrl: string
    title: string
    vendorName: string
  }>
  quantity: {
    max: number
    min: number
  }
  title: string
  url: string[]
  top_reviews?: Review[]
}

export default function Page() {
  const [input, setInput] = useState("")
  const [productData, setProductData] = useState<ProductData | null>(null)
  const [reviewsData, setReviewsData] = useState<ReviewsResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const extractASIN = (input: string): string | null => {
    // Remove whitespace
    const cleanInput = input.trim()
    
    // If it's already an ASIN (10 characters, alphanumeric)
    if (/^[A-Z0-9]{10}$/.test(cleanInput)) {
      return cleanInput
    }

    // Extract ASIN from Amazon URLs
    const asinPatterns = [
      // Standard product URL: /dp/ASIN or /product/ASIN
      /\/(?:dp|product)\/([A-Z0-9]{10})/,
      // ASIN in URL parameters
      /[?&]asin=([A-Z0-9]{10})/,
      // Amazon short URLs
      /\/([A-Z0-9]{10})(?:\/|$|\?)/,
      // URL with /gp/product/
      /\/gp\/product\/([A-Z0-9]{10})/
    ]

    for (const pattern of asinPatterns) {
      const match = cleanInput.match(pattern)
      if (match) {
        return match[1]
      }
    }

    return null
  }

  const fetchProductData = async () => {
    if (!input.trim()) {
      setError("Please enter a valid Amazon URL or ASIN")
      return
    }

    const asin = extractASIN(input)
    if (!asin) {
      setError("Could not extract ASIN from the provided input. Please enter a valid Amazon product URL or ASIN.")
      return
    }

    setProductData(null)
    setReviewsData(null)
    setLoading(true)
    setError("")

    try {
      // Fetch product data and reviews in parallel
      const productUrl = `https://amazon-online-data-api.p.rapidapi.com/product?asins=${asin}&geo=SA`
      const reviewsUrl = `https://amazon-online-data-api.p.rapidapi.com/v2/product-reviews?geo=SA&page=1&asin=${asin}&filter_by_star=&media_reviews_only=false`
      
      const options: RequestInit = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '9c9f9b38f2mshe8fa596f7ed7869p132df3jsne351352225aa',
          'x-rapidapi-host': 'amazon-online-data-api.p.rapidapi.com'
        }
      }

      console.log('Fetching product data and reviews for ASIN:', asin)
      
      const [productResponse, reviewsResponse] = await Promise.all([
        fetch(productUrl, options),
        fetch(reviewsUrl, options)
      ])
      
      if (!productResponse.ok) {
        throw new Error(`Product API error! status: ${productResponse.status}`)
      }
      
      if (!reviewsResponse.ok) {
        throw new Error(`Reviews API error! status: ${reviewsResponse.status}`)
      }
      
      const productResult = await productResponse.json()
      const reviewsResult = await reviewsResponse.json()
      
      console.log('Product API Response:', productResult)
      console.log('Reviews API Response:', reviewsResult)

      
      if (productResult.results && productResult.results.length > 0) {
        setProductData(productResult.results[0])
      } else {
        console.error('Product API Error:', productResult)
        setError(`Failed to fetch product data: No results found`)
        return
      }

      // Debug the reviews response structure
      console.log('Reviews API full response:', JSON.stringify(reviewsResult, null, 2))
      
      if (reviewsResult && (reviewsResult.success || reviewsResult.data || reviewsResult.reviews)) {
        setReviewsData(reviewsResult)
      } else {
        console.error('Reviews API Error - unexpected format:', reviewsResult)
        // Don't return error for reviews, as product data is still valuable
      }

      setInput("")
    } catch (err) {
      setError("Error fetching data: " + String(err))
    } finally {
      setLoading(false)
    }
  }

  const renderStars = (rating: string) => {
    const numRating = parseFloat(rating)
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= numRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-muted-foreground">({rating})</span>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>AI Analyzer</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-10">

          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Product Analysis
              </CardTitle>
              <CardDescription>
                Enter an Amazon product URL or ASIN to analyze product reviews and details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter Amazon URL or ASIN (e.g., https://amazon.com/dp/B07ZPKBL9V)"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && fetchProductData()}
                />
                <Button onClick={fetchProductData} disabled={loading}>
                  {loading ? "Analyzing..." : "Analyze"}
                </Button>
              </div>
              {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
            </CardContent>
          </Card>



          {/* Results Section */}
          {productData && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Product Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Product Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Image
                      src={productData.product_images[0]}
                      alt={productData.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-contain rounded-lg"
                    />
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">{productData.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">{productData.currency} {productData.price}</span>
                      </div>
                      <Badge variant="secondary">{productData.availability.message || productData.availability.type}</Badge>
                      <div className="space-y-2">
                        {renderStars(productData.product_reviews.rating.toString())}
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span className="text-sm">{productData.product_reviews.count ? productData.product_reviews.count.toLocaleString() : '0'} reviews</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Customer Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-primary">{productData.product_reviews.rating.toFixed(1)}</div>
                        <div className="text-sm text-muted-foreground">Average Rating</div>
                        <div className="mt-1">{renderStars(productData.product_reviews.rating.toString())}</div>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-primary">{productData.product_reviews.count.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Total Reviews</div>
                      </div>
                    </div>

                    {reviewsData && (
                      <div>
                        <h4 className="font-semibold mb-2">Reviews Summary:</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex justify-between">
                            <span>Total Reviews:</span>
                            <span className="font-medium">{(reviewsData.data?.total_reviews || reviewsData.total_reviews || 0).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>With Reviews:</span>
                            <span className="font-medium">{(reviewsData.data?.with_reviews || reviewsData.with_reviews || 0).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Pages:</span>
                            <span className="font-medium">{reviewsData.data?.total_pages || reviewsData.total_pages || 0}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {productData.availability && (
                      <div>
                        <h4 className="font-semibold mb-2">Availability:</h4>
                        <Badge variant={productData.availability.type === 'IN_STOCK' ? 'default' : 'secondary'}>
                          {productData.availability.message || productData.availability.type}
                        </Badge>
                      </div>
                    )}

                    {productData.product_variations && (
                      <div>
                        <h4 className="font-semibold mb-2">Product Variations:</h4>
                        <div className="space-y-2">
                          {productData.product_variations.color && (
                            <div className="flex flex-wrap gap-1">
                              <span className="text-sm font-medium">Colors:</span>
                              <div className="flex flex-wrap gap-1">
                                {productData.product_variations.color.slice(0, 5).map((color, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {color.color}
                                  </Badge>
                                ))}
                                {productData.product_variations.color.length > 5 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{productData.product_variations.color.length - 5} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}
                          {productData.product_variations.size && (
                            <div className="flex flex-wrap gap-1">
                              <span className="text-sm font-medium">Sizes:</span>
                              <div className="flex flex-wrap gap-1">
                                {productData.product_variations.size.slice(0, 5).map((size, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {size.size}
                                  </Badge>
                                ))}
                                {productData.product_variations.size.length > 5 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{productData.product_variations.size.length - 5} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Top Reviews */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Top Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {reviewsData && (reviewsData.data?.reviews || reviewsData.reviews) && (reviewsData.data?.reviews || reviewsData.reviews)!.length > 0 ? (
                      <div className="space-y-4">
                        {(reviewsData.data?.reviews || reviewsData.reviews)!.slice(0, 10).map((review) => (
                          <div key={review.review_id} className="border-b pb-4 last:border-b-0">
                            <div className="flex items-start gap-3">                              
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center justify-between">
                                  <h5 className="font-medium text-sm">{review.author}</h5>
                                  {review.verified_purchase && (
                                    <Badge variant="outline" className="text-xs">Verified</Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  {renderStars(review.rating.split(' ')[0])}
                                  <span className="text-xs text-muted-foreground">{review.date}</span>
                                </div>
                                <h6 className="font-medium text-sm">{review.title.replace(/^\d+\.\d+\s+out\s+of\s+\d+\s+stars/, '').trim()}</h6>
                                <p className="text-sm text-muted-foreground line-clamp-3">{review.body}</p>
                                {review.helpful_count > 0 && (
                                  <div className="text-xs text-muted-foreground">
                                    {review.helpful_count} people found this helpful
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center py-8">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground italic">No reviews available.</p>
                          {reviewsData && (
                            <p className="text-xs text-muted-foreground mt-2">
                              Debug: {Object.keys(reviewsData).join(', ')}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {!productData && !loading && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Ready to Analyze</h3>
                <p className="text-muted-foreground text-center">
                  Enter an Amazon product URL or ASIN above to get detailed product analysis and review insights
                </p>
              </CardContent>
            </Card>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

