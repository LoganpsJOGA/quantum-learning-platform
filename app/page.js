// app/page.js

import TopNav from "./TopNav";


export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center">
     <TopNav />
      <header className="w-full max-w-5xl flex justify-between items-center py-6 px-4">
        <div className="text-2xl font-bold tracking-tight">
          Quantum<span className="text-indigo-400">OS</span>
        </div>
        <nav className="space-x-6 text-sm">
          <a href="/lessons" className="hover:text-indigo-400 transition">
            Lessons
          </a>
          <a href="/playground" className="hover:text-indigo-400 transition">
            Playground
          </a>
        </nav>
      </header>

      <section className="flex flex-col items-center justify-center text-center flex-1 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          Learn Quantum Computing from{" "}
          <span className="text-indigo-400">Zero</span>.
        </h1>

        <p className="text-slate-300 max-w-xl mb-8 text-lg">
          A clean, simple, interactive platform to learn qubits, circuits, and
          quantum logic — no background required.
        </p>

        <div className="flex gap-4">
          <a
            href="/lessons"
            className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-semibold"
          >
            Start Learning
          </a>

          <a
            href="/playground"
            className="px-6 py-3 rounded-lg border border-slate-600 hover:border-indigo-400"
          >
            Try Playground
          </a>
        </div>
      </section>

      <footer className="w-full max-w-5xl text-center py-6 text-xs text-slate-500">
        QuantumOS © {new Date().getFullYear()}
      </footer>
    </main>
  );
}
