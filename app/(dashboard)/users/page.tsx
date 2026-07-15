import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const MINI_STATS = [
  { value: "10", label: "Total Users", color: "text-brand-pinkDeep" },
  { value: "5", label: "Customers", color: "text-success" },
  { value: "5", label: "Artists", color: "text-brand-pinkDeep" },
  { value: "1", label: "Suspended", color: "text-destructive" },
  { value: "6", label: "Active Users", color: "text-success" },
];

const AVATAR_COLORS = [
  "bg-[#F4B6C2]", "bg-[#B8C7E8]", "bg-[#B8D8BA]", "bg-[#F4B67C]",
  "bg-[#D9B8E8]", "bg-[#F4B6C2]", "bg-[#F4D9A0]", "bg-[#B8C7E8]",
  "bg-[#D9B8E8]", "bg-[#F4B67C]",
];

const USERS = [
  { id: "U-001", name: "Sarah Mitchell", initials: "SM", email: "sarah.mitchell@email.com", phone: "+61 412 345 678", role: "Customer", status: "Active", bookings: 24, lastLogin: "Jul 2, 2026", joined: "Mar 14, 2024" },
  { id: "U-002", name: "Jessica Chen", initials: "JC", email: "jessica.chen@studio.com", phone: "+61 423 456 789", role: "Artist", status: "Active", bookings: 312, lastLogin: "Jul 2, 2026", joined: "Jan 8, 2024" },
  { id: "U-003", name: "Emma Williams", initials: "EW", email: "emma.w@gmail.com", phone: "+61 434 567 890", role: "Customer", status: "Active", bookings: 7, lastLogin: "Jul 2, 2026", joined: "Jun 29, 2026" },
  { id: "U-004", name: "Priya Sharma", initials: "PS", email: "priya.sharma@beauty.com", phone: "+61 445 678 901", role: "Artist", status: "Pending", bookings: 0, lastLogin: "Jun 30, 2026", joined: "Jun 28, 2026" },
  { id: "U-005", name: "Olivia Johnson", initials: "OJ", email: "o.johnson@outlook.com", phone: "+61 456 789 012", role: "Customer", status: "Active", bookings: 18, lastLogin: "Jul 1, 2026", joined: "Nov 22, 2023" },
  { id: "U-006", name: "Isabella Romano", initials: "IR", email: "isabella.r@hairpro.com.au", phone: "+61 467 890 123", role: "Artist", status: "Suspended", bookings: 156, lastLogin: "Jun 15, 2026", joined: "Aug 5, 2023" },
  { id: "U-007", name: "Ava Martinez", initials: "AM", email: "ava.martinez@hotmail.com", phone: "+61 478 901 234", role: "Customer", status: "Active", bookings: 11, lastLogin: "Jul 2, 2026", joined: "Feb 17, 2025" },
  { id: "U-008", name: "Mei Lin Chen", initials: "ML", email: "meilin.chen@nailsbymei.com", phone: "+61 489 012 345", role: "Artist", status: "Paused", bookings: 89, lastLogin: "Jun 28, 2026", joined: "May 3, 2024" },
  { id: "U-009", name: "Chloe Thompson", initials: "CT", email: "chloe.t@icloud.com", phone: "+61 491 234 567", role: "Customer", status: "Active", bookings: 32, lastLogin: "Jul 1, 2026", joined: "Sep 11, 2023" },
  { id: "U-010", name: "Aisha Okonkwo", initials: "AO", email: "aisha.ok@lashart.com.au", phone: "+61 412 903 456", role: "Artist", status: "Pending", bookings: 0, lastLogin: "Jul 1, 2026", joined: "Jul 1, 2026" },
];

const ROLE_VARIANT: Record<string, "info" | "default"> = {
  Customer: "info",
  Artist: "default",
};

