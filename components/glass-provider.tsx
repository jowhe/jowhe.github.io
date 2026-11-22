"use client"

import * as React from "react"

const STORAGE_KEY = "glass"

type GlassContextValue = {
  enabled: boolean
  setEnabled: (enabled: boolean) => void
  toggle: () => void
}

const GlassContext = React.createContext<GlassContextValue | null>(null)

const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

// The <html data-glass> attribute is the source of truth (set pre-paint by glassInitScript).
const getSnapshot = () => document.documentElement.dataset.glass !== "off"

function GlassProvider({
  children,
  defaultEnabled = false,
}: {
  children: React.ReactNode
  defaultEnabled?: boolean
}) {
  const enabled = React.useSyncExternalStore(subscribe, getSnapshot, () => defaultEnabled)

  const setEnabled = React.useCallback((value: boolean) => {
    document.documentElement.dataset.glass = value ? "on" : "off"
    try {
      localStorage.setItem(STORAGE_KEY, value ? "on" : "off")
    } catch {}
    listeners.forEach((listener) => listener())
  }, [])

  const value = React.useMemo(
    () => ({ enabled, setEnabled, toggle: () => setEnabled(!enabled) }),
    [enabled, setEnabled]
  )

  return <GlassContext.Provider value={value}>{children}</GlassContext.Provider>
}

function useGlass() {
  const ctx = React.useContext(GlassContext)
  if (!ctx) throw new Error("useGlass must be used within <GlassProvider>")
  return ctx
}

export { GlassProvider, useGlass }
