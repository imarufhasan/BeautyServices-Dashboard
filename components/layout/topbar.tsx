import { Bell } from "lucide-react";

export function Topbar({
  section,
  page,
}: {
  section: string;
  page: string;
}) {
  return (
    <header className="h-16 border-b border-hairline bg-white/70 backdrop-blur px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="text-sm">
        <span className="text-subtle font-medium">{section}</span>
        <span className="mx-1.5 text-subtle">›</span>
        <span className="text-ink font-bold">{page}</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-secondary transition-colors">
          <Bell size={16} className="text-ink" />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-brand-pinkDeep text-white text-[9px] font-bold flex items-center justify-center">
            5
          </span>
        </button>

        <div className="flex items-center gap-2.5 pl-4 border-l border-hairline">
          <div className="w-9 h-9 rounded-full bg-brand-gradient flex items-center justify-center text-white text-xs font-bold">
            AO
          </div>
          <div>
            <p className="text-xs font-bold text-ink leading-none">
              Alex O&apos;Brien
            </p>
            <p className="text-[10px] text-subtle mt-1">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
