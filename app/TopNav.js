"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { lessons } from "../src/data/lessons";

const PROGRESS_KEY = "quantum-quiz-progress";

function loadProgress() {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export default function TopNav() {
  const pathname = usePathname();
  const router = useRouter();

  const totalTests = lessons.length || 50;
  const [completedCount, setCompletedCount] = useState(0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    function refresh() {
      const progress = loadProgress();
      let completed = 0;

      for (const lesson of lessons) {
        // Use id as the main key; fall back to slug if you ever add it
        const key = lesson.id || lesson.slug;
        if (!key) continue;

        const p = progress[key];
        if (p && p.isPerfect) {
          completed += 1;
        }
      }

      setCompletedCount(completed);
      const pctRaw = (completed / totalTests) * 100;
      const pct = Math.round(pctRaw); // 50 tests → 2% per completed test
      setPercent(pct);
    }

    refresh();

    if (typeof window !== "undefined") {
      window.addEventListener("quiz-progress-updated", refresh);
      return () =>
        window.removeEventListener("quiz-progress-updated", refresh);
    }
  }, [totalTests]);

  const testsLabel = `TESTS COMPLETED ${completedCount}/${totalTests} (${percent}%)`;
  const barWidth = `${percent}%`;

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/lessons", label: "Lessons" },
    { href: "/playground", label: "Playground" },
    { href: "/my-tests", label: "My tests" },
    { href: "/certificate", label: "Certificate" }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-900 bg-slate-950/90 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Left: logo */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2"
        >
          <div className="h-7 w-7 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold text-white">
            Q
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">Learn Quantum</span>
            <span className="text-sm font-semibold text-slate-50">
              QuantumOS
            </span>
          </div>
        </button>

        {/* Middle: nav pills */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "px-3 py-1.5 rounded-full text-xs font-medium transition",
                  active
                    ? "bg-slate-100 text-slate-900"
                    : "bg-slate-900 text-slate-200 hover:bg-slate-800"
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: tests progress */}
        <div className="flex flex-col items-end gap-1 min-w-[190px]">
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
            {testsLabel}
          </span>
          <div className="w-44 h-2 rounded-full bg-slate-900 overflow-hidden">
            <div
              className="h-full bg-indigo-400 transition-all duration-300"
              style={{ width: barWidth }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
