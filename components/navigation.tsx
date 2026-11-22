'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { Configuration02Icon, Home03Icon, NotebookPenIcon, PencilIcon } from "@hugeicons/core-free-icons";
import { glassVariants } from "@/components/ui/glass";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ThemeToggle } from "./theme-toggle";
import { GlassToggle } from "./glass-toggle";
import { AccessibilitySettings } from "./accessibility-settings";

type NavLink = {
  label: string;
  url: string;
  icon: IconSvgElement;
  /** Played while the link is hovered/focused; keyframes live in globals.css. */
  animation: string;
}

const links: NavLink[] = [
  { label: "Home", url: "/", icon: Home03Icon, animation: "motion-safe:group-hover/nav:animate-nav-home motion-safe:group-focus-visible/nav:animate-nav-home" },
  { label: "Work", url: "/work", icon: PencilIcon, animation: "motion-safe:group-hover/nav:animate-nav-work motion-safe:group-focus-visible/nav:animate-nav-work" },
  { label: "Contact", url: "/contact", icon: NotebookPenIcon, animation: "motion-safe:group-hover/nav:animate-nav-contact motion-safe:group-focus-visible/nav:animate-nav-contact" },
]

const isActive = (pathname: string, url: string) =>
  url === "/" ? pathname === "/" : pathname === url || pathname.startsWith(`${url}/`);

const Navigation = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-row items-center justify-center w-full">
      {/* Top-left beside the nav on wide screens; bottom-right (thumb reach) when the nav fills the width. */}
      <div className="fixed right-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 md:top-3 md:right-auto md:bottom-auto md:left-3">
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label="Page settings"
            className={cn("rounded-full flex size-9 items-center justify-center hover:cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring", glassVariants({ intensity: "subtle" }))}
          >
            <HugeiconsIcon icon={Configuration02Icon} size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className={cn("w-48", glassVariants({ intensity: "subtle" }))} align="start">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Page Settings</DropdownMenuLabel>
              <ThemeToggle />
              <GlassToggle />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <AccessibilitySettings />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className={cn("sticky top-3 z-50 flex flex-row justify-between items-center gap-x-3 p-3 content-width rounded-full mx-auto my-3", glassVariants({ intensity: "subtle" }))}>
        <div className="h-full">
          <h1>Joe Howe</h1>
        </div>
        <div className="flex flex-row gap-x-5">
          <ul className="flex flex-row gap-x-3 list-inside">
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navigation;
