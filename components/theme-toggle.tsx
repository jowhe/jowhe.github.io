"use client"

import { useTheme } from "next-themes"
import { HugeiconsIcon } from "@hugeicons/react"
import { Sun03Icon, Moon02Icon } from "@hugeicons/core-free-icons"
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { glassVariants } from "./ui/glass"
import { cn } from "cn"

/**
 * Renders as a submenu; place it inside an existing <DropdownMenuContent>.
 * Menu contents mount client-side on open, so reading resolvedTheme is hydration-safe here.
 */
export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <HugeiconsIcon icon={resolvedTheme === "dark" ? Moon02Icon : Sun03Icon} size={16} />
        Theme
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className={cn(glassVariants({ intensity: "subtle" }))}>
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )
}
