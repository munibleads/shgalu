import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ProductCard } from "@/components/ui/product-card"
import { Plus } from "lucide-react";

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


const productData = {
  "status": "OK",
  "request_id": "c842cd89-07df-48d9-9d66-ddbcdd2aff9b",
  "parameters": {
    "asin": "B0FL74ZD1C",
    "country": "SA",
    "language": "ar_AE"
  },
  "data": {
    "asin": "B0FL74ZD1C",
    "product_title": "حافظة وحدة تحكم لجهاز سويتش 2 جوي كون، عبوة من قطعتين من غطاء حماية مغناطيسي صلب من البولي كربونات لذراع التحكم سويتش 2، غطاء مقبض مضاد للخدش والصدمات، ملحقات العاب سوداء وشفافة",
    "product_price": "59.99",
    "product_original_price": null,
    "minimum_order_quantity": null,
    "currency": "SAR",
    "country": "SA",
    "product_byline": "العلامة التجارية: ازوني",
    "product_byline_link": "https://www.amazon.sa/s/ref=bl_dp_s_web_0?ie=UTF8&search-alias=aps&field-keywords=%D8%A7%D8%B2%D9%88%D9%86%D9%8A",
    "product_byline_links": [
      "https://www.amazon.sa/s/ref=bl_dp_s_web_0?ie=UTF8&search-alias=aps&field-keywords=%D8%A7%D8%B2%D9%88%D9%86%D9%8A"
    ],
    "product_star_rating": 4.5,
    "product_num_ratings": 10,
    "product_url": "https://www.amazon.sa/dp/B0FL74ZD1C",
    "product_slug": "%D9%82%D8%B7%D8%B9%D8%AA%D9%8A%D9%86-%D9%85%D8%BA%D9%86%D8%A7%D8%B7%D9%8A%D8%B3%D9%8A-%D8%A7%D9%84%D8%A8%D9%88%D9%84%D9%8A-%D9%83%D8%B1%D8%A8%D9%88%D9%86%D8%A7%D8%AA-%D9%88%D8%A7%D9%84%D8%B5%D8%AF%D9%85%D8%A7%D8%AA%D8%8C",
    "product_photo": "https://m.media-amazon.com/images/I/71lpMC9pmcL._AC_SL1500_.jpg",
    "product_num_offers": 2,
    "product_availability": "تبقى 2 فقط - اطلبه الآن.",
    "is_best_seller": false,
    "is_amazon_choice": false,
    "is_prime": false,
    "climate_pledge_friendly": false,
    "sales_volume": null,
    "about_product": [
      "مصممة خصيصًا لجهاز سويتش 2 جويكون: تسمح الفتحات الدقيقة بالوصول الكامل إلى جميع الأزرار وعناصر التحكم والمنافذ. مصمم خصيصًا لجهاز سويتش 2 جوي كون، مما يضمن ملاءمة سلسة تعزز الحماية دون التداخل مع اللعب.",
      "️ ️ تصميم كبس مغناطيسي: تعمل المغناطيسات المدمجة على تثبيت الغطاء بإحكام بجهاز جوي كون الخاص بك، مما يوفر تركيبًا سهلًا وثباتًا قويًا. ببساطة قم بمحاذاة المغناطيس واتركه يثبت في مكانه، ثم قم بتثبيت الإبزيم العلوي لملاءمة محكمة وموثوقة.",
      "هيكل صلب مقاوم للصدمات: مصنوع من مادة البولي كربونات المتينة، يقاوم جراب جوي كون هذا التآكل اليومي والسقوط والخدوش . إنه مقاوم للصدمات والخدوش ويضمن بقاء وحدات التحكم الخاصة بك محمية في المنزل أو أثناء التنقل.",
      "دعم مريح للقبضة: تصميم سهل الإمساك ينسجم مع راحة يدك لتعزيز الراحة . مثالية لجلسات الألعاب الطويلة، فهي توفر ثباتًا أفضل مع تقليل التعب وتحسين التعامل مع جوي كون بشكل عام.",
      "خفيف الوزن وجاهز للسفر: صغير الحجم ونحيف، يضيف غطاء جوي كون هذا الحد الأدنى من الوزن مع توفير الحماية الكاملة. مثالية للسفر أو تخزين حقيبة الظهر أو جلسات الألعاب المحمولة اليومية في أي وقت وفي أي مكان."
    ],
    "product_description": "1",
    "product_information": {
      "أبعاد المنتج": "14 x 8 x 4 سم; 60 جرام",
      "مرجع الشركة المصنعة": "GU3063",
      "وزن السلعة": "60 غ",
      "ASIN": "B0FL74ZD1C",
      "تصنيف الأفضل مبيعاً": "#١٬٤٣١ في Videogames (شاهد أفضل 100 في Videogames)  #٤١ في Nintendo Switch Cases & Storage",
      "تاريخ توفر أول منتج": "2025 أغسطس 5"
    },
    "rating_distribution": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    },
    "product_photos": [
      "https://m.media-amazon.com/images/I/71lpMC9pmcL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71t0ZdcMI7L._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71P7J-RmvWL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71CBMJ2BvJL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71VKoLFh1dL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71dfME9H3UL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/6181jouOy6L._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/615iEuYS6+L._AC_SL1500_.jpg"
    ],
    "product_videos": [],
    "user_uploaded_videos": [],
    "has_video": false,
    "product_details": {},
    "top_reviews": [],
    "top_reviews_global": [],
    "delivery": "توصيل مجاني الخميس، 28 أغسطس على طلبك الأول أو توصيل أسرع غداً، 27 أغسطس. قم بالطلب خلال 4 ساعات 7 دقائق",
    "primary_delivery_time": "الخميس، 28 أغسطس",
    "category": {
      "id": "aps",
      "name": "ألعاب الفيديو",
      "link": "#"
    },
    "category_path": [
      {
        "id": "12463675031",
        "name": "ألعاب الفيديو",
        "link": "https://www.amazon.sa/%D8%A3%D9%84%D8%B9%D8%A7%D8%A8-%D8%A7%D9%84%D9%81%D9%8A%D8%AF%D9%8A%D9%88/b/ref=dp_bc_1?ie=UTF8&node=12463675031"
      },
      {
        "id": "16949325031",
        "name": "نينتندو سويتش",
        "link": "https://www.amazon.sa/%D9%86%D9%8A%D9%86%D8%AA%D9%86%D8%AF%D9%88-%D8%B3%D9%88%D9%8A%D8%AA%D8%B4/b/ref=dp_bc_2?ie=UTF8&node=16949325031"
      },
      {
        "id": "16949357031",
        "name": "ملحقات",
        "link": "https://www.amazon.sa/%D9%85%D9%84%D8%AD%D9%82%D8%A7%D8%AA-%D9%86%D9%8A%D9%86%D8%AA%D9%86%D8%AF%D9%88-%D8%B3%D9%88%D9%8A%D8%AA%D8%B4/b/ref=dp_bc_3?ie=UTF8&node=16949357031"
      },
      {
        "id": "16949446031",
        "name": "الأغطية والتخزين",
        "link": "https://www.amazon.sa/b/ref=dp_bc_4?ie=UTF8&node=16949446031"
      }
    ],
    "product_variations_dimensions": [],
    "product_variations": [],
    "all_product_variations": {},
    "coupon_discount_percentage": 25,
    "has_aplus": false,
    "has_brandstory": false
  }
};

