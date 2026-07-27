"use client";

import { Loader2, Save } from "lucide-react";

interface SaveButtonProps {
  loading?: boolean;
  onClick?: () => void;
  label?: string;
}

export function SaveButton({
  loading = false,
  onClick,
  label = "Save Changes",
}: SaveButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="
        flex items-center gap-2
        bg-brand-gradient
        text-white
        px-5 py-2.5
        rounded-xl
        text-sm
        font-bold
        transition-opacity
        disabled:opacity-60
        disabled:cursor-not-allowed
      "
    >
      {loading ? (
        <>
          <Loader2
            size={16}
            className="animate-spin"
          />
          Saving...
        </>
      ) : (
        <>
          <Save size={16} />
          {label}
        </>
      )}
    </button>
  );
}