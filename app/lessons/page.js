"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { lessons } from "../../src/data/lessons";

const TAG_COMPACT_LIMIT = 24; // how many tags to show before "More…"

function getAllTags() {
  const tagSet = new Set();
  lessons.forEach((lesson) => {
    (lesson.tags || []).forEach((t) => tagSet.add(t));
  });
  return Array.from(tagSet).sort();
}

export default function LessonsPage() {
  const router = useRouter();
  const [activeTag, setActiveTag] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllTags, setShowAllTags] = useState(false);

  const allTags = useMemo(() => getAllTags(), []);
  const visibleTags = showAllTags
    ? allTags
    : allTags.slice(0, TAG_COMPACT_LIMIT);
  const hasHiddenTags = allTags.length > TAG_COMPACT_LIMIT;

  const filteredLessons = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return lessons.filter((lesson) => {
      // tag filter
      if (activeTag !== "all" && !lesson.tags?.includes(activeTag)) {
        return false;
      }

      if (!term) return true;

      const haystack = [
        lesson.title,
        lesson.level,
        lesson.id,
        ...(lesson.tags || []),
        lesson.content || "",
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(term);
    });
  }, [activeTag, searchTerm]);

  const handleViewLesson = (id) => {
    router.push(`/lessons/${id}`);
  };

  const handleGoPlayground = (preset) => {
    if (!preset) {
      router.push("/playground");
    } else {
      router.push(`/playground?preset=${encodeURIComponent(preset)}`);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        {/* Header row with title + search + main-menu button */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">All lessons</h1>
            <p className="text-slate-400 text-sm mt-1">
              Browse focused lessons on core quantum computing ideas.
            </p>
          </div>

          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
            {/* Search bar */}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search lessons by title, topic, or text…"
              className="w-full md:w-80 rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            {/* Return to main menu */}
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-slate-800 px-3 py-2 text-xs font-medium text-slate-100 hover:bg-slate-700 transition"
            >
              ← Return to main menu
            </Link>
          </div>
        </div>

        {/* Tag filters row (compact + “More…”) */}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                activeTag === "all"
                  ? "bg-purple-600 text-white border-transparent"
                  : "bg-slate-900 text-slate-200 border-slate-700 hover:border-purple-500"
              }`}
            >
              All topics
            </button>

            {visibleTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                  activeTag === tag
                    ? "bg-purple-600 text-white border-transparent"
                    : "bg-slate-900 text-slate-300 border-slate-700 hover:border-purple-500"
                }`}
              >
                {tag}
              </button>
            ))}

            {hasHiddenTags && !showAllTags && (
              <button
                onClick={() => setShowAllTags(true)}
                className="px-3 py-1.5 rounded-full text-xs font-medium border bg-slate-900 text-slate-300 border-slate-700 hover:border-purple-500"
              >
                … etc
              </button>
            )}

            {hasHiddenTags && showAllTags && (
              <button
                onClick={() => setShowAllTags(false)}
                className="px-3 py-1.5 rounded-full text-xs font-medium border bg-slate-900 text-slate-400 border-slate-700 hover:border-purple-500"
              >
                Show fewer
              </button>
            )}
          </div>

          {activeTag !== "all" && (
            <p className="text-xs text-slate-500">
              Filtering by tag: <span className="font-semibold">{activeTag}</span>
            </p>
          )}
        </div>

        {/* Lessons grid */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredLessons.map((lesson) => (
            <article
              key={lesson.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm shadow-slate-900/40"
            >
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                  Lesson {lesson.number ?? "?"}
                </p>
                <h2 className="text-base font-semibold">{lesson.title}</h2>
                <p className="text-xs text-slate-400">
                  Level: {lesson.level || "Unknown"}
                </p>
                <p className="mt-2 text-xs text-slate-300 line-clamp-4">
                  {lesson.summary || lesson.content?.slice(0, 220) || ""}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleViewLesson(lesson.id)}
                  className="inline-flex items-center justify-center rounded-xl bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-700 transition"
                >
                  View lesson →
                </button>

                <button
                  onClick={() => handleGoPlayground(lesson.preset)}
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-3 py-1.5 text-[11px] font-medium text-slate-200 border border-slate-700 hover:border-purple-500 transition"
                >
                  🎮 Playground
                </button>
              </div>
            </article>
          ))}

          {filteredLessons.length === 0 && (
            <p className="text-sm text-slate-400">
              No lessons match your filters. Try clearing the search box or
              choosing “All topics”.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