const product2 = {
  asin: "B0CGR553T1",
  product_title: "PELADN WI-6 Pro Mini PC Intel 12th Gen Alder Lake-N100",
  product_price: "799.00",
  currency: "SAR",
  country: "SA",
  product_byline: "Brand: PELADN",
  product_star_rating: 4.1,
  product_num_ratings: 8,
  product_url: "https://www.amazon.sa/dp/B0CGR553T1",
  product_photo: "https://m.media-amazon.com/images/I/61oV-GIp7BL.__AC_SX300_SY300_QL70_ML2_.jpg",
  product_availability: "In Stock.",
  category: {
    id: "electronics",
    name: "Electronics",
    link: "#"
  },
};

const product3 = {
  asin: "B08336XQR8",
  product_title: "Black+Decker Coffee Maker, 12 Cup Drip Coffee Machine",
  product_price: "159.00",
  currency: "SAR",
  country: "SA",
  product_byline: "Brand: Black+Decker",
  product_star_rating: 4.9,
  product_num_ratings: 8,
  product_url: "https://www.amazon.sa/dp/B08336XQR8",
  product_photo: "https://m.media-amazon.com/images/I/51Do6AgPvxL._AC_SY879_.jpg",
  product_availability: "In Stock.",
  category: {
    id: "kitchen",
    name: "Home & Kitchen",
    link: "#"
  },
};

const product4 = {
  asin: "B09Y5V5K3X",
  product_title: "Ergonomic Gaming Chair with Footrest and Massage Lumbar Support",
  product_price: "450.00",
  currency: "SAR",
  country: "SA",
  product_byline: "Brand: Generic",
  product_star_rating: 3.3,
  product_num_ratings: 8,
  product_url: "https://www.amazon.sa/dp/B09Y5V5K3X",
  product_photo: "https://m.media-amazon.com/images/I/71c4PcS2lBL.__AC_SX300_SY300_QL70_ML2_.jpg",
  product_availability: "In Stock.",
  category: {
    id: "furniture",
    name: "Furniture",
    link: "#"
  },
};

export default function Page() {
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
                  <BreadcrumbPage>Products</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-10">
          <div className="grid grid-cols-4 gap-4">
            <ProductCard product={productData.data as ProductData} />
            <ProductCard product={product2 as ProductData} />
            <ProductCard product={product3 as ProductData} />
            <ProductCard product={product4 as ProductData} />
          </div>
          <div className="flex items-center justify-center">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
