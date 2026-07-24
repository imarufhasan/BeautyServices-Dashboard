"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronLeft,
  CheckCircle,
  AlertCircle,
  Clock,
  Download,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { VERIFICATION_DETAILS } from "./verificationDetails.data";
import Skeleton from "@/components/dashboard/Skeleton";

export interface VerificationDocument {
  id: number;
  title: string;
  image: string;
}

export interface Certificate {
  id: number;
  title: string;
  issuedDate: string;
}

export interface VerificationChecklistItem {
  label: string;
  completed: boolean;
}

export interface VerificationDetail {
  id: string;
  name: string;
  email: string;
  phone: string;
  initials: string;
  avatar: string;
  businessName: string;
  businessAddress: string;
  abn: string;
  category: string;
  experience: string;
  businessRegistration: string;
  registrationStatus: string;
  abuStatus: string;
  insuranceType: string;
  insuranceStatus: string;
  submittedAt: string;
  verificationStatus: string;
  statusColor: string;
  statusBg: string;
  documents: VerificationDocument[];
  certificates: Certificate[];
  verificationChecklist: VerificationChecklistItem[];
}

export default function VerificationDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);

  const data = VERIFICATION_DETAILS[id];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-appbg min-h-screen">
        <VerificationDetailSkeleton />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 bg-appbg min-h-screen">
        <Link
          href="/verification"
          className="text-brand-pinkDeep hover:underline"
        >
          ← Back to Verifications
        </Link>

        <p className="mt-4 text-red-500">Verification request not found</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-appbg min-h-screen">
      {/* Header */}
      <Link
        href="/verification"
        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-pinkDeep hover:underline mb-6"
      >
        <ChevronLeft size={16} />
        Back to Verifications
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Artist Information */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-ink mb-6">
              Artist Information
            </h2>
            <div className="flex gap-6 mb-6">
              <div>
                <Avatar className="w-24 h-24 rounded-lg">
                  <AvatarImage
                    src={data.avatar}
                    alt={data.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="rounded-lg bg-linear-to-br from-blue-400 to-blue-600 text-white text-2xl font-bold">
                    {data.initials}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] uppercase font-bold text-subtle tracking-wide">
                    Full Name
                  </p>
                  <p className="text-sm font-bold text-ink mt-1">{data.name}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-subtle tracking-wide">
                    Business Name
                  </p>
                  <p className="text-sm font-bold text-ink mt-1">
                    {data.businessName}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-subtle tracking-wide">
                    Email
                  </p>
                  <p className="text-sm font-bold text-ink mt-1">
                    {data.email}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-subtle tracking-wide">
                    Phone
                  </p>
                  <p className="text-sm font-bold text-ink mt-1">
                    {data.phone}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-subtle tracking-wide">
                    Business Address
                  </p>
                  <p className="text-sm font-bold text-ink mt-1">
                    {data.businessAddress}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-subtle tracking-wide">
                    ABN Number
                  </p>
                  <p className="text-sm font-bold text-ink mt-1">{data.abn}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-subtle tracking-wide">
                    Category
                  </p>
                  <p className="text-sm font-bold text-ink mt-1">
                    {data.category}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-subtle tracking-wide">
                    Experience
                  </p>
                  <p className="text-sm font-bold text-ink mt-1">
                    {data.experience}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Identity Documents */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-ink mb-6">
              Identity Documents
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {data.documents.map((doc: VerificationDocument) => (
                <div key={doc.id} className="text-center">
                  <div className="rounded-lg overflow-hidden bg-muted mb-2 aspect-video relative">
                    <Image
                      src={doc.image}
                      alt={doc.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs font-semibold text-ink text-center">
                    {doc.title}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Certificates & Qualifications */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-ink mb-6">
              Certificates & Qualifications
            </h2>
            <div className="space-y-3">
              {data.certificates.map((cert: Certificate) => (
                <div
                  key={cert.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-hairline"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center text-white shrink-0">
                    📄
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-ink truncate">
                      {cert.title}
                    </p>
                    <p className="text-xs text-subtle">{cert.issuedDate}</p>
                  </div>
                  <button className="text-brand-pinkDeep hover:text-brand-pink-deep shrink-0">
                    <Download size={16} />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Business Details */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-ink mb-6">
              Business Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-muted/50 border border-hairline">
                <p className="text-[10px] uppercase font-bold text-subtle tracking-wide mb-1">
                  Business Registration
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-ink">
                    {data.businessRegistration}
                  </p>
                  <Badge variant="success" className="text-xs">
                    {data.registrationStatus}
                  </Badge>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 border border-hairline">
                <p className="text-[10px] uppercase font-bold text-subtle tracking-wide mb-1">
                  ABN Status
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-ink">{data.abuStatus}</p>
                  <Badge variant="success" className="text-xs">
                    Active
                  </Badge>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 border border-hairline">
                <p className="text-[10px] uppercase font-bold text-subtle tracking-wide mb-1">
                  Insurance Details
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-ink">
                    {data.insuranceType}
                  </p>
                  <Badge variant="success" className="text-xs">
                    {data.insuranceStatus}
                  </Badge>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 border border-hairline">
                <p className="text-[10px] uppercase font-bold text-subtle tracking-wide mb-1">
                  Business Address
                </p>
                <p className="text-sm font-bold text-ink">
                  {data.businessAddress}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Side - Verification Status & Actions */}
        <div className="space-y-6">
          {/* Verification Status */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-ink mb-4">
              Verification Status
            </h2>

            {/* Status Badge */}
            <Badge
              className={`${data.statusBg} ${data.statusColor} mb-4 w-full justify-center gap-1.5 py-1.5`}
            >
              <Clock size={12} />
              {data.verificationStatus}
            </Badge>
            <p className="text-xs text-subtle text-center mb-6">
              Submitted {data.submittedAt}
            </p>

            {/* Verification Checklist */}
            <div className="space-y-2">
              {data.verificationChecklist.map(
                (check: VerificationChecklistItem, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50"
                  >
                    {check.completed ? (
                      <CheckCircle
                        size={16}
                        className="text-success shrink-0"
                      />
                    ) : (
                      <AlertCircle
                        size={16}
                        className="text-subtle shrink-0"
                      />
                    )}
                    <p
                      className={`text-xs font-medium ${
                        check.completed ? "text-ink" : "text-subtle"
                      }`}
                    >
                      {check.label}
                    </p>
                  </div>
                ),
              )}
            </div>
          </Card>

          {/* Actions */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-ink mb-4">Actions</h2>
            <div className="space-y-3">
              <Button className="w-full bg-brand-gradient text-white hover:opacity-90">
                ✓ Approve Verification
              </Button>
              <Button
                variant="outline"
                className="w-full border-destructive text-destructive hover:bg-destructive/10"
              >
                ✗ Reject Verification
              </Button>
              <Button variant="ghost" className="w-full">
                ⚠️ Request More Information
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function VerificationDetailSkeleton() {
  return (
    <div className="space-y-6">
      {/* Back */}
      <Skeleton className="h-5 w-40 rounded-md" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left */}

        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-72 rounded-2xl" />

          <Skeleton className="h-64 rounded-2xl" />

          <Skeleton className="h-48 rounded-2xl" />

          <Skeleton className="h-52 rounded-2xl" />
        </div>

        {/* Right */}

        <div className="space-y-6">
          <Skeleton className="h-80 rounded-2xl" />

          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
