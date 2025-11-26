import { Suspense } from "react";
import PlaygroundClient from "./PlaygroundClient";

export const dynamic = "force-dynamic"; // ensure this page isn't statically pre-rendered

export default function PlaygroundPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-200">
          <p>Loading playground…</p>
        </main>
      }
    >
      <PlaygroundClient />
    </Suspense>
  );
}
