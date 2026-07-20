"use client";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { USERS } from "./users.data";

const MINI_STATS = [
  { value: "10", label: "Total Users", color: "text-brand-pinkDeep" },
  { value: "5", label: "Customers", color: "text-success" },
  { value: "5", label: "Artists", color: "text-brand-pinkDeep" },
  { value: "1", label: "Suspended", color: "text-destructive" },
  { value: "6", label: "Active Users", color: "text-success" },
];

const AVATAR_COLORS = [
  "bg-[#F4B6C2]",
  "bg-[#B8C7E8]",
  "bg-[#B8D8BA]",
  "bg-[#F4B67C]",
  "bg-[#D9B8E8]",
  "bg-[#F4B6C2]",
  "bg-[#F4D9A0]",
  "bg-[#B8C7E8]",
  "bg-[#D9B8E8]",
  "bg-[#F4B67C]",
];

const ROLE_VARIANT: Record<string, "info" | "default"> = {
  Customer: "info",
  Artist: "default",
};

const STATUS_VARIANT: Record<
  string,
  "success" | "warning" | "danger" | "neutral"
> = {
  Active: "success",
  Pending: "warning",
  Suspended: "danger",
  Paused: "neutral",
};

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const ITEMS_PER_PAGE = 10;

  const filteredUsers2 = USERS.filter((user) =>
    `${user.name} ${user.email} ${user.phone} ${user.role} ${user.status}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  const filteredUsers = USERS.filter((user) => {
    const matchesSearch =
      `${user.name} ${user.email} ${user.phone} ${user.role} ${user.status}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesRole = roleFilter === "All" || user.role === roleFilter;

    const matchesStatus =
      statusFilter === "All" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

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
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search users by name or email..."
            />
          </div>
          <div className="relative">
            <button
              onClick={() => {
                setShowRoleMenu(!showRoleMenu);
                setShowStatusMenu(false);
              }}
              className="h-11 px-4 rounded-md border border-hairline bg-white flex items-center gap-2 text-sm font-semibold text-ink hover:bg-muted"
            >
              Role
              {roleFilter !== "All" && (
                <span className="bg-brand-pinkDeep text-white text-[10px] px-2 py-0.5 rounded-full">
                  {roleFilter}
                </span>
              )}
              <ChevronDown size={14} className="text-subtle" />
            </button>

            {showRoleMenu && (
              <div className="absolute top-12 left-0 w-40 bg-white border border-hairline rounded-xl shadow-lg z-50 p-2">
                {["All", "Customer", "Artist"].map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      setRoleFilter(role);
                      setPage(1);
                      setShowRoleMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold hover:bg-muted "
                  >
                    {role === "All" ? "All Roles" : role}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => {
                setShowStatusMenu(!showStatusMenu);
                setShowRoleMenu(false);
              }}
              className="h-11 px-4 rounded-md border border-hairline bg-white flex items-center gap-2 text-sm font-semibold text-ink hover:bg-muted"
            >
              Status
              {statusFilter !== "All" && (
                <span className="bg-success text-white text-[10px] px-2 py-0.5 rounded-full">
                  {statusFilter}
                </span>
              )}
              <ChevronDown size={14} className="text-subtle" />
            </button>

            {showStatusMenu && (
              <div className="absolute top-12 left-0 w-40 bg-white border border-hairline rounded-xl shadow-lg z-50 p-2">
                {["All", "Active", "Pending", "Suspended", "Paused"].map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setStatusFilter(status);
                        setPage(1);
                        setShowStatusMenu(false);
                      }}
                      className="w-full text-left px-3 py-2  rounded-lg text-xs font-semibold hover:bg-muted"
                    >
                      {status === "All" ? "All Status" : status}
                    </button>
                    
                  ),
                )}
              </div>
            )}
          </div>
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
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center py-10 text-sm text-subtle"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((u, i) => (
                  <tr
                    key={u.id}
                    className="border-b border-hairline last:border-0 hover:bg-muted/50"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback
                            className={`${AVATAR_COLORS[(page - 1) * ITEMS_PER_PAGE + (i % AVATAR_COLORS.length)]} text-ink`}
                          >
                            {u.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-xs font-bold text-ink leading-none">
                            {u.name}
                          </p>
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
                      <Badge variant={STATUS_VARIANT[u.status]}>
                        {u.status}
                      </Badge>
                    </td>
                    <td className="px-2 py-3 text-xs font-semibold text-ink">
                      {u.bookings}
                    </td>
                    <td className="px-2 py-3 text-xs text-subtle">
                      {u.lastLogin}
                    </td>
                    <td className="px-5 py-3 text-xs text-subtle">
                      {u.joined}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* <div className="flex items-center justify-between px-5 py-3.5 border-t border-hairline">
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
          </div> */}
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-hairline">
            <p className="text-xs text-subtle">
              Showing{" "}
              {filteredUsers.length === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1}
              {" - "}
              {Math.min(page * ITEMS_PER_PAGE, filteredUsers.length)}
              {" of "}
              {filteredUsers.length} users
            </p>

            <div className="flex items-center gap-1.5">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="w-8 h-8 rounded-md border border-hairline flex items-center justify-center text-subtle hover:bg-muted disabled:opacity-40"
              >
                <ChevronLeft size={14} />
              </button>

              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setPage(index + 1)}
                  className={`w-8 h-8 rounded-md text-xs font-bold flex items-center justify-center ${
                    page === index + 1
                      ? "bg-brand-gradient text-white"
                      : "border border-hairline text-ink hover:bg-muted"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="w-8 h-8 rounded-md border border-hairline flex items-center justify-center text-subtle hover:bg-muted disabled:opacity-40"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </Card>
      </main>
    </>
  );
}
