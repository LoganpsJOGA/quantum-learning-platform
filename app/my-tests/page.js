"use client";

import { useEffect, useState } from "react";
import { lessons } from "../../src/data/lessons";
import TopNav from "../TopNav";

const STORAGE_KEY = "qc_test_progress_v1";

function loadProgress() {
  if (typeof window === "undefined") return { attempted: [], completed: [] };
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

export default function MyTestsPage() {
  const [attempted, setAttempted] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const prog = loadProgress();
    setAttempted(prog.attempted);
    setCompleted(prog.completed);

    const handler = () => {
      const updated = loadProgress();
      setAttempted(updated.attempted);
      setCompleted(updated.completed);
    };

    window.addEventListener("storage", handler);
    window.addEventListener("qc-progress-updated", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("qc-progress-updated", handler);
    };
  }, []);

  const completedSet = new Set(completed);
  const attemptedSet = new Set(attempted);

  const completedLessons = lessons.filter((l) => completedSet.has(l.id));
  const attemptedOnly = lessons.filter(
    (l) => attemptedSet.has(l.id) && !completedSet.has(l.id)
  );
  const notAttempted = lessons.filter(
    (l) => !attemptedSet.has(l.id) && !completedSet.has(l.id)
  );

  return (
    <>
      <TopNav />
      <main className="max-w-6xl mx-auto px-4 py-8 text-gray-100">
        <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold mb-1">My tests</h1>
            <p className="text-sm text-slate-300">
              Track which quizzes you&apos;ve attempted, which you still need to
              start, and which you&apos;ve completed.
            </p>
          </div>
          <a
            href="/"
            className="text-xs px-3 py-1 rounded-full border border-slate-600 text-slate-200 hover:bg-slate-800/70"
          >
            ⬅ Return to main menu
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Attempted */}
          <section className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <h2 className="text-sm font-semibold mb-2 text-yellow-300">
              Attempted tests
            </h2>
            <p className="text-xs text-slate-400 mb-3">
              You&apos;ve tried these quizzes at least once, but haven&apos;t
              earned the badge yet.
            </p>
            <ul className="space-y-2 text-xs">
              {attemptedOnly.length === 0 && (
                <li className="text-slate-500 italic">None yet.</li>
              )}
              {attemptedOnly.map((lesson) => (
                <li key={lesson.id} className="flex justify-between gap-2">
                  <span>{lesson.title}</span>
                  <a
                    href={`/lessons/${lesson.id}/quiz`}
                    className="text-indigo-300 hover:text-indigo-100"
                  >
                    Retry →
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Not attempted */}
          <section className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <h2 className="text-sm font-semibold mb-2 text-sky-300">
              Not attempted yet
            </h2>
            <p className="text-xs text-slate-400 mb-3">
              Quizzes you still need to start.
            </p>
            <ul className="space-y-2 text-xs">
              {notAttempted.length === 0 && (
                <li className="text-slate-500 italic">
                  You&apos;ve started all tests.
                </li>
              )}
              {notAttempted.map((lesson) => (
                <li key={lesson.id} className="flex justify-between gap-2">
                  <span>{lesson.title}</span>
                  <a
                    href={`/lessons/${lesson.id}/quiz`}
                    className="text-emerald-300 hover:text-emerald-100"
                  >
                    Start →
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Completed */}
          <section className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <h2 className="text-sm font-semibold mb-2 text-emerald-300">
              Completed tests
            </h2>
            <p className="text-xs text-slate-400 mb-3">
              You earned a 3/3 score and a badge for these quizzes.
            </p>
            <ul className="space-y-2 text-xs">
              {completedLessons.length === 0 && (
                <li className="text-slate-500 italic">No badges yet.</li>
              )}
              {completedLessons.map((lesson) => (
                <li key={lesson.id} className="flex justify-between gap-2">
                  <span>{lesson.title}</span>
                  <span className="text-emerald-400">🏅</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
