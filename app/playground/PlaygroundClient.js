"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import TopNav from "../TopNav";
import presets from "../../src/data/playgroundPresets";

export default function PlaygroundClient() {
  const searchParams = useSearchParams();
  const presetKey = searchParams.get("preset");
  const fromLessonId = searchParams.get("from");

  const [mode, setMode] = useState("single");
  const [operations, setOperations] = useState([]);
  const [stateText, setStateText] = useState("Click a button to start.");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!presetKey) return;
    const preset = presets[presetKey];
    if (!preset) return;

    setOperations(preset.operations || []);
    setMode(preset.mode || "single");
    setHistory([]);
    setStateText(`Loaded preset: ${preset.label}`);
  }, [presetKey]);

  function addOperation(op) {
    setOperations([...operations, op]);
    setHistory([...history, op]);
  }

  function measureOnce() {
    const result = Math.random() > 0.5 ? 1 : 0;
    const newHistory = [...history, `M → ${result}`];
    setHistory(newHistory);
    setStateText(`Last measurement: ${result}`);
  }

  function measureMany() {
    let count0 = 0;
    let count1 = 0;

    for (let i = 0; i < 20; i++) {
      const result = Math.random() > 0.5 ? 1 : 0;
      result === 0 ? count0++ : count1++;
    }

    setStateText(`20 measurements → 0:${count0}, 1:${count1}`);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-50">
      <TopNav />

      {fromLessonId && (
        <div className="mb-4">
          <Link
            href={`/lessons/${fromLessonId}`}
            className="inline-flex items-center text-sm text-sky-300 hover:text-sky-200"
          >
            ← Return to lesson
          </Link>
        </div>
      )}

      <h1 className="text-3xl font-bold">Quantum Playground</h1>
      <p className="mb-6 text-slate-400">
        Experiment with a simulated qubit and an entangled pair.
      </p>

      <div className="mb-4 flex gap-3">
        <button
          onClick={() => setMode("single")}
          className={`rounded-lg px-3 py-1 ${
            mode === "single"
              ? "bg-purple-600"
              : "bg-slate-700 hover:bg-slate-600"
          }`}
        >
          Single Qubit
        </button>

        <button
          onClick={() => setMode("entangled")}
          className={`rounded-lg px-3 py-1 ${
            mode === "entangled"
              ? "bg-purple-600"
              : "bg-slate-700 hover:bg-slate-600"
          }`}
        >
          Entangled Pair
        </button>
      </div>

      <div className="mb-6 min-h-[120px] rounded-lg bg-slate-900 p-4 text-sm font-mono text-slate-300">
        <p>{stateText}</p>
        <p className="mt-2 text-xs text-slate-500">
          History: {history.join(" → ")}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => addOperation("I(0)")}
          className="rounded-lg bg-purple-700 px-4 py-2 hover:bg-purple-600"
        >
          Create Qubit (|0⟩)
        </button>

        <button
          onClick={() => addOperation("H")}
          className="rounded-lg bg-blue-700 px-4 py-2 hover:bg-blue-600"
        >
          Put in Superposition (H)
        </button>

        <button
          onClick={measureOnce}
          className="rounded-lg bg-green-700 px-4 py-2 hover:bg-green-600"
        >
          Measure Once
        </button>

        <button
          onClick={measureMany}
          className="rounded-lg bg-green-700 px-4 py-2 hover:bg-green-600"
        >
          Run 20 Measurements
        </button>
      </div>
    </main>
  );
}
