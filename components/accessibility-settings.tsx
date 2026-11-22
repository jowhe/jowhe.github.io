"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ContrastIcon, PauseIcon, TextFontIcon } from "@hugeicons/core-free-icons"
import { DropdownMenuGroup, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { SwitchMenuItem } from "@/components/switch-menu-item"

// Each preference is an attribute on <html> (the source of truth, styled in globals.css),
// mirrored to localStorage and applied pre-paint by accessibilityInitScript.
const FLAGS = {
  motion: "reduce",
  contrast: "high",
  text: "large",
} as const

type Flag = keyof typeof FLAGS

const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function setFlag(flag: Flag, on: boolean) {
  const root = document.documentElement
  try {
    if (on) {
      root.dataset[flag] = FLAGS[flag]
      localStorage.setItem(`a11y-${flag}`, FLAGS[flag])
    } else {
      delete root.dataset[flag]
      localStorage.removeItem(`a11y-${flag}`)
    }
  } catch {}
  listeners.forEach((listener) => listener())
}

function useFlag(flag: Flag) {
  const on = React.useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset[flag] === FLAGS[flag],
    () => false
  )
  return [on, (value: boolean) => setFlag(flag, value)] as const
}

/** Menu group; place it inside an existing <DropdownMenuContent>. */
export function AccessibilitySettings() {
  const [reduceMotion, setReduceMotion] = useFlag("motion")
  const [highContrast, setHighContrast] = useFlag("contrast")
  const [largeText, setLargeText] = useFlag("text")

  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel>Accessibility</DropdownMenuLabel>
      <SwitchMenuItem
        icon={<HugeiconsIcon icon={PauseIcon} size={16} />}
        label="Reduce motion"
        checked={reduceMotion}
        onCheckedChange={setReduceMotion}
      />
      <SwitchMenuItem
        icon={<HugeiconsIcon icon={ContrastIcon} size={16} />}
        label="High contrast"
        checked={highContrast}
        onCheckedChange={setHighContrast}
      />
      <SwitchMenuItem
        icon={<HugeiconsIcon icon={TextFontIcon} size={16} />}
        label="Larger text"
        checked={largeText}
        onCheckedChange={setLargeText}
      />
    </DropdownMenuGroup>
  )
}
