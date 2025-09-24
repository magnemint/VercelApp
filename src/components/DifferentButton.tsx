"use client";

import React from "react";
import Link from "next/link";

export default function DifferentButton({
  href = "#",
  children = "What makes us different",
  className = "",
}: {
  href?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="relative inline-block group">
      {/* Gradient border layer */}
      <span className="absolute inset-0 rounded-full p-[3px] pointer-events-none z-0 overflow-hidden">
        <span className="block w-full h-full rounded-full opacity-90 animate-gradient-reveal group-hover:animate-gradient-spin bg-[conic-gradient(at_center,_#a1e8af,_#8b5cf6,_#f472b6,_#34d399,_#a1e8af)]" />
      </span>

      <Link
        href={href}
        className="relative z-10 inline-flex items-center px-6 py-3 rounded-full bg-[#0b0b0d]/80 border border-white/10 text-[#F8E5EE] font-semibold shadow-lg hover:scale-[1.02] transition-transform backdrop-blur-md"
        aria-label="What makes us different"
      >
        <span>{children}</span>
      </Link>
    </div>
  );
}
