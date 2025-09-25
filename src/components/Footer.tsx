"use client";

import Link from "next/link";
import Image from "next/image";
import { SiX, SiDiscord, SiInstagram, SiYoutube } from "react-icons/si";
import React from "react";

export default function Footer() {
  return (
    <footer className="relative bg-black text-slate-100">
      {/* Decorative background blobs (optional) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
        style={{
          background:
            "radial-gradient(600px 600px at 10% 20%, rgba(99,102,241,0.08), transparent), radial-gradient(400px 400px at 90% 80%, rgba(139,92,246,0.06), transparent)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-[2000px] mx-auto px-6 py-20">
        {/* Floating glass card */}
        <div
          className="mx-auto max-w-7xl -mb-10 transform -translate-y-8 rounded-3xl border border-white/6 bg-white/6 backdrop-blur-md shadow-2xl shadow-black/40"
          style={{ overflow: "hidden" }}
        >
          {/* Inner padding/content area with slight inner gradient to add depth */}
          <div className="px-6 py-10 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-start">
              {/* Brand & short pitch */}
              <div className="md:col-span-4">
                <Link href="/" className="flex items-center gap-3 group">
                  <div className="relative w-11 h-11 rounded-2xl overflow-hidden bg-white/5 flex items-center justify-center">
                    <Image
                      src="/destiny-ip/destiny_aligned.png"
                      alt=""
                      width={60}
                      height={60}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-semibold tracking-tight text-slate-50">
                      Destiny Organisation
                    </p>
                    <p className="text-sm text-slate-300/80">Insert slogan here ig</p>
                  </div>
                </Link>

                <p className="mt-6 text-slate-300 text-sm leading-relaxed">
                  We build clean software and interfaces that people enjoy. Follow our updates or reach out —
                  we reply fast (maybe).
                </p>

                {/* Social icons (prominent) */}
                <div className="mt-6 flex items-center gap-3">
                  <SocialIcon href="https://x.com/destinyorg_" label="X">
                    <SiX size={18} />
                  </SocialIcon>
                  <SocialIcon
                    href="https://www.instagram.com/destiny.organisation/"
                    label="Instagram"
                  >
                    <SiInstagram size={18} />
                  </SocialIcon>
                  <SocialIcon href="https://www.youtube.com/@destinyorganisation" label="YouTube">
                    <SiYoutube size={18} />
                  </SocialIcon>
                  <SocialIcon href="https://discord.gg/yourhandle" label="Discord - Coming soon.">
                    <SiDiscord size={18} />
                  </SocialIcon>
                </div>
              </div>

              {/* Nav columns */}
              <div className="md:col-span-5 grid grid-cols-2 gap-6 md:gap-8 pl-20">
                <NavColumn heading="Product">
                  <NavLink href="/features">Features</NavLink>
                  <NavLink href="/pricing">Pricing</NavLink>
                  <NavLink href="/docs">Docs</NavLink>
                  <NavLink href="/status">Status</NavLink>
                </NavColumn>

                <NavColumn heading="Company">
                  <NavLink href="/about">About</NavLink>
                  <NavLink href="/careers">Careers</NavLink>
                  <NavLink href="/press">Press</NavLink>
                  <NavLink href="/contact">Contact</NavLink>
                </NavColumn>
              </div>

              {/* CTA / Newsletter */}
              <div className="md:col-span-3">
                <h4 className="text-sm font-semibold">Stay in the loop</h4>
                <p className="mt-2 text-slate-300 text-sm">A short newsletter, twice a month. No spam.</p>

                <form
                  className="mt-4 flex w-full gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Subscribe action placeholder — wire this to your API");
                  }}
                >
                  <label htmlFor="footer-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    required
                    placeholder="you@domain.com"
                    className="flex-1 min-w-0 rounded-md border border-white/10 bg-white/3 px-3 py-2 text-sm placeholder:text-slate-200/60 text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                  />

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-indigo-500 to-violet-500 px-3 py-2 text-sm font-medium text-white shadow-md hover:transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
                    aria-label="Subscribe"
                  >
                    <span>Join</span>
                  </button>
                </form>

                <p className="mt-3 text-xs text-slate-200/70">We’ll always respect your inbox. Unsubscribe anytime.</p>
              </div>
            </div>

            {/* Divider */}
            <div className="mt-10 border-t border-white/6 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <p className="text-sm text-slate-200/70">
                © 2025-{new Date().getFullYear()} Destiny Organisation. All rights reserved.
              </p>

              <div className="flex items-center gap-4">
                <Link href="/terms" className="text-sm text-slate-200/80 hover:underline">
                  Terms
                </Link>
                <Link href="/privacy" className="text-sm text-slate-200/80 hover:underline">
                  Privacy
                </Link>
                <Link href="/sitemap" className="text-sm text-slate-200/80 hover:underline">
                  Sitemap
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* End glass card */}
      </div>
    </footer>
  );
}

/* ----------------------
   Small subcomponents
   ---------------------- */

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-white/3 hover:bg-white/8 focus:bg-white/8 transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <span className="sr-only">{label}</span>
      <span className="inline-flex" aria-hidden>
        {children}
      </span>
    </a>
  );
}

function NavColumn({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-slate-50">{heading}</h4>
      <ul className="mt-3 space-y-2 text-slate-200/80 text-sm">
        {React.Children.map(children, (child) => (
          <li>{child}</li>
        ))}
      </ul>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="hover:text-white transition-colors">
      {children}
    </Link>
  );
}
