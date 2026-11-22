"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Modular packing grid. Drop <BentoItem>s into a <Bento> and they flow on their own:
 * the grid is 12 columns wide (12 = 100%, 6 = 50%, 4 = 33%, 3 = 25%) with fixed-height
 * rows, and `grid-flow-dense` back-fills any gap a smaller item can fit into.
 * Breakpoints follow the grid's own width (container queries), not the viewport.
 */

type Breakpoint = "base" | "sm" | "md" | "lg"
type Responsive = number | Partial<Record<Breakpoint, number>>

const BREAKPOINTS: Breakpoint[] = ["base", "sm", "md", "lg"]
const COLUMNS = 12

/**
 * A number is shorthand: `cols={6}` is full width on small grids and 6/12 from `md` up;
 * `rows={4}` applies at every size. An object sets breakpoints explicitly and each
 * unspecified one inherits from the previous (base -> sm -> md -> lg).
 */
function resolve(value: Responsive | undefined, fallback: Record<Breakpoint, number>) {
  const input: Partial<Record<Breakpoint, number>> =
    value === undefined ? fallback : typeof value === "number" ? fallback.base === COLUMNS ? { base: COLUMNS, md: value } : { base: value } : value

  const out = {} as Record<Breakpoint, number>
  let previous = input.base ?? fallback.base
  for (const bp of BREAKPOINTS) {
    previous = input[bp] ?? previous
    out[bp] = previous
  }
  return out
}

const MOVE_MS = 400
const MOVE_EASING = "cubic-bezier(0.22, 1, 0.36, 1)"

const prefersReducedMotion = () =>
  document.documentElement.dataset.motion === "reduce" ||
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

/**
 * Animates items to their new spot when the layout reflows (a breakpoint is crossed,
 * items are added or removed). Plain resizing that only scales items proportionally is
 * not animated, so dragging the window stays responsive. Uses FLIP: measure the old and
 * new boxes, then play the difference as a transform. Skipped entirely when reduced
 * motion is on (the settings switch or the OS preference).
 */
function useAnimatedReflow(ref: React.RefObject<HTMLDivElement | null>) {
  React.useEffect(() => {
    const grid = ref.current
    if (!grid) return

    type Box = { x: number; y: number; w: number; h: number; slot: string }

    // offset* ignores transforms, so a running animation doesn't skew measurements.
    const measure = () => {
      const colWidth = grid.clientWidth / COLUMNS
      // NaN while rows are content-sized ("auto"): heights then follow the text as the
      // grid narrows, so only the columns count as layout.
      const rowHeight = parseFloat(getComputedStyle(grid).gridAutoRows)
      const boxes = new Map<HTMLElement, Box>()
      for (const el of Array.from(grid.children)) {
        // Asides are positioned outside the grid flow, so they never take part in reflow.
        if (!(el instanceof HTMLElement) || el.dataset.aside !== undefined) continue
        const { offsetLeft: x, offsetTop: y, offsetWidth: w, offsetHeight: h } = el
        // Position/size in grid cells: only changes when the layout really reflows.
        const cells = Number.isFinite(rowHeight)
          ? [x / colWidth, y / rowHeight, w / colWidth, h / rowHeight]
          : [x / colWidth, w / colWidth]
        const slot = cells.map(Math.round).join()
        boxes.set(el, { x, y, w, h, slot })
      }
      return boxes
    }

    let previous = measure()

    const observer = new ResizeObserver(() => {
      const next = measure()
      const reflowed = Array.from(next).some(([el, box]) => {
        const old = previous.get(el)
        return old !== undefined && old.slot !== box.slot
      })

      if (reflowed && !prefersReducedMotion()) {
        for (const [el, box] of next) {
          const old = previous.get(el)
          if (!old || box.w === 0 || box.h === 0) continue
          if (old.x === box.x && old.y === box.y && old.w === box.w && old.h === box.h) continue
          el.getAnimations().forEach((animation) => animation.cancel())
          el.animate(
            [
              {
                transformOrigin: "top left",
                transform: `translate(${old.x - box.x}px, ${old.y - box.y}px) scale(${old.w / box.w}, ${old.h / box.h})`,
              },
              { transformOrigin: "top left", transform: "none" },
            ],
            { duration: MOVE_MS, easing: MOVE_EASING }
          )
        }
      }

      previous = next
    })

    observer.observe(grid)
    return () => observer.disconnect()
  }, [ref])
}

