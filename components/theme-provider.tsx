// filepath: c:\Users\HP\Downloads\ecommerce-premium\components\theme-provider.tsx
"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return (
      <NextThemesProvider
      defaultTheme="light"
      enableSystem
      attribute="class"
    >
      {children}
      </NextThemesProvider>
    )
  }