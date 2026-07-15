import { Gem } from "lucide-react";

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`bg-brand-gradient rounded-2xl flex items-center justify-center mb-3 ${
          compact ? "w-11 h-11" : "w-14 h-14"
        }`}
      >
        <Gem className="text-white" size={compact ? 18 : 22} fill="white" />
      </div>
      <p className="text-lg font-extrabold tracking-tight">
        <span className="text-ink">me</span>
        <span className="text-brand-pinkDeep">millennial</span>
      </p>
      <p className="text-[11px] font-semibold text-subtle -mt-0.5">
        Admin Portal
      </p>
    </div>
  );
}
