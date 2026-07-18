import { Topbar } from "@/components/layout/topbar";
import UsersTable from "./UsersTable";

export default function UsersPage() {
  return (
    <>
      <Topbar section="memillennial" page="User Management" />

      <main className="p-6">
        <UsersTable />
      </main>
    </>
  );
}