import Link from "next/link";
import { lessons } from "../../data/lessons";

export default function LessonsIndex() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-4 py-8 flex justify-center">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-bold mb-2">Quantum Lessons</h1>
        <p className="text-sm text-slate-400 mb-6">
          Work through these lessons in order to build a solid foundation in quantum computing.
        </p>

        <div className="mb-4 text-xs text-slate-400">
          Total lessons: {lessons.length}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {lessons.map((lesson) => (
            <Link
              key={lesson.id}
              href={`/lessons/${lesson.id}`}
              className="block rounded-xl bg-slate-900 border border-slate-800 p-4 hover:border-indigo-500 hover:bg-slate-900/70 transition"
            >
              <h2 className="font-semibold mb-1">{lesson.title}</h2>
              <p className="text-xs text-slate-400 mb-1">
                Level: {lesson.level}
              </p>
              <p className="text-xs text-slate-400 line-clamp-2">
                {lesson.content.trim().split("\n")[0]}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
