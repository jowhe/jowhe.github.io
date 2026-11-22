import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Glass styling as a class string, so it can be applied to any shadcn
 * component: <Button className={glassVariants()} /> or
 * <Card className={glassVariants({ intensity: "strong" })} />.
 * The effect is toggled globally by <GlassProvider> (see useGlass).
 */
const glassVariants = cva("glass", {
  variants: {
    intensity: {
      subtle: "[--glass-blur:8px] [--glass-tint:25%]",
      regular: "",
      strong: "[--glass-blur:40px] [--glass-tint:65%]",
    },
  },
  defaultVariants: { intensity: "regular" },
})

function Glass({
  className,
  intensity,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof glassVariants>) {
  return (
    <div
      data-slot="glass"
      className={cn(glassVariants({ intensity }), className)}
      {...props}
    />
  )
}

export { Glass, glassVariants }
