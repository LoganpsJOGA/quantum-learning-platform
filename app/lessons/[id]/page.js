"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { lessons } from "../../../src/data/lessons";
import TopNav from "../../TopNav";

export default function LessonPage({ params }) {
  const { id } = params;
  const lesson = lessons.find((l) => l.id === id);

  if (!lesson) {
    notFound();
  }

  const index = lessons.findIndex((l) => l.id === id);
  const prevLesson = index > 0 ? lessons[index - 1] : null;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-6 py-10">
      <TopNav />

      <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
      <p className="text-slate-400 mb-6">Level: {lesson.level}</p>

      <div className="whitespace-pre-line text-lg leading-relaxed">
        {lesson.content}
      </div>

      <div className="mt-12 flex items-center justify-between text-sm text-slate-300">

        <div className="flex gap-3">
          <Link href="/lessons" className="text-sky-300 hover:text-sky-200">
            ← Back to all lessons
          </Link>

          {prevLesson && (
            <Link
              href={`/lessons/${prevLesson.id}`}
              className="text-sky-300 hover:text-sky-200"
            >
              ← Previous lesson
            </Link>
          )}
        </div>

        <div className="flex gap-4">
          {lesson.preset && (
            <Link
              href={`/playground?preset=${lesson.preset}&from=${lesson.id}`}
              className="text-sky-300 hover:text-sky-200"
            >
              🔬 Try this concept in the Playground →
            </Link>
          )}

          {lesson.next && (
            <Link
              href={`/lessons/${lesson.next}`}
              className="text-sky-300 hover:text-sky-200"
            >
              Next lesson →
            </Link>
          )}
        </div>

      </div>
    </main>
  );
}
