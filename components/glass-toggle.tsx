"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { SparklesIcon } from "@hugeicons/core-free-icons"
import { useGlass } from "@/components/glass-provider"
import { SwitchMenuItem } from "@/components/switch-menu-item"

/** Menu row with a switch; place it inside an existing <DropdownMenuContent>. */
export function GlassToggle() {
  const { enabled, setEnabled } = useGlass()

  return (
    <SwitchMenuItem
      icon={<HugeiconsIcon icon={SparklesIcon} size={16} />}
      label="Glass effect"
      checked={enabled}
      onCheckedChange={setEnabled}
    />
  )
}
