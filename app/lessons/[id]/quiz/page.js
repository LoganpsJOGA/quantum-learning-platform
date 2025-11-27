"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { lessons } from "../../../../src/data/lessons";
import { lessonQuizzes } from "../../../../src/data/lessonQuizzes";

const LETTERS = ["A", "B", "C", "D"];
const QUESTIONS_PER_TEST = 3;

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function saveQuizProgress(lessonId, score, total) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem("quantum-quiz-progress");
    const parsed = raw ? JSON.parse(raw) : { attempts: {}, completed: [] };

    const attemptsForLesson = parsed.attempts[lessonId] || [];
    attemptsForLesson.push({ score, total, timestamp: Date.now() });

    parsed.attempts[lessonId] = attemptsForLesson;

    // mark as completed if perfect score
    if (score === total && !parsed.completed.includes(lessonId)) {
      parsed.completed.push(lessonId);
    }

    localStorage.setItem("quantum-quiz-progress", JSON.stringify(parsed));
  } catch {
    // ignore storage errors
  }
}

export default function LessonQuizPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const lesson = useMemo(
    () => lessons.find((l) => l.id === id),
    [id]
  );

  const baseQuestions = useMemo(
    () => (id && lessonQuizzes[id] ? lessonQuizzes[id] : []),
    [id]
  );

  const [quiz, setQuiz] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [locked, setLocked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [explanation, setExplanation] = useState("");
  const [score, setScore] = useState(0);
  const [mode, setMode] = useState("quiz"); // "quiz" | "results"

  // initialise / reinitialise quiz whenever lesson or baseQuestions change
  useEffect(() => {
    if (!baseQuestions.length) {
      setQuiz([]);
      return;
    }
    const selected = shuffle(baseQuestions).slice(0, QUESTIONS_PER_TEST);
    setQuiz(selected);
    setCurrentIndex(0);
    setSelectedIndex(null);
    setLocked(false);
    setIsCorrect(null);
    setExplanation("");
    setScore(0);
    setMode("quiz");
  }, [baseQuestions, id]);

  const TOTAL_QUESTIONS = quiz.length;

  if (!lesson) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-4">
          <h1 className="text-2xl font-semibold">Debug: lesson not found</h1>
          <p className="text-sm text-slate-400">
            Requested id: <span className="font-mono">{String(id)}</span>
          </p>
          <div className="flex gap-3 mt-4">
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

  // No questions yet for this lesson
  if (!baseQuestions.length) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
          <h1 className="text-2xl font-semibold">
            Quiz – {lesson.title}
          </h1>
          <p className="text-sm text-slate-400">
            A quiz for this lesson hasn’t been written yet. Check back soon!
          </p>
          <div className="flex gap-3">
            <Link
              href={`/lessons/${lesson.id}`}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs hover:bg-slate-700"
            >
              ← Return to lesson
            </Link>
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
              Main menu
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // While quiz state is being initialised
  if (mode === "quiz" && quiz.length === 0) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100">
        <div className="max-w-3xl mx-auto px-4 py-12 space-y-4">
          <h1 className="text-2xl font-semibold">
            Quiz – {lesson.title}
          </h1>
          <p className="text-sm text-slate-400">Loading questions…</p>
        </div>
      </main>
    );
  }

  const question = quiz[currentIndex];

  const handleChoiceClick = (index) => {
    if (locked || mode !== "quiz") return;
    setSelectedIndex(index);
  };

  const handleSubmit = () => {
    if (selectedIndex === null || locked || mode !== "quiz") return;
    const correct = selectedIndex === question.answerIndex;

    setLocked(true);
    setIsCorrect(correct);
    setExplanation(question.explanation || "");

    if (correct) {
      setScore((prev) =>
        Math.min(prev + 1, TOTAL_QUESTIONS) // cap to avoid 4/3 bug
      );
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= TOTAL_QUESTIONS) {
      const finalScore = Math.min(score, TOTAL_QUESTIONS);
      saveQuizProgress(lesson.id, finalScore, TOTAL_QUESTIONS);
      setScore(finalScore);
      setMode("results");
      return;
    }

    setCurrentIndex((idx) => idx + 1);
    setSelectedIndex(null);
    setLocked(false);
    setIsCorrect(null);
    setExplanation("");
  };

  const handleRetry = () => {
    const selected = shuffle(baseQuestions).slice(0, QUESTIONS_PER_TEST);
    setQuiz(selected);
    setCurrentIndex(0);
    setSelectedIndex(null);
    setLocked(false);
    setIsCorrect(null);
    setExplanation("");
    setScore(0);
    setMode("quiz");
  };

  // --- results view ---
  if (mode === "results") {
    const perfect = score === TOTAL_QUESTIONS;

    return (
      <main className="min-h-screen bg-slate-950 text-slate-100">
        <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
          <h1 className="text-2xl font-semibold">
            Quiz results – {lesson.title}
          </h1>

          <div
            className={`rounded-2xl border px-6 py-4 text-sm ${
              perfect
                ? "bg-emerald-900/50 border-emerald-500/70"
                : "bg-rose-900/40 border-rose-500/70"
            }`}
          >
            <p className="font-semibold mb-1">
              You scored {score} / {TOTAL_QUESTIONS}.
            </p>
            {perfect ? (
              <p>
                Nice – 3/3 on this lesson! You’ve earned the{" "}
                <span className="font-semibold">
                  “{lesson.title} – Expert”
                </span>{" "}
                badge.
              </p>
            ) : (
              <p>
                You need a 3/3 score to get full credit. You can retry this test
                as many times as you want with the same questions in a new
                order.
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <Link
              href={`/lessons/${lesson.id}`}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs hover:bg-slate-700"
            >
              ← Return to lesson
            </Link>
            <Link
              href="/my-tests"
              className="px-3 py-1.5 rounded-xl bg-slate-900 text-xs border border-slate-700 hover:border-purple-500"
            >
              View my tests
            </Link>
            <Link
              href="/"
              className="px-3 py-1.5 rounded-xl bg-slate-900 text-xs border border-slate-700 hover:border-purple-500"
            >
              Main menu
            </Link>
            {!perfect && (
              <button
                onClick={handleRetry}
                className="px-3 py-1.5 rounded-xl bg-purple-600 text-xs font-medium hover:bg-purple-500"
              >
                🔁 Retry test
              </button>
            )}
          </div>
        </div>
      </main>
    );
  }

  // --- quiz view ---
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            Quiz – {lesson.title}
          </h1>
          <p className="text-xs text-slate-400">
            Question {currentIndex + 1} of {TOTAL_QUESTIONS}
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href={`/lessons/${lesson.id}`}
            className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs hover:bg-slate-700"
          >
            ← Return to lesson
          </Link>
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
            Main menu
          </Link>
        </div>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
          <p className="text-sm font-medium">{question.question}</p>

          <div className="space-y-2">
            {question.choices.map((choice, idx) => {
              const isSelected = idx === selectedIndex;
              const isAnswer = idx === question.answerIndex;
              const showCorrect = locked && isAnswer;
              const showWrong = locked && isSelected && !isAnswer;

              let classes =
                "w-full text-left px-3 py-2 rounded-xl border text-sm transition ";

              if (showCorrect) {
                classes +=
                  "bg-emerald-900/60 border-emerald-500 text-emerald-50";
              } else if (showWrong) {
                classes += "bg-rose-900/60 border-rose-500 text-rose-50";
              } else if (isSelected) {
                classes +=
                  "bg-slate-800 border-purple-500 text-slate-50 shadow-inner";
              } else {
                classes +=
                  "bg-slate-900/80 border-slate-700 text-slate-200 hover:border-purple-500";
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleChoiceClick(idx)}
                  className={classes}
                >
                  <span className="font-mono mr-2 text-xs text-slate-400">
                    {LETTERS[idx]}.
                  </span>
                  {choice}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedIndex !== null && !locked && (
              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs hover:bg-slate-700"
              >
                De-select
              </button>
            )}

            {!locked && (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={selectedIndex === null}
                className="px-3 py-1.5 rounded-xl bg-purple-600 text-xs font-medium hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit answer
              </button>
            )}

            {locked && (
              <button
                type="button"
                onClick={handleNext}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs hover:bg-slate-700"
              >
                {currentIndex + 1 >= TOTAL_QUESTIONS
                  ? "Finish quiz"
                  : "Next question →"}
              </button>
            )}
          </div>

          {locked && explanation && (
            <div
              className={`mt-3 rounded-xl border px-3 py-2 text-xs ${
                isCorrect
                  ? "bg-emerald-900/40 border-emerald-500/70"
                  : "bg-rose-900/40 border-rose-500/70"
              }`}
            >
              <p className="font-semibold mb-1">
                {isCorrect ? "Correct 🎉" : "Not quite"}
              </p>
              <p>{explanation}</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
