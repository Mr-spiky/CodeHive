"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp } from "@/actions";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", username: "", name: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const result = await signUp(form.email, form.username, form.name, form.password);
    setLoading(false);
    if (result.error) setError(result.error);
    else router.push("/hive");
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl bg-[#0D0D1F]/80 border border-[var(--ch-border)] p-8">
      <h1 className="font-sora text-2xl font-bold text-white mb-1">Join CodeHive</h1>
      <p className="text-gray-500 text-sm mb-6">Create your member account.</p>

      {error && <p className="text-sm text-red-400 mb-4" role="alert">{error}</p>}

      {(["name", "username", "email", "password"] as const).map((field) => (
        <div key={field} className="mb-4">
          <label className="block text-xs text-gray-400 mb-1.5 capitalize">{field}</label>
          <input
            type={field === "password" ? "password" : field === "email" ? "email" : "text"}
            required
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-[#05050F] border border-[var(--ch-border)] text-white text-sm focus:outline-none focus:border-[var(--ch-gold-500)]"
          />
        </div>
      ))}

      <button type="submit" disabled={loading}
        className="w-full py-3 rounded-full bg-gradient-to-r from-[var(--ch-gold-700)] to-[var(--ch-gold-500)] text-black font-bold text-sm disabled:opacity-50 mt-2">
        {loading ? "Creating account..." : "Create Account"}
      </button>

      <p className="text-center text-sm text-gray-500 mt-5">
        Already a member? <Link href="/login" className="text-[var(--ch-gold-500)] font-medium">Sign in</Link>
      </p>
    </form>
  );
}
