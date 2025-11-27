"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { lessons } from "../../../src/data/lessons";
import TopNav from "../../TopNav";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();

  // params.id can be string | string[] | undefined
  let id = "";
  if (typeof params.id === "string") {
    id = params.id;
  } else if (Array.isArray(params.id) && params.id.length > 0) {
    id = params.id[0];
  }

  const lesson = lessons.find((l) => l.id === id);

  // 🔍 If we can't find the lesson, show a debug page instead of a silent 404
  if (!lesson) {
    return (
      <>
        <TopNav />
        <main className="max-w-3xl mx-auto px-4 py-10 text-gray-100">
          <h1 className="text-2xl font-semibold mb-4">
            Debug: lesson not found
          </h1>

          <p className="mb-4">
            Requested id:{" "}
            <code className="bg-slate-900 px-2 py-1 rounded">{id}</code>
          </p>

          <p className="mb-2 font-semibold">Known lesson IDs:</p>
          <pre className="bg-slate-900/70 rounded-lg p-3 text-xs overflow-x-auto">
            {lessons.map((l) => l.id).join("\n")}
          </pre>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="text-xs px-3 py-1 rounded-full border border-slate-600 text-slate-200 hover:bg-slate-800/70"
            >
              ⬅ Back
            </button>

            <Link
              href="/lessons"
              className="text-sm text-indigo-300 hover:text-indigo-100"
            >
              ← Back to all lessons
            </Link>

            <Link
              href="/"
              className="text-xs px-3 py-1 rounded-full border border-slate-600 text-slate-200 hover:bg-slate-800/70"
            >
              ⬅ Return to main menu
            </Link>
          </div>
        </main>
      </>
    );
  }

  const index = lessons.findIndex((l) => l.id === id);
  const prevLesson = index > 0 ? lessons[index - 1] : null;
  const nextLesson = index < lessons.length - 1 ? lessons[index + 1] : null;

  return (
    <>
      <TopNav />

      <main className="max-w-3xl mx-auto px-4 py-10 text-gray-100">
        {/* Top nav row: back / main menu / browser-back */}
        <div className="flex items-center justify-between mb-6 gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/lessons"
              className="text-sm text-indigo-300 hover:text-indigo-100"
            >
              ← Back to all lessons
            </Link>

            <Link
              href="/"
              className="text-xs px-3 py-1 rounded-full border border-slate-600 text-slate-200 hover:bg-slate-800/70"
            >
              ⬅ Return to main menu
            </Link>

            <button
              type="button"
              onClick={() => router.back()}
              className="text-xs px-3 py-1 rounded-full border border-slate-600 text-slate-200 hover:bg-slate-800/70"
            >
              ⬅ Back
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap justify-end">
            {lesson.level && (
              <span className="px-2 py-1 rounded-full bg-slate-800/80 border border-slate-700">
                Level: {lesson.level}
              </span>
            )}

            {lesson.preset && (
              <Link
                href={`/playground?preset=${encodeURIComponent(
                  lesson.preset
                )}`}
                className="px-3 py-1 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium"
              >
                🔬 Try in Playground
              </Link>
            )}
          </div>
        </div>

        {/* Lesson title + tags */}
        <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>

        {lesson.tags && lesson.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6 text-xs">
            {lesson.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-full bg-slate-800 text-slate-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Lesson content */}
        <article className="prose prose-invert max-w-none">
          {lesson.content.split("\n").map((line, idx) =>
            line.trim() === "" ? (
              <br key={idx} />
            ) : (
              <p key={idx}>{line}</p>
            )
          )}
        </article>

        {/* Bottom nav row: previous / next / playground shortcut */}
        <div className="mt-10 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex gap-3 flex-wrap">
            {prevLesson && (
              <Link
                href={`/lessons/${prevLesson.id}`}
                className="inline-flex items-center text-sm text-indigo-300 hover:text-indigo-100"
              >
                ← Previous lesson
              </Link>
            )}
            {nextLesson && (
              <Link
                href={`/lessons/${nextLesson.id}`}
                className="inline-flex items-center text-sm text-indigo-300 hover:text-indigo-100"
              >
                Next lesson →
              </Link>
            )}
          </div>

          <Link
            href={`/playground?preset=${encodeURIComponent(
              lesson.preset || ""
            )}`}
            className="inline-flex items-center text-sm px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            🔬 Try this concept in the Playground →
          </Link>
        </div>
      </main>
    </>
  );
}
