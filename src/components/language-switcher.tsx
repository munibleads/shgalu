"use client"

import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"
import { useLocale } from "next-intl"
import { usePathname, useRouter } from "next/navigation"

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "ar" : "en"
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.replace(newPath)
  }

  return (
    <Button variant="ghost" size="sm" onClick={toggleLocale} className="h-8 px-2 gap-2">
      <Languages className="h-4 w-4" />
      {locale === "en" ? "Language" : "اللغة"}
    </Button>
  )
}
