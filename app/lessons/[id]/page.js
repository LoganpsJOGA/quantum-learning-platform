"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { lessons } from "../../../data/lessons";

export default function LessonPage() {
  // Example pathname: "/lessons/superposition"
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const id = segments[segments.length - 1]; // last piece after /lessons/

  const lesson = lessons.find((l) => l.id === id);

  if (!lesson) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 px-4 py-8 flex justify-center">
        <div className="w-full max-w-3xl">
          <h1 className="text-2xl font-bold mb-4">Lesson not found</h1>
          <p className="mb-4">
            We couldn&apos;t find a lesson matching id:{" "}
            <code className="bg-slate-900 px-1 rounded">{id || "(empty)"}</code>
          </p>
          <p className="mb-2 text-sm text-slate-400">
            Known lesson IDs are:
          </p>
          <pre className="bg-slate-900 p-3 rounded text-xs overflow-x-auto">
            {lessons.map((l) => l.id).join("\n")}
          </pre>

          <Link
            href="/lessons"
            className="inline-block mt-6 text-indigo-400 hover:underline"
          >
            ← Back to all lessons
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-4 py-8 flex justify-center">
      <div className="w-full max-w-3xl">
        <Link
          href="/lessons"
          className="text-sm text-slate-400 hover:text-slate-200"
        >
          ← Back to all lessons
        </Link>

        <h1 className="text-3xl font-bold mt-4 mb-1">{lesson.title}</h1>
        <p className="text-xs text-slate-400 mb-6">Level: {lesson.level}</p>

        <article className="prose prose-invert max-w-none">
          {lesson.content.split("\n").map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </article>

        {lesson.preset && (
          <Link
            href={`/playground?preset=${lesson.preset}`}
            className="inline-block mt-6 text-sm text-indigo-400 hover:text-indigo-300 hover:underline"
          >
            🔬 Try this concept in the Playground →
          </Link>
        )}

        <div className="mt-10 flex justify-between text-sm text-indigo-300">
          <Link href="/lessons" className="hover:underline">
            ← Back to all lessons
          </Link>

          {lesson.next && (
            <Link
              href={`/lessons/${lesson.next}`}
              className="hover:underline"
            >
              Next lesson →
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
