"use client";

import { useEffect } from "react";

export default function ClientLoaded() {
  useEffect(() => {
    const onLoad = () => document.documentElement.classList.add("site-loaded");
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);
  return null;
}
