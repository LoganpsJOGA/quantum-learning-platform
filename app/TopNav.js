"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TopNav() {
  const router = useRouter();

  return (
    <div className="mb-6 flex items-center justify-between text-sm text-slate-300">
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-slate-600 px-3 py-1 hover:bg-slate-800"
        >
          ← Back
        </button>

        <Link
          href="/"
          className="rounded-lg border border-slate-600 px-3 py-1 hover:bg-slate-800"
        >
          ⌂ Return to main menu
        </Link>
      </div>
    </div>
  );
}
