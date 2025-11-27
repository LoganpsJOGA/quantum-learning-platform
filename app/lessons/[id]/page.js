"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { lessons } from "../../../src/data/lessons";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const lesson = useMemo(
    () => lessons.find((l) => l.id === id),
    [id]
  );

  if (!lesson) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
          <h1 className="text-2xl font-semibold">Debug: lesson not found</h1>
          <p className="text-sm text-slate-400">
            Requested id: <span className="font-mono">{String(id)}</span>
          </p>
          <p className="text-sm text-slate-400">Known lesson IDs:</p>
          <div className="mt-2 rounded-xl bg-slate-900 border border-slate-800 p-4 text-xs font-mono space-y-1 max-h-[50vh] overflow-auto">
            {lessons.map((l) => (
              <div key={l.id}>{l.id}</div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => router.back()}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs hover:bg-slate-700"
            >
              ← Back
            </button>
            <Link
              href="/lessons"
              className="px-3 py-1.5 rounded-xl bg-slate-900 text-xs border border-slate-700 hover:border-purple-500"
            >
              All lessons
            </Link>
            <Link
              href="/"
              className="px-3 py-1.5 rounded-xl bg-slate-900 text-xs border border-slate-700 hover:border-purple-500"
            >
              Return to main menu
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const currentIndex = lessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        {/* Top nav row */}
        <div className="flex justify-between items-center gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => router.back()}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs hover:bg-slate-700"
            >
              ← Back
            </button>
            <Link
              href="/lessons"
              className="px-3 py-1.5 rounded-xl bg-slate-900 text-xs border border-slate-700 hover:border-purple-500"
            >
              All lessons
            </Link>
            <Link
              href="/"
              className="px-3 py-1.5 rounded-xl bg-slate-900 text-xs border border-slate-700 hover:border-purple-500"
            >
              Return to main menu
            </Link>
          </div>

          <div className="flex gap-2">
            {lesson.preset && (
              <Link
                href={`/playground?preset=${encodeURIComponent(
                  lesson.preset
                )}&from=${encodeURIComponent(lesson.id)}`}
                className="px-4 py-2 rounded-2xl bg-emerald-600 text-sm font-semibold text-emerald-50 shadow-sm hover:bg-emerald-500 transition"
              >
                🎮 Try in Playground
              </Link>
            )}
            <Link
              href={`/lessons/${lesson.id}/quiz`}
              className="px-4 py-2 rounded-2xl bg-purple-600 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 transition"
            >
              🧠 Take quiz
            </Link>
          </div>
        </div>

        {/* Lesson card itself */}
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-md shadow-slate-900/50">
          <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 mb-1">
            Lesson {lesson.number ?? "?"}
          </p>
          <h1 className="text-2xl font-semibold mb-1">{lesson.title}</h1>
          <p className="text-xs text-slate-400 mb-4">
            Level: {lesson.level || "Unknown"}
          </p>

          {lesson.tags?.length ? (
            <div className="flex flex-wrap gap-2 mb-4">
              {lesson.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300 border border-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <div className="prose prose-invert prose-sm max-w-none">
            {lesson.content
              .split("\n")
              .filter((line) => line.trim().length > 0)
              .map((line, idx) => (
                <p key={idx} className="mb-2">
                  {line}
                </p>
              ))}
          </div>
        </article>

        {/* Bottom navigation between lessons */}
        <div className="flex justify-between items-center pt-2">
          <div>
            {prevLesson && (
              <Link
                href={`/lessons/${prevLesson.id}`}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs hover:bg-slate-700"
              >
                ← Previous: {prevLesson.title}
              </Link>
            )}
          </div>
          <div>
            {nextLesson && (
              <Link
                href={`/lessons/${nextLesson.id}`}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs hover:bg-slate-700"
              >
                Next: {nextLesson.title} →
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
