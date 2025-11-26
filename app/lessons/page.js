"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { lessons } from "../../data/lessons";

export default function LessonsPage() {
  const [activeTag, setActiveTag] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Collect all unique tags from lessons
  const allTags = useMemo(() => {
    const set = new Set();
    lessons.forEach((lesson) => {
      (lesson.tags || []).forEach((tag) => set.add(tag));
    });
    return Array.from(set).sort();
  }, []);

  const filteredLessons = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return lessons.filter((lesson) => {
      // Tag filter
      if (activeTag !== "all") {
        if (!lesson.tags || !lesson.tags.includes(activeTag)) {
          return false;
        }
      }

      // Search filter
      if (!term) return true;

      const haystackParts = [
        lesson.id,
        lesson.title,
        lesson.level,
        (lesson.tags || []).join(" "),
        lesson.content?.slice(0, 300) || "",
      ];

      const haystack = haystackParts.join(" ").toLowerCase();
      return haystack.includes(term);
    });
  }, [activeTag, searchTerm]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Quantum Lessons
          </h1>
          <p className="text-slate-300">
            Browse, search, and filter lessons on quantum computing —
            from bits and qubits to algorithms and hardware.
          </p>
        </header>

        {/* Search + tag filters */}
        <section className="mb-8 space-y-4">
          {/* Search bar */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Search lessons
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, topic, tag, or level (e.g. “Grover”, “entanglement”, “beginner”)"
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {/* Tag filter row */}
          <div>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs uppercase tracking-wide text-slate-400">
                Filter by tag:
              </span>

              <button
                type="button"
                onClick={() => setActiveTag("all")}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
                  activeTag === "all"
                    ? "bg-violet-600 border-violet-500 text-white"
                    : "bg-slate-900 border-slate-700 text-slate-200 hover:border-violet-500"
                }`}
              >
                All
              </button>

              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
                    activeTag === tag
                      ? "bg-violet-600 border-violet-500 text-white"
                      : "bg-slate-900 border-slate-700 text-slate-200 hover:border-violet-500"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <p className="mt-2 text-xs text-slate-400">
              Showing{" "}
              <span className="font-semibold text-slate-200">
                {filteredLessons.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-200">
                {lessons.length}
              </span>{" "}
              lessons
              {activeTag !== "all" && (
                <>
                  {" "}
                  with tag <span className="font-mono">#{activeTag}</span>
                </>
              )}
              {searchTerm.trim() && (
                <>
                  {" "}
                  matching <span className="italic">“{searchTerm.trim()}”</span>
                </>
              )}
              .
            </p>
          </div>
        </section>

        {/* Lessons grid */}
        <section className="grid gap-4 md:grid-cols-2">
          {filteredLessons.map((lesson, index) => (
            <Link
              key={lesson.id}
              href={`/lessons/${lesson.id}`}
              className="block rounded-2xl bg-slate-900 border border-slate-800 hover:border-violet-500 hover:bg-slate-900/80 transition p-5"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Lesson {index + 1}
                </p>
                <span className="inline-flex items-center rounded-full bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-200">
                  {lesson.level || "Unlabeled"}
                </span>
              </div>

              <h2 className="text-lg font-semibold mb-1">
                {lesson.title}
              </h2>

              {lesson.tags?.length ? (
                <div className="mb-2 flex flex-wrap gap-1">
                  {lesson.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-slate-800 px-2 py-0.5 text-[11px] text-slate-200"
                    >
                      #{tag}
                    </span>
                  ))}
                  {lesson.tags.length > 4 && (
                    <span className="text-[11px] text-slate-400">
                      +{lesson.tags.length - 4} more
                    </span>
                  )}
                </div>
              ) : null}

              <p className="text-sm text-slate-300 line-clamp-3">
                {lesson.content
                  ?.replace(/\s+/g, " ")
                  .trim()
                  .slice(0, 180) || "Click to read this lesson."}
                {lesson.content && lesson.content.length > 180 ? "…" : ""}
              </p>
            </Link>
          ))}

          {filteredLessons.length === 0 && (
            <div className="col-span-full rounded-xl border border-dashed border-slate-700 bg-slate-900/60 p-6 text-center text-slate-300">
              <p className="font-medium mb-1">No lessons match that filter.</p>
              <p className="text-sm text-slate-400">
                Try clearing the search box or switching tags.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
