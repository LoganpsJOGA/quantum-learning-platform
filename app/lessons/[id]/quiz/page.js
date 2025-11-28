"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { lessons } from "../../../../src/data/lessons";
import { getQuizForLessonId } from "../../../../src/data/quizzes";

const TOTAL_TESTS = 50; // total number of lessons/quizzes

export default function LessonQuizPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params?.id;

  const lesson = useMemo(
    () => lessons.find((l) => l.id === lessonId),
    [lessonId]
  );

  const quiz = useMemo(
    () => getQuizForLessonId(lessonId),
    [lessonId]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [lockedIn, setLockedIn] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [attemptedCount, setAttemptedCount] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Safety: if quiz is missing or empty, bail out nicely.
  const TOTAL_QUESTIONS = Array.isArray(quiz) ? quiz.length : 0;

  useEffect(() => {
    setCurrentIndex(0);
    setSelectedIndex(null);
    setLockedIn(false);
    setCorrectCount(0);
    setAttemptedCount(0);
    setShowResults(false);
  }, [lessonId]);

  if (!lesson || !TOTAL_QUESTIONS) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-center">
        <p className="mb-4 text-lg">
          Sorry, this quiz couldn&apos;t be loaded.
        </p>
        <Link
          href="/lessons"
          className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-sm font-medium"
        >
          Back to lessons
        </Link>
      </main>
    );
  }

  const question = quiz[Math.min(currentIndex, TOTAL_QUESTIONS - 1)];

  function handleSelect(idx) {
    if (lockedIn) return;
    setSelectedIndex(idx);
  }

  function handleDeselect() {
    if (lockedIn) return;
    setSelectedIndex(null);
  }

  function handleSubmitAnswer() {
    if (selectedIndex === null || lockedIn) return;

    setLockedIn(true);
    setAttemptedCount((prev) => prev + 1);

    if (selectedIndex === question.correctIndex) {
      setCorrectCount((prev) => prev + 1);
    }
  }

  function handleNext() {
    if (!lockedIn) return;

    if (currentIndex + 1 < TOTAL_QUESTIONS) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedIndex(null);
      setLockedIn(false);
    } else {
      // Finished all questions
      setShowResults(true);

      // If perfect score, store completion in localStorage
      if (correctCount + (selectedIndex === question.correctIndex ? 1 : 0) === TOTAL_QUESTIONS) {
        try {
          const raw = localStorage.getItem("quizProgress");
          const progress = raw ? JSON.parse(raw) : {};
          progress[lessonId] = {
            completed: true,
            score: TOTAL_QUESTIONS
          };
          localStorage.setItem("quizProgress", JSON.stringify(progress));
        } catch (e) {
          console.error("Failed to save quiz progress", e);
        }
      }
    }
  }

  function handleRetry() {
    // Shuffle question order for retry
    const shuffled = [...quiz].sort(() => Math.random() - 0.5);
    // we can't mutate quiz (useMemo result) directly, but we can just
    // restart the page using router.refresh() which will regenerate the quiz order
    // or simply reload:
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  }

  const finalScore =
    showResults && lockedIn
      ? correctCount
      : correctCount + (lockedIn && selectedIndex === question.correctIndex ? 1 : 0);

  const perfect = showResults && finalScore === TOTAL_QUESTIONS;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <header className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">Quiz</p>
            <h1 className="text-2xl font-semibold">
              {lesson.title}
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/lessons/${lessonId}`}
              className="px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-sm"
            >
              ← Return to lesson
            </Link>
            <Link
              href="/lessons"
              className="px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-sm"
            >
              All lessons
            </Link>
            <Link
              href="/"
              className="px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-sm"
            >
              Main menu
            </Link>
          </div>
        </header>

        {!showResults && (
          <section className="space-y-6">
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span>
                Question {currentIndex + 1} of {TOTAL_QUESTIONS}
              </span>
              <span>Correct so far: {correctCount}</span>
            </div>

            <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
              <p className="text-base font-medium">{question.question}</p>

              <div className="space-y-2">
                {question.choices.map((choice, idx) => {
                  const isSelected = idx === selectedIndex;
                  const isCorrect = idx === question.correctIndex;

                  let bg = "bg-slate-800/80";
                  if (lockedIn && isCorrect) bg = "bg-emerald-700/80";
                  else if (lockedIn && isSelected && !isCorrect) bg = "bg-rose-800/80";
                  else if (isSelected) bg = "bg-indigo-700/80";

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelect(idx)}
                      disabled={lockedIn}
                      className={`w-full text-left rounded-xl px-4 py-3 text-sm border border-slate-700 transition-colors ${bg}`}
                    >
                      <span className="font-mono mr-2">
                        {["A", "B", "C", "D"][idx]}.
                      </span>
                      {choice}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                {!lockedIn && (
                  <>
                    <button
                      type="button"
                      onClick={handleDeselect}
                      disabled={selectedIndex === null}
                      className="px-4 py-2 rounded-full border border-slate-700 text-xs text-slate-300 disabled:opacity-50"
                    >
                      De-select
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmitAnswer}
                      disabled={selectedIndex === null}
                      className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-xs font-medium disabled:opacity-50"
                    >
                      Submit answer
                    </button>
                  </>
                )}

                {lockedIn && (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-xs font-medium"
                  >
                    {currentIndex + 1 < TOTAL_QUESTIONS ? "Next question →" : "View results →"}
                  </button>
                )}
              </div>

              {lockedIn && (
                <p className="mt-3 text-xs text-slate-300">
                  {selectedIndex === question.correctIndex
                    ? "Nice! That answer is correct 🎉"
                    : question.explanation}
                </p>
              )}
            </section>
          </section>
        )}

        {showResults && (
          <section className="space-y-6">
            <div
              className={`rounded-2xl border p-6 ${
                perfect
                  ? "border-emerald-600 bg-emerald-900/40"
                  : "border-rose-600 bg-rose-900/40"
              }`}
            >
              <h2 className="text-xl font-semibold mb-2">
                {perfect
                  ? `You scored ${TOTAL_QUESTIONS}/${TOTAL_QUESTIONS}.`
                  : `You scored ${finalScore} / ${TOTAL_QUESTIONS}.`}
              </h2>
              <p className="text-sm text-slate-100">
                {perfect
                  ? "Excellent work! You’ve mastered this lesson’s quiz. Your completion bar has been updated."
                  : "You need a 3/3 score to get full credit. You can retry this test as many times as you want with the questions shuffled."}
              </p>
            </div>

            {!perfect && (
              <button
                type="button"
                onClick={handleRetry}
                className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-sm font-medium"
              >
                🔁 Retry test
              </button>
            )}

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/lessons/${lessonId}`}
                className="px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-sm"
              >
                ← Return to lesson
              </Link>
              <Link
                href="/my-tests"
                className="px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-sm"
              >
                View my tests
              </Link>
              <Link
                href="/"
                className="px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-sm"
              >
                Main menu
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
