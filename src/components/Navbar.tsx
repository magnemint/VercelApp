"use client";

import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const hoverCloseTimeout = useRef<number | null>(null);
  const CLOSE_TIMEOUT_MS = 220;

  const titleVariant: Variants = {
    closed: { opacity: 0, y: -8 },
    open: { opacity: 1, y: 0, transition: { duration: 0.18 } },
  };

  const itemVariants: Variants = {
    closed: { opacity: 0, y: -6 },
    open: { opacity: 1, y: 0, transition: { duration: 0.12 } },
  };

  const columnsContainerVariants: Variants = {
    closed: {},
    open: {
      transition: {
        delayChildren: 0.12,
        staggerChildren: 0.06,
      },
    },
  };

  function clearHoverTimeout() {
    if (hoverCloseTimeout.current) {
      window.clearTimeout(hoverCloseTimeout.current);
      hoverCloseTimeout.current = null;
    }
  }

  function scheduleClose() {
    clearHoverTimeout();
    hoverCloseTimeout.current = window.setTimeout(
      () => setDropdownOpen(false),
      CLOSE_TIMEOUT_MS
    );
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setDropdownOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => () => clearHoverTimeout(), []);

  // layout values
  const TOPBAR_PX = 56;
  const BOTTOM_GAP_PX = 40;
  const MAX_OVERLAY_CAP_PX = 420;

  const bgAlpha = 0.5;
  const blurPx = 8;
  const bgColor = `rgba(0,0,0,${bgAlpha})`;

  const contentRef = useRef<HTMLDivElement | null>(null);
  const [measuredContentPx, setMeasuredContentPx] = useState<number>(200);

  useLayoutEffect(() => {
    if (!contentRef.current) return;
    const el = contentRef.current;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      setMeasuredContentPx(Math.ceil(rect.height));
    };

    measure();

    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [contentRef.current]);

  const overlayMaxPx = Math.min(
    measuredContentPx + BOTTOM_GAP_PX,
    MAX_OVERLAY_CAP_PX
  );
  const totalBgPx = TOPBAR_PX + overlayMaxPx;

  const closedClip = `inset(0px 0px ${overlayMaxPx}px 0px)`;
  const openClip = `inset(0px 0px 0px 0px)`;

  return (
    <nav className="sticky top-0 z-50">
      <div className="relative">
        {/* Background overlay */}
        <motion.div
          aria-hidden
          initial={{ clipPath: closedClip }}
          animate={{ clipPath: dropdownOpen ? openClip : closedClip }}
          transition={{ duration: 0.28, ease: [0.2, 0.9, 0.3, 1] }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: `${totalBgPx}px`,
            zIndex: 30,
            backgroundColor: bgColor,
            backdropFilter: `blur(${blurPx}px)`,
            WebkitBackdropFilter: `blur(${blurPx}px)`,
            willChange: "clip-path, backdrop-filter",
            transform: "translateZ(0)",
            pointerEvents: dropdownOpen ? "auto" : "none",
          }}
          onMouseEnter={() => {
            clearHoverTimeout();
            setDropdownOpen(true);
          }}
          onMouseLeave={scheduleClose}
        >
          <div style={{ height: `${TOPBAR_PX}px` }} />

          <div style={{ overflow: "hidden" }}>
            <div ref={contentRef} className="max-w-7xl mx-auto px-6 py-4">
              <motion.h3
                variants={titleVariant}
                initial="closed"
                animate={dropdownOpen ? "open" : "closed"}
                transition={{ delay: dropdownOpen ? 0.02 : 0, duration: 0.18 }}
                className="text-gray-400 font-semibold text-xs mb-3"
              >
                Explore Destiny
              </motion.h3>

              <motion.div
                variants={columnsContainerVariants}
                initial="closed"
                animate={dropdownOpen ? "open" : "closed"}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-gray-300"
              >
                {/* Columns */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-white font-semibold mb-2">Tools</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/persona" className="block hover:text-red-400 transition">
                        Persona
                      </Link>
                    </li>
                    <li>
                      <Link href="/research/embeddings" className="block hover:text-red-400 transition">
                        Carbon Interface
                      </Link>
                    </li>
                    <li>
                      <Link href="/research/codex" className="block hover:text-red-400 transition">
                        Carbon Notes
                      </Link>
                    </li>
                  </ul>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-white font-semibold mb-2">Data</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/research/datasets" className="block hover:text-red-400 transition">
                        Datasets
                      </Link>
                    </li>
                    <li>
                      <Link href="/research/models" className="block hover:text-red-400 transition">
                        Models
                      </Link>
                    </li>
                  </ul>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-white font-semibold mb-2">Use Cases</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/research/chatbots" className="block hover:text-red-400 transition">
                        Chatbots
                      </Link>
                    </li>
                    <li>
                      <Link href="/research/assistants" className="block hover:text-red-400 transition">
                        Assistants
                      </Link>
                    </li>
                  </ul>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-white font-semibold mb-2">More</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/blog" className="block hover:text-red-400 transition">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link href="/about" className="block hover:text-red-400 transition">
                        About
                      </Link>
                    </li>
                  </ul>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Top bar */}
        <div
          className="relative z-50 w-full"
          style={{ height: `${TOPBAR_PX}px`, backgroundColor: "transparent" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <div className="flex items-center justify-between h-full">
              <Link href="/" className="flex items-center">
                <motion.img
                  src="/destiny-ip/destiny.png"
                  alt="Logo"
                  className="w-[40px] h-[40px] object-contain"
                  whileHover={{ scale: 1.03, filter: "drop-shadow(0 0 20px rgba(255,0,0,0.8))" }}
                  transition={{ duration: 0.45, ease: [0.2, 0.9, 0.3, 1] }}
                />
              </Link>

              <div className="hidden md:flex items-center space-x-8 text-gray-300 select-none">
                <div
                  className="relative"
                  onMouseEnter={() => {
                    clearHoverTimeout();
                    setDropdownOpen(true);
                  }}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    className="px-2 py-1 text-sm font-medium hover:text-white transition-colors"
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen}
                    onClick={() => setDropdownOpen((s) => !s)}
                  >
                    Products
                  </button>
                </div>

                <Link href="/blog" className="text-sm hover:text-white transition-colors">
                  Documentation
                </Link>
                <Link href="/about" className="text-sm hover:text-white transition-colors">
                  Business
                </Link>
              </div>

              <div className="hidden md:flex">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:border-gray-400 hover:bg-gray-800 hover:text-white transition"
                >
                  Sign in
                </Link>
              </div>

              <button
                className="md:hidden p-1.5 rounded-md hover:bg-gray-800 text-gray-300"
                onClick={() => setOpen((s) => !s)}
                aria-label="Toggle menu"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="md:hidden"
              style={{
                backgroundColor: bgColor,
                backdropFilter: `blur(${blurPx}px)`,
                WebkitBackdropFilter: `blur(${blurPx}px)`,
                zIndex: 60,
              }}
            >
              <div className="px-4 py-3 space-y-2 text-gray-300">
                <Link href="/research" className="block hover:text-white">
                  Research
                </Link>
                <Link href="/blog" className="block hover:text-white">
                  Blog
                </Link>
                <Link href="/api" className="block hover:text-white">
                  API
                </Link>
                <Link href="/about" className="block hover:text-white">
                  About
                </Link>
                <Link
                  href="/login"
                  className="block px-4 py-2 rounded-full border border-gray-600 hover:border-gray-400 hover:bg-gray-800 hover:text-white transition text-center"
                >
                  Sign in
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
