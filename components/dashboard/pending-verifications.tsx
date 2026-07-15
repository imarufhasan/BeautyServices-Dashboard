import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { avatarColor } from "@/lib/avatar-color";

// Shape mirrors GET /api/verifications?status=pending&limit=4
type VerificationRecord = {
  id: string;
  name: string;
  initials: string;
  role: string;
  submittedAt: string; // ISO date
};

interface VerificationsApiResponse {
  data: VerificationRecord[];
  meta: { total: number };
}

const MOCK_RESPONSE: VerificationsApiResponse = {
  meta: { total: 23 },
  data: [
    {
      id: "VF-3301",
      name: "Priya Sharma",
      initials: "PS",
      role: "Makeup Artist",
      submittedAt: "2026-06-28",
    },
    {
      id: "VF-3302",
      name: "Isabella Romano",
      initials: "IR",
      role: "Hair Stylist",
      submittedAt: "2026-06-29",
    },
    {
      id: "VF-3303",
      name: "Mei Lin Chen",
      initials: "ML",
      role: "Nail Technician",
      submittedAt: "2026-06-30",
    },
    {
      id: "VF-3304",
      name: "Aisha Okonkwo",
      initials: "AO",
      role: "Lash Artist",
      submittedAt: "2026-07-01",
    },
  ],
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

// Small "3 days ago" style helper so the list feels live rather than static,
// computed relative to the mock response's own reference date.
function relativeTo(dateStr: string, referenceISO: string) {
  const days = Math.round(
    (new Date(referenceISO).getTime() - new Date(dateStr).getTime()) /
      (1000 * 60 * 60 * 24),
  );
  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

export function PendingVerifications() {
  const { data, meta } = MOCK_RESPONSE;
  const referenceDate = "2026-07-02"; // "now" for this dummy payload

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Pending Verifications</CardTitle>
          <CardDescription>{meta.total} awaiting review</CardDescription>
        </div>
        <Link
          href="/verification"
          className="text-xs font-semibold text-brand-pinkDeep hover:underline"
        >
          View All
        </Link>
      </CardHeader>
      <CardContent className="space-y-1">
        {data.map((v) => (
          <div
            key={v.id}
            className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-muted transition-colors"
          >
            <Avatar className="h-9 w-9">
              <AvatarFallback className={`${avatarColor(v.id)} text-ink`}>
                {v.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-ink truncate">{v.name}</p>
              <p className="text-[11px] text-subtle mt-0.5">
                {v.role} · {dateFormatter.format(new Date(v.submittedAt))}
              </p>
            </div>
            <span className="text-[10px] font-medium text-subtle shrink-0">
              {relativeTo(v.submittedAt, referenceDate)}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
