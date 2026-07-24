"use client";

import { useState, ChangeEvent, useEffect } from "react";
import {
  ChevronDown,
  Pencil,
  Building2,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Check,
  Upload,
  User,
  UserPlus,
} from "lucide-react";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function AdminProfilePage() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  // const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  // const [adminData, setAdminData] = useState({
  //   name: "",
  //   email: "",
  //   phone: "",
  //   department: "",
  // });
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  // const [passwordData, setPasswordData] = useState({
  //   currentPassword: "",
  //   newPassword: "",
  //   confirmPassword: "",
  // });

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleAction = (action: string, message: string) => {
    setLoadingAction(action);
    setSuccessMessage(null);

    setTimeout(() => {
      setLoadingAction(null);
      setSuccessMessage(message);

      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }, 2000);
  };
  // const handleAdminChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setAdminData({
  //     ...adminData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setPasswordData({
  //     ...passwordData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      //setProfileImage(file);

      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  return (
    <div className="flex-1 bg-muted/40 min-h-screen w-full">
      {successMessage && (
        <div className="fixed top-5 right-5 z-100">
          <div className="flex items-center gap-2 bg-white border border-green-200 shadow-lg rounded-xl px-4 py-3">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
              <Check size={14} className="text-green-600" />
            </div>

            <p className="text-sm font-semibold text-ink">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Top bar */}
      <div className="w-full flex items-center justify-between bg-white border-b border-hairline px-8 py-4">
        {" "}
        <div>
          <h1 className="text-xl font-extrabold text-ink">Admin Profile</h1>
          <p className="text-xs text-subtle mt-0.5">
            Dashboard <span className="mx-1">›</span>
            <span className="text-brand-pinkDeep font-semibold">Profile</span>
          </p>
        </div>
        {/* <div className="flex items-center gap-5">
          <button className="relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-muted transition-colors">
            <Bell size={18} className="text-ink/70" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
          </button>

          <button className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-brand-gradient flex items-center justify-center text-white text-xs font-bold">
              AO
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-ink leading-none">
                Alex O&apos;Brien
              </p>
              <p className="text-[10px] text-subtle mt-1">Super Admin</p>
            </div>
            <ChevronDown size={14} className="text-subtle" />
          </button>
        </div> */}
        <div className="relative">
          <button
            onClick={() => setShowAccountMenu((prev) => !prev)}
            className="flex items-center gap-2.5"
          >
            <div className="w-9 h-9 rounded-full bg-brand-gradient flex items-center justify-center text-white text-xs font-bold">
              AO
            </div>

            <div className="text-left">
              <p className="text-xs font-bold text-ink leading-none">
                Alex O&apos;Brien
              </p>

              <p className="text-[10px] text-subtle mt-1">Super Admin</p>
            </div>

            <ChevronDown
              size={14}
              className={`text-subtle transition-transform ${
                showAccountMenu ? "rotate-180" : ""
              }`}
            />
          </button>

          {showAccountMenu && (
            <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-xl border border-hairline z-50 overflow-hidden">
              {/* User info */}
              <div className="p-4 border-b border-hairline">
                <p className="text-sm font-bold text-ink">Alex O&apos;Brien</p>

                <p className="text-xs text-subtle mt-1">
                  alex@memillennial.com
                </p>

                <span className="inline-block mt-2 text-[10px] font-bold px-3 py-1 rounded-full bg-accent text-brand-pinkDeep">
                  Super Admin
                </span>
              </div>

              {/* Menu */}
              <div className="p-2">
                <AccountMenuItem
                  label="My Profile"
                  onClick={() => {
                    setShowAccountMenu(false);
                  }}
                />

                <AccountMenuItem
                  label="Account Settings"
                  onClick={() => {
                    setShowAccountMenu(false);
                  }}
                />

                <AccountMenuItem
                  label="Change Password"
                  onClick={() => {
                    setShowAccountMenu(false);
                  }}
                />

                <AccountMenuItem
                  label="Activity Log"
                  onClick={() => {
                    setShowAccountMenu(false);
                  }}
                />
              </div>

              {/* Logout */}
              <div className="border-t border-hairline p-2">
                <button
                  onClick={() => {
                    localStorage.clear();

                    window.location.href = "/login";
                  }}
                  className="
          w-full
          text-left
          px-3
          py-2.5
          rounded-xl
          text-xs
          font-bold
          text-red-500
          hover:bg-red-50
          transition
          "
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full p-8 space-y-6">
        {/* Profile summary card */}
        <div className="bg-white rounded-2xl border border-hairline p-6 flex items-center justify-between shadow-soft">
          <div className="flex items-center gap-5">
            <div className="relative">
              <Image
                src={imagePreview || "/assets/verification/pic1.jpg"}
                alt="Sophia Carter"
                width={80}
                height={80}
                className="w-20 h-20 rounded-2xl object-cover"
              />
              <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
            </div>

            <div>
              <h2 className="text-lg font-extrabold text-ink">Sophia Carter</h2>
              <p className="text-xs text-subtle mb-2">ID: ADM-2024-0042</p>
              <span className="inline-block text-[11px] font-bold text-brand-pinkDeep bg-accent rounded-full px-3 py-1">
                Super Admin
              </span>

              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <Building2 size={15} className="text-subtle" />
                  <div>
                    <p className="text-[10px] text-subtle leading-none">
                      Department
                    </p>
                    <p className="text-xs font-semibold text-ink mt-1">
                      Operations
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Mail size={15} className="text-subtle" />
                  <div>
                    <p className="text-[10px] text-subtle leading-none">
                      Email
                    </p>
                    <p className="text-xs font-semibold text-ink mt-1">
                      sophia@memillennial.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Phone size={15} className="text-subtle" />
                  <div>
                    <p className="text-[10px] text-subtle leading-none">
                      Phone
                    </p>
                    <p className="text-xs font-semibold text-ink mt-1">
                      +1 (212) 555-0198
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowEditModal(true)}
            className="flex items-center gap-2 bg-brand-gradient text-white text-xs font-bold rounded-full px-4 py-2.5 shadow-soft shrink-0"
          >
            <Pencil size={14} />
            Edit Profile
          </button>
        </div>
        {/* Bottom grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Update Password */}
          <div className="bg-white rounded-2xl border border-hairline p-6 shadow-soft">
            <h3 className="text-sm font-extrabold text-ink mb-5">
              Update Password
            </h3>

            <div className="space-y-4">
              <PasswordField
                label="Current Password"
                placeholder="Enter current password"
                show={showCurrent}
                onToggle={() => setShowCurrent((v) => !v)}
              />
              <PasswordField
                label="New Password"
                placeholder="Enter new password"
                show={showNew}
                onToggle={() => setShowNew((v) => !v)}
              />

              <div className="bg-muted rounded-xl p-4">
                <p className="text-xs font-bold text-ink mb-3">
                  Password Requirements
                </p>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                  <Requirement label="Minimum 8 characters" />
                  <Requirement label="Uppercase letter (A-Z)" />
                  <Requirement label="Lowercase letter (a-z)" />
                  <Requirement label="Number (0-9)" />
                  <Requirement label="Special character (!@#...)" />
                </div>
              </div>

              <PasswordField
                label="Confirm New Password"
                placeholder="Confirm new password"
                show={showConfirm}
                onToggle={() => setShowConfirm((v) => !v)}
              />
            </div>

            <div className="flex items-center gap-4 mt-6">
              <LoadingButton
                loading={loadingAction === "password"}
                onClick={() =>
                  handleAction("password", "Password updated successfully!")
                }
                className="bg-brand-gradient text-white text-xs font-bold rounded-full px-6 py-2.5 shadow-soft"
              >
                Save
              </LoadingButton>
              <button className="text-xs font-semibold text-subtle">
                Cancel
              </button>
            </div>
          </div>

          {/* Admin Information */}
          <div className="bg-white rounded-2xl border border-hairline p-6 shadow-soft">
            <h3 className="text-sm font-extrabold text-ink mb-5">
              Admin Information
            </h3>

            <div className="flex items-center gap-4 pb-5 mb-5 border-b border-hairline">
              <label className="relative w-16 h-16 rounded-xl border-2 border-dashed border-brand-pink/50 overflow-hidden flex items-center justify-center text-brand-pinkDeep shrink-0 cursor-pointer">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    className="w-full h-full object-cover"
                    alt="preview"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <Upload size={16} />
                    <span className="text-[9px] font-bold">Upload</span>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </label>
              <div>
                <p className="text-xs font-semibold text-ink">
                  Upload a clear profile photo
                </p>
                <p className="text-[11px] text-subtle mt-0.5">
                  JPG, PNG — max 5MB
                </p>
                <p className="text-[11px] text-subtle">
                  Recommended: 400×400px
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Field
                label="Full Name *"
                placeholder="e.g. Marcus Thompson"
                icon={<User size={15} className="text-subtle" />}
              />
              <Field
                label="Email Address *"
                placeholder="marcus@memillennial.com"
                icon={<Mail size={15} className="text-subtle" />}
              />
              <Field
                label="Phone Number"
                placeholder="+1 (212) 555-xxxx"
                icon={<Phone size={15} className="text-subtle" />}
              />
            </div>

            <div className="flex items-center gap-4 mt-6">
              <LoadingButton
                loading={loadingAction === "create-admin"}
                onClick={() =>
                  handleAction("create-admin", "Admin created successfully!")
                }
                icon={<UserPlus size={14} />}
                className="bg-brand-gradient text-white text-xs font-bold rounded-full px-6 py-2.5 shadow-soft"
              >
                Create Admin
              </LoadingButton>
              <button className="text-xs font-semibold text-subtle">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-extrabold text-ink">Edit Profile</h2>

              <button
                onClick={() => setShowEditModal(false)}
                className="text-subtle hover:text-ink text-xl"
              >
                ×
              </button>
            </div>

            {/* Profile Fields */}
            <div className="space-y-4">
              <Field
                label="Full Name *"
                placeholder="Sophia Carter"
                icon={<User size={15} className="text-subtle" />}
              />

              <Field
                label="Email Address *"
                placeholder="sophia@memillennial.com"
                icon={<Mail size={15} className="text-subtle" />}
              />

              <Field
                label="Phone Number"
                placeholder="+1 (212) 555-0198"
                icon={<Phone size={15} className="text-subtle" />}
              />

              <div>
                <label className="text-xs font-semibold text-ink block mb-1.5">
                  Department
                </label>

                <div className="relative">
                  <Building2
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-subtle"
                  />

                  <input
                    placeholder="Operations"
                    className="w-full text-xs rounded-xl border border-hairline pl-9 pr-3 py-2.5 outline-none focus:border-brand-pink"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="text-xs font-semibold text-subtle px-5 py-2"
              >
                Cancel
              </button>

              <LoadingButton
                loading={loadingAction === "save-profile"}
                onClick={() =>
                  handleAction("save-profile", "Profile updated successfully!")
                }
                className="bg-brand-gradient text-white text-xs font-bold rounded-full px-6 py-2.5 shadow-soft"
              >
                Save Changes
              </LoadingButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PasswordField({
  label,
  placeholder,
  show,
  onToggle,
}: {
  label: string;
  placeholder: string;
  show: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-ink block mb-1.5">
        {label}
      </label>
      <div className="relative">
        <Lock
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-subtle"
        />
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className="w-full text-xs rounded-xl border border-hairline pl-9 pr-10 py-2.5 outline-none focus:border-brand-pink placeholder:text-subtle"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-subtle"
        >
          {show ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
    </div>
  );
}

function Requirement({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-3.5 h-3.5 rounded-full border border-subtle/50 flex items-center justify-center">
        <Check size={9} className="text-subtle/0" />
      </span>
      <span className="text-[11px] text-subtle">{label}</span>
    </div>
  );
}

function Field({
  label,
  placeholder,
  icon,
}: {
  label: string;
  placeholder: string;
  icon: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-ink block mb-1.5">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</span>
        <input
          placeholder={placeholder}
          className="w-full text-xs rounded-xl border border-hairline pl-9 pr-3 py-2.5 outline-none focus:border-brand-pink placeholder:text-subtle"
        />
      </div>
    </div>
  );
}

function LoadingButton({
  loading,
  onClick,
  children,
  className = "",
  icon,
}: {
  loading: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`${className} flex items-center justify-center gap-2 disabled:opacity-70`}
    >
      {loading && <Loader2 size={14} className="animate-spin" />}
      {!loading && icon}
      {loading ? "Processing..." : children}
    </button>
  );
}

function AccountMenuItem({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="
      w-full
      text-left
      px-3
      py-2.5
      rounded-xl
      text-xs
      font-semibold
      text-ink
      hover:bg-muted
      transition
      "
    >
      {label}
    </button>
  );
}
