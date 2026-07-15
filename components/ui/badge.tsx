import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold leading-none",
  {
    variants: {
      variant: {
        default: "bg-secondary text-brand-purple",
        success: "bg-[#DDF3E7] text-success",
        warning: "bg-[#FBF0D6] text-warning",
        danger: "bg-[#FBE2E2] text-destructive",
        info: "bg-[#E1EAFB] text-[#3E6FE0]",
        neutral: "bg-muted text-subtle",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
