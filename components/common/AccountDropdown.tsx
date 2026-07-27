"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function AccountDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2.5"
      >
        <div className="w-9 h-9 rounded-full bg-brand-gradient flex items-center justify-center text-white text-xs font-bold">
          AO
        </div>

        <div className="text-left">
          <p className="text-xs font-bold text-ink leading-none">
            Alex O&apos;Brien
          </p>
          <p className="text-[10px] text-subtle mt-1">
            Super Admin
          </p>
        </div>

        <ChevronDown
          size={14}
          className={`text-subtle transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>


      {open && (
        <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-xl border border-hairline z-50 overflow-hidden">

          <div className="p-4 border-b border-hairline">
            <p className="text-sm font-bold text-ink">
              Alex O&apos;Brien
            </p>

            <p className="text-xs text-subtle mt-1">
              alex@memillennial.com
            </p>

            <span className="inline-block mt-2 text-[10px] font-bold px-3 py-1 rounded-full bg-accent text-brand-pinkDeep">
              Super Admin
            </span>
          </div>


          {/* <div className="p-2">
            {[
              "My Profile",
              "Account Settings",
              "Change Password",
              "Activity Log",
            ].map((item)=>(
              <button
                key={item}
                className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-ink hover:bg-muted"
              >
                {item}
              </button>
            ))}
          </div> */}


          <div className="border-t border-hairline p-2">
            <button
              onClick={()=>{
                localStorage.clear();
                window.location.href="/login";
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
              "
            >
              Logout
            </button>
          </div>

        </div>
      )}

    </div>
  );
}