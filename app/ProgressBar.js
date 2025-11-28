"use client";

import { useEffect, useState } from "react";
import { lessons } from "../src/data/lessons";

const STORAGE_KEY = "qc_test_progress_v1";
const TOTAL_TESTS = lessons.length;

function loadProgress() {
  if (typeof window === "undefined") {
    return { attempted: [], completed: [] };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { attempted: [], completed: [] };
    const parsed = JSON.parse(raw);
    return {
      attempted: Array.isArray(parsed.attempted) ? parsed.attempted : [],
      completed: Array.isArray(parsed.completed) ? parsed.completed : [],
    };
  } catch {
    return { attempted: [], completed: [] };
  }
}

export default function ProgressBar() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    function updateFromStorage() {
      const { completed } = loadProgress();
      const pct =
        TOTAL_TESTS === 0 ? 0 : Math.round((completed.length / TOTAL_TESTS) * 100);
      setPercent(pct);
    }

    updateFromStorage();

    const handler = () => updateFromStorage();
    window.addEventListener("storage", handler);
    window.addEventListener("qc-progress-updated", handler);

    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("qc-progress-updated", handler);
    };
  }, []);

  return (
    <div className="flex items-center gap-3 text-xs text-slate-300">
      <span className="whitespace-nowrap">Tests completed:</span>
      <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden max-w-[180px]">
        <div
          className="h-full bg-indigo-500 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="w-10 text-right">{percent}%</span>
    </div>
  );
}
