import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/layout/brand-logo";
import { OtpInput } from "@/components/layout/otp-input";

export default function VerifyPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-appbg px-4">
      <div className="w-full max-w-[380px] bg-white rounded-xl shadow-soft border border-hairline p-8">
        <BrandLogo compact />

        <div className="mt-6">
          <h1 className="text-xl font-extrabold text-ink">
            Verify your account
          </h1>
          <p className="text-xs text-subtle mt-1.5 leading-5">
            Enter the 6-digit code sent to your email to continue.
          </p>
        </div>

        <div className="mt-4 inline-flex items-center gap-1.5 bg-[#E1EAFB] text-[#3E6FE0] rounded-md px-3 py-2 text-xs font-semibold">
          <Mail size={14} />
          Code sent to{" "}
          <span className="font-extrabold">ri***@email.com</span>
        </div>

        <div className="mt-6">
          <OtpInput length={6} />
        </div>

        <button
          type="button"
          className="mt-3 text-xs font-semibold text-subtle hover:text-brand-pinkDeep"
        >
          Didn&apos;t receive the code?
        </button>

        <Button asChild className="w-full mt-5">
          <Link href="/dashboard">Verify</Link>
        </Button>

        <div className="mt-5 text-center">
          <Link
            href="/login"
            className="text-sm font-semibold text-brand-pinkDeep hover:underline"
          >
            Change Email
          </Link>
        </div>
      </div>
    </div>
  );
}
