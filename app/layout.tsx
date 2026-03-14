// app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { NavBar } from "@/components/ui/tubelight-navbar"
import Footer from "@/components/ui/footer"
import { CustomScrollbar } from "@/components/ui/custom-scrollbar"
import { config } from "@/lib/config"

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
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "FreedomCalc — Free Financial Independence Calculators",
    description: "Free financial independence calculators for the FIRE movement. No signup required.",
    url: "https://freedomcalc.dev",
    siteName: "FreedomCalc",
    images: [
      {
        url: "https://freedomcalc.dev/og-image.svg",
        width: 1200,
        height: 630,
        alt: "FreedomCalc — Financial Freedom Calculator",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FreedomCalc — Free Financial Independence Calculators",
    description: "Free financial independence calculators for the FIRE movement. No signup required.",
    images: ["https://freedomcalc.dev/og-image.svg"],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${config.gaId}`} strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${config.gaId}');
        `}</Script>
      </head>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <CustomScrollbar />
        <NavBar />
        <div className="pt-20 sm:pt-24 pb-20 sm:pb-0">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
