// app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { NavBar } from "@/components/ui/tubelight-navbar"
import Footer from "@/components/ui/footer"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: {
    default: "FreedomCalc — Free Retirement & Financial Independence Calculators",
    template: "%s | FreedomCalc",
  },
  description: "Free financial independence calculators for the FIRE movement. Calculate your FIRE number, retirement timeline, savings rate, and more — all free, no signup required.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <NavBar />
        <div className="pt-20 sm:pt-24 pb-20 sm:pb-0">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
