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

// Mock data - Replace with API fetch later
// NOTE: Image paths point to /public/assets/verification/ -> pic1.jpg, pic2.jpg, pic3.jpg...
// The `public` folder is the web root in Next.js, so an actual file on disk at
// public/assets/verification/pic1.jpg is served at the URL /assets/verification/pic1.jpg
// Drop your actual images there with these exact filenames (or update the paths below).

interface VerificationDocument {
  id: number;
  title: string;
  image: string;
}

interface Certificate {
  id: number;
  title: string;
  issuedDate: string;
}

interface VerificationChecklistItem {
  label: string;
  completed: boolean;
}

interface VerificationDetail {
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

const VERIFICATION_DETAILS: Record<string, VerificationDetail> = {
  "VF-3301": {
    id: "VF-3301",
    name: "Priya Sharma",
    email: "priya.sharma@beauty.com",
    phone: "+61 445 678 901",
    initials: "PS",
    avatar: "/assets/verification/pic1.jpg",
    businessName: "Priya Beauty Studio",
    businessAddress: "42 Collins St, Melbourne VIC 3000",
    abn: "51 824 753 556",
    category: "Makeup Artist",
    experience: "7 years",
    businessRegistration: "Registered",
    registrationStatus: "Active",
    abuStatus: "Active - 51 824 753 556",
    insuranceType: "Public Liability - $10M",
    insuranceStatus: "Active",
    submittedAt: "Jun 28, 2026",
    verificationStatus: "Pending",
    statusColor: "text-warning",
    statusBg: "bg-[#FBF0D6]",
    documents: [
      {
        id: 1,
        title: "Driver Licence Front",
        image: "/assets/verification/pic2.jpg",
      },
      {
        id: 2,
        title: "Driver Licence Back",
        image: "/assets/verification/pic3.jpg",
      },
      {
        id: 3,
        title: "Selfie Verification",
        image: "/assets/verification/pic1.jpg",
      },
    ],
    certificates: [],
    verificationChecklist: [
      { label: "ID Verification", completed: true },
      { label: "Selfie Match", completed: true },
      { label: "ABN Check", completed: true },
      { label: "Certificates Review", completed: false },
      { label: "Insurance Verified", completed: false },
    ],
  },

  "VF-3302": {
    id: "VF-3302",
    name: "Isabella Romano",
    email: "isabella.r@hairpro.com.au",
    phone: "+61 467 890 123",
    initials: "IR",
    avatar: "/assets/verification/pic2.jpg",
    businessName: "Romano Hair & Style",
    businessAddress: "42 Collins St, Melbourne VIC 3000",
    abn: "51 824 753 556",
    category: "Hair Stylist",
    experience: "5 years",
    businessRegistration: "Registered",
    registrationStatus: "Active",
    abuStatus: "Active - 51 824 753 556",
    insuranceType: "Public Liability - $10M",
    insuranceStatus: "Active",
    submittedAt: "Jun 29, 2026",
    verificationStatus: "Under Review",
    statusColor: "text-warning",
    statusBg: "bg-[#FBF0D6]",
    documents: [
      {
        id: 1,
        title: "Driver Licence Front",
        image: "/assets/verification/pic2.jpg",
      },
      {
        id: 2,
        title: "Driver Licence Back",
        image: "/assets/verification/pic3.jpg",
      },
      {
        id: 3,
        title: "Selfie Verification",
        image: "/assets/verification/pic1.jpg",
      },
    ],
    certificates: [],
    verificationChecklist: [
      { label: "ID Verification", completed: true },
      { label: "Selfie Match", completed: true },
      { label: "ABN Check", completed: true },
      { label: "Certificates Review", completed: false },
      { label: "Insurance Verified", completed: false },
    ],
  },

  "VF-3303": {
    id: "VF-3303",
    name: "Mei Lin Chen",
    email: "meilin.chen@nailsbymei.com",
    phone: "+61 489 012 345",
    initials: "ML",
    avatar: "/assets/verification/pic3.jpg",
    businessName: "Mei's Nail Atelier",
    businessAddress: "42 Collins St, Melbourne VIC 3000",
    abn: "51 824 753 556",
    category: "Nail Technician",
    experience: "6 years",
    businessRegistration: "Registered",
    registrationStatus: "Active",
    abuStatus: "Active - 51 824 753 556",
    insuranceType: "Public Liability - $10M",
    insuranceStatus: "Active",
    submittedAt: "Jun 30, 2026",
    verificationStatus: "Pending",
    statusColor: "text-warning",
    statusBg: "bg-[#FBF0D6]",
    documents: [
      {
        id: 1,
        title: "Driver Licence Front",
        image: "/assets/verification/pic2.jpg",
      },
      {
        id: 2,
        title: "Driver Licence Back",
        image: "/assets/verification/pic3.jpg",
      },
      {
        id: 3,
        title: "Selfie Verification",
        image: "/assets/verification/pic1.jpg",
      },
    ],
    certificates: [],
    verificationChecklist: [
      { label: "ID Verification", completed: true },
      { label: "Selfie Match", completed: true },
      { label: "ABN Check", completed: true },
      { label: "Certificates Review", completed: true },
      { label: "Insurance Verified", completed: false },
    ],
  },

  "VF-3304": {
    id: "VF-3304",
    name: "Aisha Okonkwo",
    email: "aisha.ok@lashart.com.au",
    phone: "+61 412 903 456",
    initials: "AO",
    avatar: "/assets/verification/pic1.jpg",
    businessName: "Aisha Lash & Brow",
    businessAddress: "42 Collins St, Melbourne VIC 3000",
    abn: "51 824 753 556",
    category: "Lash Artist",
    experience: "4 years",
    businessRegistration: "Registered",
    registrationStatus: "Active",
    abuStatus: "Active - 51 824 753 556",
    insuranceType: "Public Liability - $10M",
    insuranceStatus: "Active",
    submittedAt: "Jul 1, 2026",
    verificationStatus: "Pending",
    statusColor: "text-warning",
    statusBg: "bg-[#FBF0D6]",
    documents: [
      {
        id: 1,
        title: "Driver Licence Front",
        image: "/assets/verification/pic2.jpg",
      },
      {
        id: 2,
        title: "Driver Licence Back",
        image: "/assets/verification/pic3.jpg",
      },
      {
        id: 3,
        title: "Selfie Verification",
        image: "/assets/verification/pic1.jpg",
      },
    ],
    certificates: [],
    verificationChecklist: [
      { label: "ID Verification", completed: true },
      { label: "Selfie Match", completed: true },
      { label: "ABN Check", completed: true },
      { label: "Certificates Review", completed: true },
      { label: "Insurance Verified", completed: true },
    ],
  },
  "VF-3305": {
    id: "VF-3305",
    name: "Hannah Davis",
    email: "hannah.davis@beautypro.com",
    phone: "+61 412 903 457",
    initials: "HD",
    avatar: "/assets/verification/pic2.jpg",
    businessName: "Hannah Beauty Pro",
    businessAddress: "42 Collins St, Melbourne VIC 3000",
    abn: "51 824 753 558",
    category: "Makeup Artist",
    experience: "6 years",
    businessRegistration: "Registered",
    registrationStatus: "Active",
    abuStatus: "Active - 51 824 753 558",
    insuranceType: "Public Liability - $10M",
    insuranceStatus: "Active",
    submittedAt: "Jul 14, 2026",
    verificationStatus: "Rejected",
    statusColor: "text-destructive",
    statusBg: "bg-[#FBE2E2]",
    documents: [
      {
        id: 1,
        title: "Driver Licence Front",
        image: "/assets/verification/pic2.jpg",
      },
      {
        id: 2,
        title: "Driver Licence Back",
        image: "/assets/verification/pic3.jpg",
      },
      {
        id: 3,
        title: "Selfie Verification",
        image: "/assets/verification/pic1.jpg",
      },
    ],
    certificates: [],
    verificationChecklist: [
      { label: "ID Verification", completed: true },
      { label: "Selfie Match", completed: true },
      { label: "ABN Check", completed: false },
      { label: "Certificates Review", completed: false },
      { label: "Insurance Verified", completed: false },
    ],
  },

  "VF-3306": {
    id: "VF-3306",
    name: "Emily Wilson",
    email: "emily.wilson@haircare.com",
    phone: "+61 412 903 458",
    initials: "EW",
    avatar: "/assets/verification/pic3.jpg",
    businessName: "Emily Hair Boutique",
    businessAddress: "42 Collins St, Melbourne VIC 3000",
    abn: "51 824 753 559",
    category: "Hair Stylist",
    experience: "8 years",
    businessRegistration: "Registered",
    registrationStatus: "Active",
    abuStatus: "Active - 51 824 753 559",
    insuranceType: "Public Liability - $10M",
    insuranceStatus: "Active",
    submittedAt: "Jul 15, 2026",
    verificationStatus: "Pending",
    statusColor: "text-warning",
    statusBg: "bg-[#FBF0D6]",
    documents: [
      {
        id: 1,
        title: "Driver Licence Front",
        image: "/assets/verification/pic2.jpg",
      },
      {
        id: 2,
        title: "Driver Licence Back",
        image: "/assets/verification/pic3.jpg",
      },
      {
        id: 3,
        title: "Selfie Verification",
        image: "/assets/verification/pic1.jpg",
      },
    ],
    certificates: [],
    verificationChecklist: [
      { label: "ID Verification", completed: true },
      { label: "Selfie Match", completed: true },
      { label: "ABN Check", completed: true },
      { label: "Certificates Review", completed: false },
      { label: "Insurance Verified", completed: false },
    ],
  },

  "VF-3307": {
    id: "VF-3307",
    name: "Zoe Anderson",
    email: "zoe.anderson@nailstudio.com",
    phone: "+61 412 903 459",
    initials: "ZA",
    avatar: "/assets/verification/pic1.jpg",
    businessName: "Zoe Nail Atelier",
    businessAddress: "42 Collins St, Melbourne VIC 3000",
    abn: "51 824 753 560",
    category: "Nail Technician",
    experience: "5 years",
    businessRegistration: "Registered",
    registrationStatus: "Active",
    abuStatus: "Active - 51 824 753 560",
    insuranceType: "Public Liability - $10M",
    insuranceStatus: "Active",
    submittedAt: "Jul 16, 2026",
    verificationStatus: "Approved",
    statusColor: "text-success",
    statusBg: "bg-[#DDF3E7]",
    documents: [
      {
        id: 1,
        title: "Driver Licence Front",
        image: "/assets/verification/pic2.jpg",
      },
      {
        id: 2,
        title: "Driver Licence Back",
        image: "/assets/verification/pic3.jpg",
      },
      {
        id: 3,
        title: "Selfie Verification",
        image: "/assets/verification/pic1.jpg",
      },
    ],
    certificates: [],
    verificationChecklist: [
      { label: "ID Verification", completed: true },
      { label: "Selfie Match", completed: true },
      { label: "ABN Check", completed: true },
      { label: "Certificates Review", completed: true },
      { label: "Insurance Verified", completed: true },
    ],
  },

  "VF-3308": {
    id: "VF-3308",
    name: "Ruby Evans",
    email: "ruby.evans@lashworld.com",
    phone: "+61 412 903 460",
    initials: "RE",
    avatar: "/assets/verification/pic2.jpg",
    businessName: "Ruby Lash World",
    businessAddress: "42 Collins St, Melbourne VIC 3000",
    abn: "51 824 753 561",
    category: "Lash Artist",
    experience: "4 years",
    businessRegistration: "Registered",
    registrationStatus: "Active",
    abuStatus: "Active - 51 824 753 561",
    insuranceType: "Public Liability - $10M",
    insuranceStatus: "Active",
    submittedAt: "Jul 17, 2026",
    verificationStatus: "Under Review",
    statusColor: "text-warning",
    statusBg: "bg-[#FBF0D6]",
    documents: [
      {
        id: 1,
        title: "Driver Licence Front",
        image: "/assets/verification/pic2.jpg",
      },
      {
        id: 2,
        title: "Driver Licence Back",
        image: "/assets/verification/pic3.jpg",
      },
      {
        id: 3,
        title: "Selfie Verification",
        image: "/assets/verification/pic1.jpg",
      },
    ],
    certificates: [],
    verificationChecklist: [
      { label: "ID Verification", completed: true },
      { label: "Selfie Match", completed: true },
      { label: "ABN Check", completed: true },
      { label: "Certificates Review", completed: false },
      { label: "Insurance Verified", completed: false },
    ],
  },
  "VF-3309": {
    id: "VF-3309",
    name: "Charlotte Smith",
    email: "charlotte.smith@beautylab.com",
    phone: "+61 412 903 461",
    initials: "CS",
    avatar: "/assets/verification/pic3.jpg",
    businessName: "Charlotte Beauty Lab",
    businessAddress: "42 Collins St, Melbourne VIC 3000",
    abn: "51 824 753 562",
    category: "Makeup Artist",
    experience: "9 years",
    businessRegistration: "Registered",
    registrationStatus: "Active",
    abuStatus: "Active - 51 824 753 562",
    insuranceType: "Public Liability - $10M",
    insuranceStatus: "Active",
    submittedAt: "Jul 18, 2026",
    verificationStatus: "Pending",
    statusColor: "text-warning",
    statusBg: "bg-[#FBF0D6]",
    documents: [
      {
        id: 1,
        title: "Driver Licence Front",
        image: "/assets/verification/pic2.jpg",
      },
      {
        id: 2,
        title: "Driver Licence Back",
        image: "/assets/verification/pic3.jpg",
      },
      {
        id: 3,
        title: "Selfie Verification",
        image: "/assets/verification/pic1.jpg",
      },
    ],
    certificates: [],
    verificationChecklist: [
      { label: "ID Verification", completed: true },
      { label: "Selfie Match", completed: true },
      { label: "ABN Check", completed: true },
      { label: "Certificates Review", completed: false },
      { label: "Insurance Verified", completed: false },
    ],
  },

  "VF-3310": {
    id: "VF-3310",
    name: "Grace Taylor",
    email: "grace.taylor@hairpro.com",
    phone: "+61 412 903 462",
    initials: "GT",
    avatar: "/assets/verification/pic1.jpg",
    businessName: "Grace Hair Pro",
    businessAddress: "42 Collins St, Melbourne VIC 3000",
    abn: "51 824 753 563",
    category: "Hair Stylist",
    experience: "7 years",
    businessRegistration: "Registered",
    registrationStatus: "Active",
    abuStatus: "Active - 51 824 753 563",
    insuranceType: "Public Liability - $10M",
    insuranceStatus: "Active",
    submittedAt: "Jul 19, 2026",
    verificationStatus: "Approved",
    statusColor: "text-success",
    statusBg: "bg-[#DDF3E7]",
    documents: [
      {
        id: 1,
        title: "Driver Licence Front",
        image: "/assets/verification/pic2.jpg",
      },
      {
        id: 2,
        title: "Driver Licence Back",
        image: "/assets/verification/pic3.jpg",
      },
      {
        id: 3,
        title: "Selfie Verification",
        image: "/assets/verification/pic1.jpg",
      },
    ],
    certificates: [],
    verificationChecklist: [
      { label: "ID Verification", completed: true },
      { label: "Selfie Match", completed: true },
      { label: "ABN Check", completed: true },
      { label: "Certificates Review", completed: true },
      { label: "Insurance Verified", completed: true },
    ],
  },

  "VF-3311": {
    id: "VF-3311",
    name: "Maya Patel",
    email: "maya.patel@nailsbeauty.com",
    phone: "+61 412 903 463",
    initials: "MP",
    avatar: "/assets/verification/pic2.jpg",
    businessName: "Maya Nail Studio",
    businessAddress: "42 Collins St, Melbourne VIC 3000",
    abn: "51 824 753 564",
    category: "Nail Technician",
    experience: "6 years",
    businessRegistration: "Registered",
    registrationStatus: "Active",
    abuStatus: "Active - 51 824 753 564",
    insuranceType: "Public Liability - $10M",
    insuranceStatus: "Active",
    submittedAt: "Jul 20, 2026",
    verificationStatus: "Pending",
    statusColor: "text-warning",
    statusBg: "bg-[#FBF0D6]",
    documents: [
      {
        id: 1,
        title: "Driver Licence Front",
        image: "/assets/verification/pic2.jpg",
      },
      {
        id: 2,
        title: "Driver Licence Back",
        image: "/assets/verification/pic3.jpg",
      },
      {
        id: 3,
        title: "Selfie Verification",
        image: "/assets/verification/pic1.jpg",
      },
    ],
    certificates: [],
    verificationChecklist: [
      { label: "ID Verification", completed: true },
      { label: "Selfie Match", completed: true },
      { label: "ABN Check", completed: true },
      { label: "Certificates Review", completed: false },
      { label: "Insurance Verified", completed: false },
    ],
  },

  "VF-3312": {
    id: "VF-3312",
    name: "Ava Johnson",
    email: "ava.johnson@lashart.com",
    phone: "+61 412 903 464",
    initials: "AJ",
    avatar: "/assets/verification/pic3.jpg",
    businessName: "Ava Lash Art",
    businessAddress: "42 Collins St, Melbourne VIC 3000",
    abn: "51 824 753 565",
    category: "Lash Artist",
    experience: "5 years",
    businessRegistration: "Registered",
    registrationStatus: "Active",
    abuStatus: "Active - 51 824 753 565",
    insuranceType: "Public Liability - $10M",
    insuranceStatus: "Active",
    submittedAt: "Jul 21, 2026",
    verificationStatus: "Rejected",
    statusColor: "text-destructive",
    statusBg: "bg-[#FBE2E2]",
    documents: [
      {
        id: 1,
        title: "Driver Licence Front",
        image: "/assets/verification/pic2.jpg",
      },
      {
        id: 2,
        title: "Driver Licence Back",
        image: "/assets/verification/pic3.jpg",
      },
      {
        id: 3,
        title: "Selfie Verification",
        image: "/assets/verification/pic1.jpg",
      },
    ],
    certificates: [],
    verificationChecklist: [
      { label: "ID Verification", completed: true },
      { label: "Selfie Match", completed: true },
      { label: "ABN Check", completed: false },
      { label: "Certificates Review", completed: false },
      { label: "Insurance Verified", completed: false },
    ],
  },
};

export default function VerificationDetailPage() {
  const params = useParams();
  const id = params.id as string;

  // const [data, setData] = useState<VerificationDetail | null>(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Fetch data based on ID
  //   const verificationData = VERIFICATION_DETAILS[id];
  //   setData(verificationData);
  //   setLoading(false);
  // }, [id]);
  const data = VERIFICATION_DETAILS[id];

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
                  <AvatarFallback className="rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 text-white text-2xl font-bold">
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
                  <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center text-white flex-shrink-0">
                    📄
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-ink truncate">
                      {cert.title}
                    </p>
                    <p className="text-xs text-subtle">{cert.issuedDate}</p>
                  </div>
                  <button className="text-brand-pinkDeep hover:text-brand-pink-deep flex-shrink-0">
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
                        className="text-success flex-shrink-0"
                      />
                    ) : (
                      <AlertCircle
                        size={16}
                        className="text-subtle flex-shrink-0"
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
