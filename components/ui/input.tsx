import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    if (icon) {
      return (
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-subtle">
            {icon}
          </span>
          <input
            type={type}
            className={cn(
              "flex h-11 w-full rounded-md border border-hairline bg-white pl-10 pr-3.5 text-sm text-ink placeholder:text-subtle/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink/40 focus-visible:border-brand-pink disabled:cursor-not-allowed disabled:opacity-50",
              className,
            )}
            ref={ref}
            {...props}
          />
        </div>
      );
    }
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-md border border-hairline bg-white px-3.5 text-sm text-ink placeholder:text-subtle/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink/40 focus-visible:border-brand-pink disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
