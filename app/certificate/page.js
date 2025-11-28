"use client";

import { useEffect, useRef, useState } from "react";
import { lessons } from "../../src/data/lessons";
import TopNav from "../TopNav";

export default function CertificatePage() {
  const [name, setName] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const flag = window.localStorage.getItem("qc_certificateUnlocked_v1");
    setUnlocked(flag === "true");
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;

    // Background
    ctx.fillStyle = "#020617"; // slate-950
    ctx.fillRect(0, 0, w, h);

    // Border
    ctx.strokeStyle = "#4f46e5"; // indigo-600
    ctx.lineWidth = 12;
    ctx.strokeRect(40, 40, w - 80, h - 80);

    // Inner border
    ctx.strokeStyle = "#22c55e"; // emerald-500
    ctx.lineWidth = 4;
    ctx.strokeRect(70, 70, w - 140, h - 140);

    // Title
    ctx.fillStyle = "#e5e7eb";
    ctx.textAlign = "center";

    ctx.font = "bold 56px serif";
    ctx.fillText("Certificate of Completion", w / 2, 170);

    ctx.font = "24px sans-serif";
    ctx.fillText("QuantumOS Learning Platform", w / 2, 220);

    // Name line
    ctx.font = "20px sans-serif";
    ctx.fillText("This certifies that", w / 2, 290);

    ctx.font = "bold 40px serif";
    ctx.fillStyle = "#a5b4fc"; // indigo-200
    ctx.fillText(name || "__________________", w / 2, 350);

    ctx.font = "20px sans-serif";
    ctx.fillStyle = "#e5e7eb";
    ctx.fillText(
      "has successfully completed all lessons and quizzes in",
      w / 2,
      410
    );
    ctx.fillText("the Quantum Computing Fundamentals track.", w / 2, 440);

    // Details
    ctx.font = "18px sans-serif";
    ctx.fillStyle = "#9ca3af";
    ctx.fillText(
      `Lessons completed: ${lessons.length} / ${lessons.length}`,
      w / 2,
      500
    );
    ctx.fillText("Score: 3 / 3 on all quizzes", w / 2, 530);

    // Signature footer
    ctx.font = "18px serif";
    ctx.fillStyle = "#e5e7eb";
    ctx.fillText("Logan's QuantumOS", w / 2 - 200, h - 120);
    ctx.fillText("Date: ____________", w / 2 + 200, h - 120);
  }, [name]);

  function handleDownload() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    const safeName = (name || "student").replace(/\s+/g, "-");
    link.download = `quantum-certificate-${safeName}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  const lockedMessage =
    "You haven't completed all tests yet. Finish every quiz with a 3/3 score to unlock your certificate.";

  return (
    <>
      <TopNav />
      <main className="min-h-[calc(100vh-4rem)] bg-slate-950 text-gray-100 flex flex-col items-center justify-center px-4 py-6">
        <div className="max-w-4xl w-full mb-6">
          <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
            <h1 className="text-2xl font-bold">QuantumOS Certificate</h1>
            <a
              href="/"
              className="text-xs px-3 py-1 rounded-full border border-slate-600 text-slate-200 hover:bg-slate-800/70"
            >
              ⬅ Return to main menu
            </a>
          </div>
          <p className="text-sm text-slate-300 mb-2">
            When you complete all 50 tests (3/3 on each quiz), you can enter
            your name and download a high-quality certificate image.
          </p>
          {!unlocked && (
            <p className="text-xs text-red-300 mb-4">{lockedMessage}</p>
          )}
        </div>

        <div className="max-w-4xl w-full bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col lg:flex-row gap-4">
          <div className="flex-1 flex flex-col gap-3">
            <label className="text-xs text-slate-300">
              Full name (as you want it to appear on the certificate):
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First Last"
              disabled={!unlocked}
              className="w-full px-3 py-2 rounded-md bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 disabled:opacity-50"
            />
            <p className="text-xs text-slate-400">
              You can still preview the certificate while locked, but the
              download button will be disabled until all tests are complete.
            </p>
            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={handleDownload}
                disabled={!unlocked}
                className={`text-sm px-4 py-2 rounded-md ${
                  unlocked
                    ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                    : "bg-slate-800 text-slate-500 cursor-not-allowed"
                }`}
              >
                ⬇ Download certificate
              </button>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={1600}
              height={1000}
              className="w-full max-w-[600px] border border-slate-700 rounded-lg bg-slate-950"
            />
          </div>
        </div>
      </main>
    </>
  );
}
