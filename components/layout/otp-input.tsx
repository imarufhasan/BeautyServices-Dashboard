"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function OtpInput({ length = 6 }: { length?: number }) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...values];
    next[index] = digit;
    setValues(next);

    if (digit && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-2.5 justify-center">
      {values.map((val, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          value={val}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          inputMode="numeric"
          maxLength={1}
          className={cn(
            "w-11 h-12 rounded-md border border-hairline bg-white text-center text-lg font-bold text-ink",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink/40 focus-visible:border-brand-pink",
          )}
        />
      ))}
    </div>
  );
}
