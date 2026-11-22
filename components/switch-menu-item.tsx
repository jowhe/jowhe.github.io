"use client"

import * as React from "react"
import { DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"

/**
 * Menu row with a switch. The row is the real control (role=menuitemcheckbox with
 * aria-checked, keyboard-operable); the switch is a display-only visual of its state.
 */
export function SwitchMenuItem({
  icon,
  label,
  checked,
  onCheckedChange,
}: {
  icon: React.ReactNode
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <DropdownMenuCheckboxItem
      checked={checked}
      onCheckedChange={onCheckedChange}
      closeOnClick={false}
      className="justify-between pr-1.5! [&_[data-slot=dropdown-menu-checkbox-item-indicator]]:hidden"
    >
      <span className="flex items-center gap-1.5">
        {icon}
        {label}
      </span>
      <Switch size="sm" checked={checked} tabIndex={-1} aria-hidden className="pointer-events-none" />
    </DropdownMenuCheckboxItem>
  )
}
