"use client";

import { useEffect, useState } from "react";
import TopNav from "../TopNav";
import { lessons } from "../../src/data/lessons";

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

function saveProgress(progress) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    window.dispatchEvent(new Event("quiz-progress-updated"));
  } catch {
    // ignore
  }
}

export default function MyTestsPage() {
  const [progress, setProgress] = useState({});

  useEffect(() => {
    function refresh() {
      setProgress(loadProgress());
    }

    refresh();

    if (typeof window !== "undefined") {
      window.addEventListener("quiz-progress-updated", refresh);
      return () =>
        window.removeEventListener("quiz-progress-updated", refresh);
    }
  }, []);

  const attempted = [];
  const completed = [];
  const notAttempted = [];

  for (const lesson of lessons) {
    const key = lesson.id || lesson.slug;
    if (!key) continue;

    const p = progress[key];

    if (p && p.isPerfect) {
      completed.push({ lesson, p });
    } else if (p && (p.attempts ?? 0) > 0) {
      attempted.push({ lesson, p });
    } else {
      notAttempted.push({ lesson, p: null });
    }
  }

  function renderList(items, emptyLabel) {
    if (items.length === 0) {
      return (
        <p className="text-xs text-slate-500 italic mt-2">{emptyLabel}</p>
      );
    }

    return (
      <ul className="mt-2 space-y-1 max-h-[400px] overflow-y-auto pr-1">
        {items.map(({ lesson, p }) => (
          <li
            key={lesson.id || lesson.slug}
            className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs flex items-center justify-between gap-2"
          >
            <div>
              <div className="font-medium text-slate-50">
                {lesson.title || lesson.name || lesson.id || lesson.slug}
              </div>
              {p && (
                <div className="text-[11px] text-slate-400">
                  Attempts: {p.attempts ?? 0}
                  {typeof p.lastScore === "number" &&
                    typeof p.totalQuestions === "number" &&
                    ` • Last score: ${p.lastScore}/${p.totalQuestions}`}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    );
  }

  function handleResetAll() {
    if (typeof window === "undefined") return;
    if (!confirm("Reset all quiz progress? This cannot be undone.")) return;
    localStorage.removeItem(PROGRESS_KEY);
    saveProgress({});
    setProgress({});
  }

  return (
    <>
      <TopNav />
      <main className="min-h-screen bg-slate-950 text-slate-50">
        <div className="max-w-6xl mx-auto px-4 pt-16 pb-24">
          <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold mb-2">My tests</h1>
              <p className="text-sm text-slate-300 max-w-2xl">
                After you take a quiz once, it moves out of{" "}
                <span className="font-semibold">Not attempted</span>. If you
                haven&apos;t earned a 3/3 yet, it shows under{" "}
                <span className="font-semibold">Attempted tests</span>. When you
                get a perfect 3/3 score, it moves into{" "}
                <span className="font-semibold">Completed tests</span> and locks.
              </p>
            </div>

            <button
              type="button"
              onClick={handleResetAll}
              className="self-start px-3 py-1.5 rounded-full border border-slate-700 text-[11px] text-slate-300 hover:bg-slate-900"
            >
              Reset all quiz progress
            </button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Attempted */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <h2 className="text-sm font-semibold mb-1">Attempted tests</h2>
              <p className="text-[11px] text-slate-400">
                Quizzes you&apos;ve tried but haven&apos;t yet completed with a
                3/3 score.
              </p>
              {renderList(attempted, "No attempted tests yet.")}
            </section>

            {/* Not attempted */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <h2 className="text-sm font-semibold mb-1">Not attempted</h2>
              <p className="text-[11px] text-slate-400">
                Lessons that still don&apos;t have any quiz attempts.
              </p>
              {renderList(
                notAttempted,
                "You’ve attempted every available quiz so far!"
              )}
            </section>

            {/* Completed */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <h2 className="text-sm font-semibold mb-1">Completed tests</h2>
              <p className="text-[11px] text-emerald-300">
                These quizzes are locked—you earned a perfect score.
              </p>
              {renderList(completed, "No completed tests yet.")}
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
