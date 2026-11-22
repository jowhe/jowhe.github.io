import * as React from "react"

import { Glass } from "@/components/ui/glass"
import { cn } from "@/lib/utils"

/**
 * Standard card for <BentoItem>: a glass surface that fills its cell, with an optional
 * small heading. Scrolls vertically rather than clipping if its content outgrows the cell.
 */
function ContentTile({
  title,
  className,
  children,
  ...props
}: React.ComponentProps<typeof Glass> & { title?: string }) {
  return (
    <Glass
      className={cn("flex size-full flex-col gap-3 overflow-y-auto rounded-2xl p-5 text-sm leading-relaxed", className)}
      {...props}
    >
      {title && <h2 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{title}</h2>}
      {children}
    </Glass>
  )
}

export { ContentTile }
