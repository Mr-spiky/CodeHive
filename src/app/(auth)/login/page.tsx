"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/actions";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const result = await signIn(email, password);
    setLoading(false);
    if (result.error) setError(result.error);
    else router.push("/hive");
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl bg-[#0D0D1F]/80 border border-[var(--ch-border)] p-8">
      <h1 className="font-sora text-2xl font-bold text-white mb-1">Welcome back</h1>
      <p className="text-gray-500 text-sm mb-6">Sign in to your CodeHive account.</p>

      {error && <p className="text-sm text-red-400 mb-4" role="alert">{error}</p>}

      <label className="block text-xs text-gray-400 mb-1.5">Email</label>
      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 px-4 py-2.5 rounded-lg bg-[#05050F] border border-[var(--ch-border)] text-white text-sm focus:outline-none focus:border-[var(--ch-gold-500)]" />

      <label className="block text-xs text-gray-400 mb-1.5">Password</label>
      <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-6 px-4 py-2.5 rounded-lg bg-[#05050F] border border-[var(--ch-border)] text-white text-sm focus:outline-none focus:border-[var(--ch-gold-500)]" />

      <button type="submit" disabled={loading}
        className="w-full py-3 rounded-full bg-gradient-to-r from-[var(--ch-gold-700)] to-[var(--ch-gold-500)] text-black font-bold text-sm disabled:opacity-50">
        {loading ? "Signing in..." : "Sign In"}
      </button>

      <p className="text-center text-sm text-gray-500 mt-5">
        No account? <Link href="/signup" className="text-[var(--ch-gold-500)] font-medium">Sign up</Link>
      </p>
    </form>
  );
}
