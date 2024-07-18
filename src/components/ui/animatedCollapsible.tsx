import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import React from "react";
import { cn } from "@/lib/utils";

const AnimatedCollapsible = CollapsiblePrimitive.Root;

const AnimatedCollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const AnimatedCollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleContent>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleContent
    ref={ref}
    className={cn(
      "overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up",
      className,
    )}
    {...props}
  />
));

export {
  AnimatedCollapsible,
  AnimatedCollapsibleTrigger,
  AnimatedCollapsibleContent,
};
