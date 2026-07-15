import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrandLogo } from "@/components/layout/brand-logo";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-appbg px-4">
      <div className="w-full max-w-[380px] bg-white rounded-xl shadow-soft border border-hairline p-8">
        <BrandLogo compact />

        <div className="mt-6">
          <h1 className="text-xl font-extrabold text-ink">
            Forgot your password?
          </h1>
          <p className="text-xs text-subtle mt-1.5 leading-5">
            Enter your email address and we&apos;ll send you a verification
            code to reset your password.
          </p>
        </div>

        <form className="mt-5 space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              icon={<Mail size={16} />}
              placeholder="Enter your email"
            />
          </div>

          <Button asChild className="w-full mt-1">
            <Link href="/verify">Send Code</Link>
          </Button>
        </form>
      </div>
    </div>
  );
}
