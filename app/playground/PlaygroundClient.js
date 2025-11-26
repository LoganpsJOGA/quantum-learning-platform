"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { presets } from "../../src/data/playgroundPresets";

const MODE_SINGLE = "single";
const MODE_ENTANGLED = "entangled";

export default function Playground() {
  const [mode, setMode] = useState(MODE_SINGLE);
  const [stateText, setStateText] = useState("Click a button to start.");
  const [history, setHistory] = useState([]);
  const [count0, setCount0] = useState(0);
  const [count1, setCount1] = useState(0);
  const [operations, setOperations] = useState([]);

  const searchParams = useSearchParams();
  const presetKey = searchParams.get("preset");

  // Load preset from URL (?preset=...)
  useEffect(() => {
    if (!presetKey) return;

    const preset = presets[presetKey];
    if (!preset) return;

    // set mode based on preset
    if (preset.mode === "entangled") {
      setMode(MODE_ENTANGLED);
    } else {
      setMode(MODE_SINGLE);
    }

    // show clear message in the big text box
    setStateText(
      `Loaded preset: ${preset.title || presetKey}\n\n${
        preset.description || ""
      }`
    );

    // store operations for future UI upgrades
    setOperations(preset.operations || []);

    // reset measurements when preset changes
    setHistory([]);
    setCount0(0);
    setCount1(0);
  }, [presetKey]);

  function addHistoryEntry(text) {
    setHistory((prev) => {
      const next = [text, ...prev];
      return next.slice(0, 10);
    });
  }

  function reset(modeNext = mode) {
    setMode(modeNext);
    setStateText("Click a button to start.");
    setHistory([]);
    setCount0(0);
    setCount1(0);
  }

  function createQubit() {
    reset(MODE_SINGLE);
    setStateText("Prepared |0⟩.");
    addHistoryEntry("Prepared |0⟩");
  }

  function putInSuperposition() {
    reset(MODE_SINGLE);
    setStateText("Applied H to |0⟩ → (|0⟩ + |1⟩) / √2.");
    addHistoryEntry("Applied H gate (superposition).");
  }

  function measureOnce() {
    const outcome = Math.random() < 0.5 ? 0 : 1;
    if (outcome === 0) setCount0((c) => c + 1);
    else setCount1((c) => c + 1);

    setStateText(`Measured: ${outcome}`);
    addHistoryEntry(`Measured ${outcome}`);
  }

  function measureMany(n = 20) {
    let c0 = 0;
    let c1 = 0;
    for (let i = 0; i < n; i++) {
      const outcome = Math.random() < 0.5 ? 0 : 1;
      if (outcome === 0) c0++;
      else c1++;
    }
    setCount0((c) => c + c0);
    setCount1((c) => c + c1);
    setStateText(`Ran ${n} measurements → 0: ${c0}, 1: ${c1}`);
    addHistoryEntry(`Batch of ${n}: 0→${c0}, 1→${c1}`);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Quantum Playground</h1>
        <p className="text-slate-300 mb-6">
          Experiment with a simulated qubit and an entangled pair. This is not
          a full simulator, but it helps you build intuition for superposition,
          measurement, and entanglement.
        </p>

        {/* Mode toggle */}
        <div className="inline-flex rounded-full bg-slate-800 p-1 mb-6">
          <button
            className={`px-4 py-1 text-sm rounded-full ${
              mode === MODE_SINGLE ? "bg-violet-600" : "text-slate-300"
            }`}
            onClick={() => reset(MODE_SINGLE)}
          >
            Single Qubit
          </button>
          <button
            className={`px-4 py-1 text-sm rounded-full ${
              mode === MODE_ENTANGLED ? "bg-violet-600" : "text-slate-300"
            }`}
            onClick={() => reset(MODE_ENTANGLED)}
          >
            Entangled Pair
          </button>
        </div>

        {/* State / log panel */}
        <div className="bg-slate-900 rounded-xl p-4 mb-6 border border-slate-800">
          <p className="font-mono whitespace-pre-wrap mb-4">
            {stateText}
          </p>
          <div className="text-sm text-slate-400">
            <div className="mb-1">
              Last {history.length} measurements:
            </div>
            {history.length === 0 ? (
              <div>-</div>
            ) : (
              <ul className="list-disc list-inside">
                {history.map((h, idx) => (
                  <li key={idx}>{h}</li>
                ))}
              </ul>
            )}
            <div className="mt-2">
              Count(0): {count0} &nbsp;|&nbsp; Count(1): {count1}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={createQubit}
            className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-sm font-medium"
          >
            Create Qubit (|0⟩)
          </button>
          <button
            onClick={putInSuperposition}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-medium"
          >
            Put in Superposition (H)
          </button>
          <button
            onClick={measureOnce}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-sm font-medium"
          >
            Measure Once
          </button>
          <button
            onClick={() => measureMany(20)}
            className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-sm font-medium"
          >
            Run 20 Measurements
          </button>
        </div>

        {/* Optional: show operations for the current preset */}
        {operations.length > 0 && (
          <div className="mt-8 text-sm text-slate-300">
            <h2 className="font-semibold mb-2">
              Operations for this preset:
            </h2>
            <ul className="list-disc list-inside">
              {operations.map((op, idx) => (
                <li key={idx}>{op}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
