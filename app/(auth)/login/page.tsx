"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrandLogo } from "@/components/layout/brand-logo";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Direct dashboard redirect
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-appbg px-4">
      <div className="w-full max-w-[380px] bg-white rounded-xl shadow-soft border border-hairline p-8">
        <BrandLogo />

        <form onSubmit={handleLogin} className="mt-7 space-y-4">
          <div>
            <Label htmlFor="email">Admin Email</Label>

            <Input
              id="email"
              type="email"
              placeholder="admin@memillennial.com"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>

            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <Button asChild type="submit" className="w-full mt-2">
            <Link href="/dashboard">Sign in</Link>
          </Button>
        </form>

        <div className="mt-5 text-center">
          <Link
            href="/forgot-password"
            className="text-sm font-semibold text-brand-pinkDeep hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}
