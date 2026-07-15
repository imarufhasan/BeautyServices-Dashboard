import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { avatarColor } from "@/lib/avatar-color";

// Shape mirrors what GET /api/bookings?limit=6&sort=-date would return:
// a page of records plus pagination meta, rather than a bare array.
type BookingStatus = "Completed" | "Pending" | "Cancelled" | "Refunded";

type BookingRecord = {
  id: string;
  customer: { name: string; initials: string };
  artist: string;
  service: string;
  amountCents: number;
  status: BookingStatus;
  bookedAt: string; // ISO date
};

interface BookingsApiResponse {
  data: BookingRecord[];
  meta: { total: number; page: number; pageSize: number };
}

const MOCK_RESPONSE: BookingsApiResponse = {
  meta: { total: 89_432, page: 1, pageSize: 6 },
  data: [
    {
      id: "BK-8921",
      customer: { name: "Sarah Mitchell", initials: "SM" },
      artist: "Jessica Chen",
      service: "Bridal Makeup",
      amountCents: 38_000,
      status: "Completed",
      bookedAt: "2026-07-02",
    },
    {
      id: "BK-8920",
      customer: { name: "Emma Williams", initials: "EW" },
      artist: "Priya Sharma",
      service: "Hair Styling",
      amountCents: 12_000,
      status: "Pending",
      bookedAt: "2026-07-02",
    },
    {
      id: "BK-8919",
      customer: { name: "Olivia Johnson", initials: "OJ" },
      artist: "Isabella Romano",
      service: "Nail Art",
      amountCents: 8_500,
      status: "Completed",
      bookedAt: "2026-07-01",
    },
    {
      id: "BK-8918",
      customer: { name: "Ava Martinez", initials: "AM" },
      artist: "Mei Lin Chen",
      service: "Facial Treatment",
      amountCents: 22_000,
      status: "Cancelled",
      bookedAt: "2026-07-01",
    },
    {
      id: "BK-8917",
      customer: { name: "Chloe Thompson", initials: "CT" },
      artist: "Aisha Okonkwo",
      service: "Lash Extensions",
      amountCents: 16_500,
      status: "Refunded",
      bookedAt: "2026-06-30",
    },
    {
      id: "BK-8916",
      customer: { name: "Lily Anderson", initials: "LA" },
      artist: "Sofia Reyes",
      service: "Eyebrow Threading",
      amountCents: 4_500,
      status: "Completed",
      bookedAt: "2026-06-30",
    },
  ],
};

const STATUS_VARIANT: Record<
  BookingStatus,
  "success" | "warning" | "danger" | "info"
> = {
  Completed: "success",
  Pending: "warning",
  Cancelled: "danger",
  Refunded: "info",
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function RecentBookings() {
  const { data, meta } = MOCK_RESPONSE;

  return (
    <Card className="col-span-2">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>
            Showing {data.length} of {meta.total.toLocaleString()} bookings
          </CardDescription>
        </div>
        <Link
          href="/bookings"
          className="text-xs font-semibold text-brand-pinkDeep hover:underline"
        >
          View All
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-wide text-subtle border-y border-hairline">
                <th className="text-left font-bold px-5 py-2.5">ID</th>
                <th className="text-left font-bold px-2 py-2.5">Customer</th>
                <th className="text-left font-bold px-2 py-2.5">Artist</th>
                <th className="text-left font-bold px-2 py-2.5">Service</th>
                <th className="text-right font-bold px-2 py-2.5">Amount</th>
                <th className="text-left font-bold px-2 py-2.5">Status</th>
                <th className="text-left font-bold px-5 py-2.5">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((b) => (
                <tr
                  key={b.id}
                  className="border-b border-hairline last:border-0 hover:bg-muted transition-colors"
                >
                  <td className="px-5 py-3 text-xs font-semibold text-ink whitespace-nowrap">
                    {b.id}
                  </td>
                  <td className="px-2 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback
                          className={`${avatarColor(b.id)} text-ink`}
                        >
                          {b.customer.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-semibold text-ink whitespace-nowrap">
                        {b.customer.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 py-3 text-xs text-subtle whitespace-nowrap">
                    {b.artist}
                  </td>
                  <td className="px-2 py-3 text-xs text-subtle whitespace-nowrap">
                    {b.service}
                  </td>
                  <td className="px-2 py-3 text-xs font-bold text-ink text-right whitespace-nowrap">
                    {currencyFormatter.format(b.amountCents / 100)}
                  </td>
                  <td className="px-2 py-3">
                    <Badge variant={STATUS_VARIANT[b.status]}>{b.status}</Badge>
                  </td>
                  <td className="px-5 py-3 text-xs text-subtle whitespace-nowrap">
                    {dateFormatter.format(new Date(b.bookedAt))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
