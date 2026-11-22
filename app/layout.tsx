import { Atkinson_Hyperlegible_Next, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { GlassProvider } from "@/components/glass-provider";
import { accessibilityInitScript, glassInitScript } from "@/lib/preference-scripts";

const fontSans = Atkinson_Hyperlegible_Next({ subsets: ['latin'], variable: '--font-sans' })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-glass="off"
      className={cn("antialiased", fontMono.variable, "font-sans", fontSans.variable)}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: glassInitScript + accessibilityInitScript }} />
      </head>
      <body>
        <ThemeProvider>
          <GlassProvider>
            <Navigation />
            <main className="w-full pb-12">{children}</main>
            <Footer />
          </GlassProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
