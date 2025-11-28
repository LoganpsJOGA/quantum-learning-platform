"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import TopNav from "../../../TopNav";
import { getQuizForLessonId } from "../../../../src/data/quizzes";

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
    // Let TopNav + My tests know something changed
    window.dispatchEvent(new Event("quiz-progress-updated"));
  } catch {
    // ignore
  }
}

// simple in-place shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export default function LessonQuizPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.id; // e.g. "bit-vs-qubit"

  // Full hard-mode question bank for this lesson
  const baseQuiz = useMemo(() => {
    if (!slug) return null;
    return getQuizForLessonId(slug);
  }, [slug]);

  // Progress info for this slug (to know if quiz is locked)
  const [progressForSlug, setProgressForSlug] = useState(null);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !slug) return;
    const all = loadProgress();
    const p = all[slug];
    setProgressForSlug(p || null);
    setIsLocked(p?.isPerfect === true);
  }, [slug]);

  // Local quiz state (interactive run = 3 questions chosen from baseQuiz)
  const [quiz, setQuiz] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hasSubmittedCurrent, setHasSubmittedCurrent] = useState(false);
  const [wasCurrentCorrect, setWasCurrentCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [resultIsPerfect, setResultIsPerfect] = useState(false);

  // Build a 3-question quiz (shuffled) whenever baseQuiz changes
  useEffect(() => {
    if (!baseQuiz || baseQuiz.length === 0) {
      setQuiz([]);
      setCurrentIndex(0);
      setSelectedIndex(null);
      setHasSubmittedCurrent(false);
      setWasCurrentCorrect(false);
      setCorrectCount(0);
      setShowResults(false);
      setResultIsPerfect(false);
      return;
    }

    // Only build the interactive quiz if this lesson is NOT locked
    if (isLocked) return;

    const copy = [...baseQuiz];
    shuffle(copy);
    const truncated = copy.slice(0, 3);

    setQuiz(truncated);
    setCurrentIndex(0);
    setSelectedIndex(null);
    setHasSubmittedCurrent(false);
    setWasCurrentCorrect(false);
    setCorrectCount(0);
    setShowResults(false);
    setResultIsPerfect(false);
  }, [baseQuiz, isLocked]);

  const TOTAL_QUESTIONS = quiz.length;
  const question = TOTAL_QUESTIONS > 0 ? quiz[currentIndex] : null;

  function handleSelect(idx) {
    if (hasSubmittedCurrent) return;
    setSelectedIndex(idx);
  }

  function handleSubmit() {
    if (!question || selectedIndex == null || hasSubmittedCurrent) return;

    const isCorrect = selectedIndex === question.correctIndex;
    setWasCurrentCorrect(isCorrect);
    setHasSubmittedCurrent(true);
    setCorrectCount((prev) => prev + (isCorrect ? 1 : 0));
  }

  function finishQuiz(finalCorrectCount) {
    const isPerfect = finalCorrectCount === TOTAL_QUESTIONS;
    setShowResults(true);
    setResultIsPerfect(isPerfect);

    if (!slug) return;

    const all = loadProgress();
    const prev = all[slug] || {
      attempts: 0,
      isPerfect: false
    };

    const updated = {
      attempts: (prev.attempts ?? 0) + 1,
      lastScore: finalCorrectCount,
      totalQuestions: TOTAL_QUESTIONS,
      isPerfect: isPerfect || prev.isPerfect === true,
      lastUpdated: new Date().toISOString()
    };

    all[slug] = updated;
    saveProgress(all);
    setProgressForSlug(updated);
    if (updated.isPerfect) {
      setIsLocked(true);
    }
  }

  function handleContinue() {
    if (!hasSubmittedCurrent) return;
    const isLast = currentIndex === TOTAL_QUESTIONS - 1;

    if (isLast) {
      finishQuiz(correctCount);
    } else {
      setCurrentIndex((idx) => idx + 1);
      setSelectedIndex(null);
      setHasSubmittedCurrent(false);
      setWasCurrentCorrect(false);
    }
  }

  function handleBackToLesson() {
    if (!slug) {
      router.push("/lessons");
    } else {
      router.push(`/lessons/${slug}`);
    }
  }

  // If no quiz exists for this lesson, show "not available"
  if (!baseQuiz || baseQuiz.length === 0) {
    return (
      <>
        <TopNav />
        <main className="min-h-screen bg-slate-950 text-slate-50">
          <div className="max-w-3xl mx-auto px-4 pt-16 pb-24">
            <h1 className="text-2xl font-semibold mb-4">
              Quiz not available for this lesson (yet)
            </h1>
            <p className="text-sm text-slate-300 mb-6">
              We couldn&apos;t load quiz questions for{" "}
              <code className="px-1.5 py-0.5 rounded bg-slate-900/70 text-xs">
                {slug}
              </code>
              . Once a quiz is written and added to <code>src/data/quizzes.js</code>,
              it will appear here.
            </p>
            <button
              onClick={handleBackToLesson}
              className="px-4 py-2 rounded-full border border-slate-600 text-sm hover:bg-slate-800 transition"
            >
              ← Return to lesson
            </button>
          </div>
        </main>
      </>
    );
  }

  // If quiz is already PERFECT for this lesson and we are not currently
  // showing a fresh result, show locked read-only view.
  if (isLocked && !showResults) {
    return (
      <>
        <TopNav />
        <main className="min-h-screen bg-slate-950 text-slate-50">
          <div className="max-w-3xl mx-auto px-4 pt-16 pb-24 space-y-8">
            <header className="space-y-2">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                Lesson quiz
              </p>
              <h1 className="text-2xl font-semibold">
                {slug?.replace(/-/g, " ") || "Lesson quiz"}
              </h1>
              <p className="text-sm text-emerald-300">
                You&apos;ve already completed this quiz with a perfect score.
                It&apos;s now locked. You can review the questions and correct
                answers below.
              </p>
            </header>

            <section className="space-y-6">
              {baseQuiz.map((q, qi) => (
                <div
                  key={qi}
                  className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-3"
                >
                  <p className="text-xs text-slate-400 mb-1">
                    Question {qi + 1}
                  </p>
                  <p className="text-sm font-medium leading-relaxed">
                    {q.question}
                  </p>
                  <ul className="space-y-2">
                    {q.choices.map((choice, idx) => {
                      const isCorrect = idx === q.correctIndex;
                      return (
                        <li
                          key={idx}
                          className={[
                            "px-4 py-2 rounded-xl border text-sm",
                            isCorrect
                              ? "border-emerald-400 bg-emerald-500/10"
                              : "border-slate-700 bg-slate-900"
                          ].join(" ")}
                        >
                          <span className="font-mono mr-3 text-xs text-slate-400">
                            {["A", "B", "C", "D"][idx]}.
                          </span>
                          {choice}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </section>

            <button
              type="button"
              onClick={handleBackToLesson}
              className="px-4 py-2 rounded-full border border-slate-700 text-xs hover:bg-slate-900"
            >
              ← Return to lesson
            </button>
          </div>
        </main>
      </>
    );
  }

  // Normal interactive quiz UI
  return (
    <>
      <TopNav />
      <main className="min-h-screen bg-slate-950 text-slate-50">
        <div className="max-w-3xl mx-auto px-4 pt-16 pb-24 space-y-8">
          <header className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Lesson quiz
            </p>
            <h1 className="text-2xl font-semibold">
              {slug?.replace(/-/g, " ") || "Lesson quiz"}
            </h1>
            <p className="text-sm text-slate-300">
              Answer {TOTAL_QUESTIONS} hard-mode questions based on this lesson.
            </p>
          </header>

          {!showResults && question && (
            <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>
                  Question {currentIndex + 1} / {TOTAL_QUESTIONS}
                </span>
              </div>

              <p className="text-sm font-medium leading-relaxed">
                {question.question}
              </p>

              <div className="space-y-2">
                {question.choices.map((choice, idx) => {
                  const isSelected = selectedIndex === idx;

                  let stateClasses = "";
                  if (hasSubmittedCurrent) {
                    const isCorrectChoice = idx === question.correctIndex;
                    const isUserChoice = idx === selectedIndex;

                    if (isCorrectChoice) {
                      stateClasses =
                        "border-emerald-400 bg-emerald-500/10 text-emerald-50";
                    } else if (isUserChoice && !isCorrectChoice) {
                      stateClasses =
                        "border-rose-400 bg-rose-500/10 text-rose-50";
                    } else {
                      stateClasses = "border-slate-700 bg-slate-900";
                    }
                  } else {
                    if (isSelected) {
                      stateClasses =
                        "border-indigo-400 bg-indigo-500/10 text-indigo-50";
                    } else {
                      stateClasses =
                        "border-slate-700 hover:border-slate-500 hover:bg-slate-900";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelect(idx)}
                      disabled={hasSubmittedCurrent}
                      className={[
                        "w-full text-left px-4 py-3 rounded-xl border text-sm transition disabled:cursor-default",
                        stateClasses
                      ].join(" ")}
                    >
                      <span className="font-mono mr-3 text-xs text-slate-400">
                        {["A", "B", "C", "D"][idx]}.
                      </span>
                      {choice}
                    </button>
                  );
                })}
              </div>

              {hasSubmittedCurrent &&
                selectedIndex != null &&
                question.explanationsByChoice &&
                question.explanationsByChoice[selectedIndex] && (
                  <p
                    className={[
                      "mt-2 text-xs",
                      wasCurrentCorrect
                        ? "text-emerald-300"
                        : "text-rose-300"
                    ].join(" ")}
                  >
                    {question.explanationsByChoice[selectedIndex]}
                  </p>
                )}

              <div className="flex justify-between items-center pt-3">
                {!hasSubmittedCurrent ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setSelectedIndex(null)}
                      className="text-xs text-slate-400 hover:text-slate-200"
                    >
                      Clear selection
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={selectedIndex == null}
                      className="px-4 py-2 rounded-full bg-indigo-500 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-indigo-400 transition"
                    >
                      {currentIndex === TOTAL_QUESTIONS - 1
                        ? "Submit final answer"
                        : "Submit answer"}
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handleContinue}
                    className="ml-auto px-4 py-2 rounded-full bg-slate-100 text-slate-900 text-xs font-semibold hover:bg-white transition"
                  >
                    {currentIndex === TOTAL_QUESTIONS - 1
                      ? "View results →"
                      : "Continue →"}
                  </button>
                )}
              </div>
            </section>
          )}

          {showResults && (
            <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
              <h2 className="text-lg font-semibold">Quiz results</h2>
              <p className="text-sm">
                You scored{" "}
                <span className="font-semibold">
                  {correctCount} / {TOTAL_QUESTIONS}
                </span>
                .
              </p>
              {resultIsPerfect ? (
                <p className="text-sm text-emerald-300">
                  Perfect score! 🏅 You&apos;ve earned the expert badge for this
                  lesson. This quiz is now locked and you cannot retake it, but
                  you can always review the questions.
                </p>
              ) : (
                <p className="text-sm text-amber-300">
                  You need a 3/3 score to get full credit. You can retry this
                  test as many times as you want with the questions reshuffled.
                </p>
              )}

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleBackToLesson}
                  className="px-4 py-2 rounded-full border border-slate-700 text-xs hover:bg-slate-900"
                >
                  ← Return to lesson
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/my-tests")}
                  className="px-4 py-2 rounded-full border border-slate-700 text-xs hover:bg-slate-900"
                >
                  View my tests
                </button>
                {!resultIsPerfect && !isLocked && (
                  <button
                    type="button"
                    onClick={() => {
                      // fresh retry
                      setIsLocked(false);
                      setShowResults(false);
                      setHasSubmittedCurrent(false);
                      setWasCurrentCorrect(false);
                      setSelectedIndex(null);
                      setCorrectCount(0);
                      // quiz will be rebuilt by useEffect
                    }}
                    className="px-4 py-2 rounded-full bg-indigo-500 text-xs font-semibold hover:bg-indigo-400"
                  >
                    🔁 Retry test
                  </button>
                )}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
