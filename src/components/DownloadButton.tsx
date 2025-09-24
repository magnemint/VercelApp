"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

interface DownloadButtonProps {
  href?: string;
  className?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  href = "#",
  className = "",
}) => {
  const [os, setOs] = useState<"Mac" | "Windows" | "Other">("Other");

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const userAgent =
        navigator.userAgent || navigator.vendor || (window as any).opera;
      if (/Mac/i.test(userAgent)) setOs("Mac");
      else if (/Win/i.test(userAgent)) setOs("Windows");
      else setOs("Other");
    }
  }, []);

  const buttonText =
    os === "Mac"
      ? "Download for Mac"
      : os === "Windows"
      ? "Download for Windows"
      : "App isn’t available yet";

  return (
    <a
      href={href}
      aria-label={buttonText}
      className={`liquid-btn relative z-10 inline-flex items-center justify-center whitespace-nowrap px-8 py-4 min-w-[260px] text-lg font-semibold rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 border-t-white/40 border-b-white/10 shadow-lg shadow-black/30 hover:scale-105 transition-transform overflow-hidden ${className}`}
    >
      {/* Button content */}
      <span className="liquid-btn__content flex items-center gap-3 relative z-10">
        {buttonText}
        {os !== "Other" && <ArrowUpRight className="icon" size={18} />}
      </span>

      {/* Hover sweep animation */}
      <span
        className="liquid-btn__sweep absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-40 pointer-events-none transition-transform duration-300"
        aria-hidden="true"
      />
    </a>
  );
};

export default DownloadButton;
