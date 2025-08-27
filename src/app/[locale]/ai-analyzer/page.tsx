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
import { Star, Package, Users, MessageSquare, Brain, AlertTriangle } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"

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
  const params = useParams()
  const locale = params.locale as string
  const tNav = useTranslations("Nav")
  const t = useTranslations("AiAnalyzerPage")
  const [input, setInput] = useState("")
  const [productData, setProductData] = useState<ProductData | null>(null)
  const [reviewsData, setReviewsData] = useState<ReviewsResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [geminiAnalysis, setGeminiAnalysis] = useState<string | null>(null)
  const [geminiLoading, setGeminiLoading] = useState(false)

  const analyzeNegativeReviews = async () => {
    if (!reviewsData) return
    
    setGeminiLoading(true)
    setGeminiAnalysis(null)
    
    try {
      // Filter 1-2 star reviews
      const reviews = reviewsData.data?.reviews || reviewsData.reviews || []
      console.log('All reviews for filtering:', reviews.map(r => ({ rating: r.rating, title: r.title })))
      
      // No need to filter reviews manually, as API should handle it
      const negativeReviews = reviews
      
      console.log(`Found ${negativeReviews.length} negative reviews out of ${reviews.length} total`)
      
      if (negativeReviews.length === 0) {
        setGeminiAnalysis(`No negative reviews (1-2 stars) found to analyze. Found ${reviews.length} total reviews.`)
        return
      }
      
      // Prepare review text for analysis
      const reviewTexts = negativeReviews.map(review => 
        `Rating: ${review.rating} | Title: ${review.title} | Review: ${review.body}`
      ).join('\n\n')
      
      const prompt = `قم بتحليل هذه المراجعات السلبية لمنتج أمازون وحدد المشاكل الرئيسية التي يشكو منها العملاء. قدم ملخصًا موجزًا لأهم 3-5 مشاكل شائعة مذكورة:

${reviewTexts}

يرجى تنسيق الإجابة كالتالي:
**المشاكل الرئيسية الموجودة:**
1. [فئة المشكلة] - [وصف موجز وتكرار المشكلة]
2. [فئة المشكلة] - [وصف موجز وتكرار المشكلة]
وهكذا...

ركز على الرؤى القابلة للتنفيذ حول جودة المنتج، والحجم، والوظائف، أو مشاكل الخدمة. أجب باللغة العربية فقط.`

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=AIzaSyC1DAUp3bnc5YqaxfQL7T8E-SMwPqLRJjs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      })
      
      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`)
      }
      
      const result = await response.json()
      const analysisText = result.candidates?.[0]?.content?.parts?.[0]?.text || "Analysis could not be generated."
      
      setGeminiAnalysis(analysisText)
      
    } catch (err) {
      console.error('Gemini analysis error:', err)
      setGeminiAnalysis(`Error analyzing reviews: ${String(err)}`)
    } finally {
      setGeminiLoading(false)
    }
  }

  // Auto-trigger analysis when reviews data is available
  useEffect(() => {
    if (reviewsData && !geminiAnalysis && !geminiLoading) {
      console.log('useEffect triggered - starting analysis')
      // No longer need setTimeout, trigger immediately if reviewsData is available and analysis hasn't started
      analyzeNegativeReviews()
    }
  }, [reviewsData, geminiAnalysis, geminiLoading])

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
    setGeminiAnalysis(null)
    setGeminiLoading(false)
    setLoading(true)
    setError("")

    try {
      // Fetch product data and reviews in parallel
      const productUrl = `https://amazon-online-data-api.p.rapidapi.com/product?asins=${asin}&geo=SA`
      const reviewsUrl = `https://amazon-online-data-api.p.rapidapi.com/v2/product-reviews?geo=SA&page=1&asin=${asin}&filter_by_star=1&media_reviews_only=false`
      
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
      } else if (Object.keys(reviewsResult).length === 0) {
        // API returned an empty object, treat as no reviews found for the filter
        console.warn('Reviews API Warning: No reviews found for the specified filters (empty response object).')
        setReviewsData({ reviews: [], total_reviews: 0, with_reviews: 0, total_pages: 0, current_page: 0 })
      } else {
        console.error('Reviews API Error - unexpected format:', reviewsResult)
        // Don't return error for reviews, as product data is still valuable
      }

      setInput("")
      
      // Automatically trigger AI analysis after all data is loaded
      // Analysis is now triggered by the useEffect hook once reviewsData is set
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
                  <BreadcrumbLink href={`/${locale}`}>{tNav("dashboard")}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{tNav("aiAnalyzer")}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-10">

          {/* Input Section */}
          <Card className="bg-accent/22">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                {t("productAnalysis")}
              </CardTitle>
              <CardDescription>
                {t("enterUrl")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder={t("inputPlaceholder")}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && fetchProductData()}
                />
                <Button onClick={fetchProductData} disabled={loading}>
                  {loading ? t("analyzing") : t("analyze")}
                </Button>
              </div>
              {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
            </CardContent>
          </Card>



          {/* Results Section */}
          {productData && (
            <div className="space-y-6">
              {/* AI Analysis Card - Top Row */}
              <Card className="border-2 border-gray-200 bg-white shadow-lg">
                <CardHeader className="bg-white border-b border-gray-200">
                  <CardTitle className="flex items-center gap-3 text-lg text-gray-800">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Brain className="h-6 w-6 text-blue-600" />
                    </div>
                    تحليل الذكي للمراجعات السلبية
                  </CardTitle>
                  <CardDescription className="text-gray-600 mt-2">
                    تحليل المراجعات ذات النجمة والنجمتين لتحديد الشكاوى والمشاكل الشائعة للعملاء
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {!geminiAnalysis && !geminiLoading && (
                      <div className="text-center py-8">
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-20"></div>
                          </div>
                          <AlertTriangle className="h-12 w-12 text-blue-600 mx-auto mb-4 relative z-10" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">في انتظار التحليل</h3>
                        <p className="text-sm text-gray-600 max-w-md mx-auto">
                          سيبدأ التحليل الذكي تلقائياً بعد تحميل بيانات المنتج والمراجعات
                        </p>
                      </div>
                    )}
                    
                    {geminiLoading && (
                      <div className="text-center py-10">
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full animate-pulse"></div>
                          </div>
                          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4 relative z-10"></div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">جاري التحليل...</h3>
                        <p className="text-sm text-gray-600">يتم تحليل المراجعات باستخدام الذكاء الاصطناعي</p>
                        <div className="mt-4 w-64 mx-auto bg-gray-200 rounded-full h-2">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
                        </div>
                      </div>
                    )}
                    
                    {geminiAnalysis && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-full">
                              <Brain className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-green-800">نتائج التحليل</h4>
                              <p className="text-sm text-green-600">تم إنجاز التحليل بنجاح</p>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={analyzeNegativeReviews}
                            disabled={geminiLoading}
                            className="gap-2 border-green-300 text-green-700 hover:bg-green-50"
                          >
                            <Brain className="h-3 w-3" />
                            إعادة التحليل
                          </Button>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                          <div className="prose prose-sm max-w-none text-right" dir="rtl" style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}>
                            {geminiAnalysis.split('\n').map((line, index) => (
                              <p key={index} className="mb-3 last:mb-0 leading-relaxed">
                                {line.startsWith('**') && line.endsWith('**') ? (
                                  <strong className="text-lg text-gray-800 block mb-2">{line.slice(2, -2)}</strong>
                                ) : line.match(/^\d+\./) ? (
                                  <span className="block mr-4 p-2 bg-gray-50 rounded-lg border-r-4 border-blue-500 text-gray-700">{line}</span>
                                ) : line.trim() ? (
                                  <span className="text-gray-600">{line}</span>
                                ) : null}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Product Data Cards - Second Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Product Overview */}
                <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    {t("productOverview")}
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
                          <span className="text-sm">{productData.product_reviews.count ? productData.product_reviews.count.toLocaleString() : '0'} {t("reviews")}</span>
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
                    {t("customerInsights")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-primary">{productData.product_reviews.rating.toFixed(1)}</div>
                        <div className="text-sm text-muted-foreground">{t("averageRating")}</div>
                        <div className="mt-1">{renderStars(productData.product_reviews.rating.toString())}</div>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-primary">{productData.product_reviews.count.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">{t("totalReviews")}</div>
                      </div>
                    </div>

                    {reviewsData && (
                      <div>
                        <h4 className="font-semibold mb-2">{t("reviewsSummary")}</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex justify-between">
                            <span>{t("totalReviewsLabel")}</span>
                            <span className="font-medium">{(reviewsData.data?.total_reviews || reviewsData.total_reviews || 0).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>{t("withReviews")}</span>
                            <span className="font-medium">{(reviewsData.data?.with_reviews || reviewsData.with_reviews || 0).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>{t("totalPages")}</span>
                            <span className="font-medium">{reviewsData.data?.total_pages || reviewsData.total_pages || 0}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {productData.availability && (
                      <div>
                        <h4 className="font-semibold mb-2">{t("availability")}</h4>
                        <Badge variant={productData.availability.type === 'IN_STOCK' ? 'default' : 'secondary'}>
                          {productData.availability.message || productData.availability.type}
                        </Badge>
                      </div>
                    )}

                    {productData.product_variations && (
                      <div>
                        <h4 className="font-semibold mb-2">{t("productVariations")}</h4>
                        <div className="space-y-2">
                          {productData.product_variations.color && (
                            <div className="flex flex-wrap gap-1">
                              <span className="text-sm font-medium">{t("colors")}</span>
                              <div className="flex flex-wrap gap-1">
                                {productData.product_variations.color.slice(0, 5).map((color, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {color.color}
                                  </Badge>
                                ))}
                                {productData.product_variations.color.length > 5 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{productData.product_variations.color.length - 5} {t("moreSuffix")}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}
                          {productData.product_variations.size && (
                            <div className="flex flex-wrap gap-1">
                              <span className="text-sm font-medium">{t("sizes")}</span>
                              <div className="flex flex-wrap gap-1">
                                {productData.product_variations.size.slice(0, 5).map((size, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {size.size}
                                  </Badge>
                                ))}
                                {productData.product_variations.size.length > 5 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{productData.product_variations.size.length - 5} {t("moreSuffix")}
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
                    {t("topReviews")}
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
                                    <Badge variant="outline" className="text-xs">{t("verified")}</Badge>
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
                                    {review.helpful_count} {t("peopleFoundHelpful")}
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
                          <p className="text-sm text-muted-foreground italic">{t("noReviewsAvailable")}</p>
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
            </div>
          )}

          {!productData && !loading && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t("readyTitle")}</h3>
                <p className="text-muted-foreground text-center">
                  {t("readyDescription")}
                </p>
              </CardContent>
            </Card>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

