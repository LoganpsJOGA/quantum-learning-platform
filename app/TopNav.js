"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { lessons } from "../src/data/lessons";

const TOTAL_TESTS = 50; // total number of quizzes/lessons

export default function TopNav() {
  const pathname = usePathname();
  const [completedCount, setCompletedCount] = useState(0);

  // Load quiz completion from localStorage
  useEffect(() => {
    function loadProgress() {
      try {
        const raw = localStorage.getItem("quizProgress");
        if (!raw) {
          setCompletedCount(0);
          return;
        }
        const progress = JSON.parse(raw);

        const done = Object.values(progress).filter(
          (entry) => entry && entry.completed
        ).length;

        setCompletedCount(done);
      } catch (e) {
        console.error("Failed to read quiz progress", e);
        setCompletedCount(0);
      }
    }

    loadProgress();
    window.addEventListener("storage", loadProgress);
    return () => window.removeEventListener("storage", loadProgress);
  }, []);

  const percent = TOTAL_TESTS ? (completedCount / TOTAL_TESTS) * 100 : 0;

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/lessons", label: "Lessons" },
    { href: "/playground", label: "Playground" },
    { href: "/my-tests", label: "My tests" },
    { href: "/certificate", label: "Certificate" }
  ];

  return (
    <header className="w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Left: logo + nav */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold">
              Q
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xs text-slate-400">Learn Quantum</span>
              <span className="text-sm font-semibold text-slate-50">
                QuantumOS
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-3">
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    active
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-900 text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: tests completed bar */}
        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-300 whitespace-nowrap">
            TESTS COMPLETED{" "}
            <span className="font-semibold">
              {completedCount}/{TOTAL_TESTS}
            </span>{" "}
            ({percent.toFixed(0)}%)
          </div>
          <div className="w-40 h-3 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-indigo-500 transition-all"
              style={{ width: `${Math.min(percent, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