function Bento({
  className,
  children,
  rowHeight = 50,
  gap = 8,
  glass = false,
  ...props
}: React.ComponentProps<"div"> & {
  /** Height of one row unit: a number is px, a string is any CSS length. */
  rowHeight?: number | string
  /** Space between items in px. */
  gap?: number
  /**
   * Let glass styling apply to the items. Off by default: everything inside the bento
   * ignores `glass` / glassVariants() / <Glass>, whatever the global glass setting.
   */
  glass?: boolean
}) {
  const gridRef = React.useRef<HTMLDivElement>(null)
  useAnimatedReflow(gridRef)

  return (
    <div
      data-slot="bento"
      data-glass-scope={glass ? undefined : "none"}
      className="@container mx-auto content-width"
    >
      <div
        ref={gridRef}
        className={cn(
          // Below @xl the grid is a stack, so rows size to their content (see BentoItem).
          "relative -m-[calc(var(--bento-gap)/2)] grid grid-flow-dense grid-cols-12 auto-rows-(--bento-row) @max-xl:auto-rows-auto",
          className
        )}
        style={
          {
            "--bento-row": typeof rowHeight === "number" ? `${rowHeight}px` : rowHeight,
            "--bento-gap": `${gap}px`,
          } as React.CSSProperties
        }
        {...props}
      >
        {children}
      </div>
    </div>
  )
}

function BentoItem({
  className,
  children,
  cols,
  rows,
  aside = false,
  style,
  ...props
}: React.ComponentProps<"div"> & {
  /** Width in 12ths of the grid. */
  cols?: Responsive
  /**
   * Height in row units (see `rowHeight` on <Bento>). Ignored while the grid is narrower
   * than the `md` breakpoint, where each item is exactly as tall as its content.
   */
  rows?: Responsive
  /**
   * On wide screens (xl and up) lift the item out of the grid and pin it to the right of
   * the screen, level with the first item, where it stays in view while scrolling. On smaller screens it
   * is an ordinary item, using `cols` / `rows`, at its position in the source order.
   */
  aside?: boolean
}) {
  const c = resolve(cols, { base: COLUMNS, sm: COLUMNS, md: COLUMNS, lg: COLUMNS })
  const r = resolve(rows, { base: 4, sm: 4, md: 4, lg: 4 })

  return (
    <div
      data-slot="bento-item"
      data-aside={aside ? "" : undefined}
      className={cn(
        "min-w-0 p-[calc(var(--bento-gap)/2)]",
        // Right edge sits 1.5rem inside the screen's right edge: grid width + half the free space - inset.
        aside && "xl:absolute xl:inset-y-0 xl:left-[calc(100%+(100vw-100%)/2-17.5rem)] xl:w-64",
        "col-span-(--c-base) @md:col-span-(--c-sm) @xl:col-span-(--c-md) @2xl:col-span-(--c-lg)",
        "row-span-(--r-base) @md:row-span-(--r-sm) @xl:row-span-(--r-md) @2xl:row-span-(--r-lg)",
        // Narrow grids ignore `rows`: each item is one content-sized row, with no spare space.
        "@max-xl:row-span-1!"
      )}
      style={
        {
          "--c-base": clamp(c.base, COLUMNS),
          "--c-sm": clamp(c.sm, COLUMNS),
          "--c-md": clamp(c.md, COLUMNS),
          "--c-lg": clamp(c.lg, COLUMNS),
          "--r-base": Math.max(1, Math.round(r.base)),
          "--r-sm": Math.max(1, Math.round(r.sm)),
          "--r-md": Math.max(1, Math.round(r.md)),
          "--r-lg": Math.max(1, Math.round(r.lg)),
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {/* Content fills the cell exactly, so item heights are whole row units. No overflow
          clipping here: it would square off children's rounded corners and shadows. */}
      <div className={cn("size-full min-w-0", className)}>
        {aside ? <div className="xl:sticky xl:top-[4.5rem]">{children}</div> : children}
      </div>
    </div>
  )
}

const clamp = (n: number, max: number) => Math.min(max, Math.max(1, Math.round(n)))

export { Bento, BentoItem }