const STATUS_VARIANT: Record<string, "success" | "warning" | "danger" | "neutral"> = {
  Active: "success",
  Pending: "warning",
  Suspended: "danger",
  Paused: "neutral",
};

export default function UsersPage() {
  return (
    <>
      <Topbar section="memillennial" page="User Management" />

      <main className="p-6 space-y-5">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">User Management</h1>
          <p className="text-sm text-subtle mt-0.5">
            Manage customers and beauty artists
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {MINI_STATS.map((s) => (
            <Card key={s.label} className="p-4">
              <p className={`text-xl font-extrabold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-subtle mt-1">{s.label}</p>
            </Card>
          ))}
        </div>

        <Card className="p-3 flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              icon={<Search size={15} />}
              placeholder="Search users by name or email..."
            />
          </div>
          <button className="h-11 px-4 rounded-md border border-hairline bg-white flex items-center gap-2 text-sm font-semibold text-ink hover:bg-muted">
            Role
            <ChevronDown size={14} className="text-subtle" />
          </button>
          <button className="h-11 px-4 rounded-md border border-hairline bg-white flex items-center gap-2 text-sm font-semibold text-ink hover:bg-muted">
            Status
            <ChevronDown size={14} className="text-subtle" />
          </button>
        </Card>

        <Card className="p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-wide text-subtle border-b border-hairline">
                <th className="text-left font-bold px-5 py-3">User</th>
                <th className="text-left font-bold px-2 py-3">Email</th>
                <th className="text-left font-bold px-2 py-3">Phone</th>
                <th className="text-left font-bold px-2 py-3">Role</th>
                <th className="text-left font-bold px-2 py-3">Status</th>
                <th className="text-left font-bold px-2 py-3">Bookings</th>
                <th className="text-left font-bold px-2 py-3">Last Login</th>
                <th className="text-left font-bold px-5 py-3">Joined</th>
              </tr>
            </thead>
            <tbody>
              {USERS.map((u, i) => (
                <tr key={u.id} className="border-b border-hairline last:border-0 hover:bg-muted/50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className={`${AVATAR_COLORS[i % AVATAR_COLORS.length]} text-ink`}>
                          {u.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs font-bold text-ink leading-none">{u.name}</p>
                        <p className="text-[10px] text-subtle mt-1">{u.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-3 text-xs text-subtle">{u.email}</td>
                  <td className="px-2 py-3 text-xs text-subtle">{u.phone}</td>
                  <td className="px-2 py-3">
                    <Badge variant={ROLE_VARIANT[u.role]}>{u.role}</Badge>
                  </td>
                  <td className="px-2 py-3">
                    <Badge variant={STATUS_VARIANT[u.status]}>{u.status}</Badge>
                  </td>
                  <td className="px-2 py-3 text-xs font-semibold text-ink">{u.bookings}</td>
                  <td className="px-2 py-3 text-xs text-subtle">{u.lastLogin}</td>
                  <td className="px-5 py-3 text-xs text-subtle">{u.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-between px-5 py-3.5 border-t border-hairline">
            <p className="text-xs text-subtle">Showing 10 of 10 users</p>
            <div className="flex items-center gap-1.5">
              <button className="w-8 h-8 rounded-md border border-hairline flex items-center justify-center text-subtle hover:bg-muted">
                <ChevronLeft size={14} />
              </button>
              <button className="w-8 h-8 rounded-md bg-brand-gradient text-white text-xs font-bold flex items-center justify-center">
                1
              </button>
              <button className="w-8 h-8 rounded-md border border-hairline text-xs font-semibold text-ink flex items-center justify-center hover:bg-muted">
                2
              </button>
              <button className="w-8 h-8 rounded-md border border-hairline text-xs font-semibold text-ink flex items-center justify-center hover:bg-muted">
                3
              </button>
              <button className="w-8 h-8 rounded-md border border-hairline flex items-center justify-center text-subtle hover:bg-muted">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </Card>
      </main>
    </>
  );
}
