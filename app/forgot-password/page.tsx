"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/frontend/Navbar";
import Footer from "../components/frontend/Footer";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // This is a placeholder for actual reset logic
    setTimeout(() => {
      setMessage({
        type: "success",
        text: "If an account exists for this email, you will receive password reset instructions shortly.",
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen hero-bg pt-24 pb-16 flex items-center justify-center relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "rgba(47,163,242,0.07)", filter: "blur(70px)" }} />
        <div className="absolute bottom-1/3 left-1/4 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: "rgba(244,249,233,0.04)", filter: "blur(50px)" }} />

        <div className="relative z-10 w-full max-w-md mx-auto px-4">
          {/* Breadcrumb removed */}

          <div className="text-center mb-8">
            <h1 className="font-display text-4xl font-bold text-white mb-2">
              Reset Password
            </h1>
            <p className="text-white/50 text-sm">
              Enter your email to receive a reset link
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl"
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {message && (
                <div className={`p-4 rounded-xl text-sm ${message.type === "success" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                  {message.text}
                </div>
              )}

              <div>
                <label htmlFor="sv-reset-email" className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(255,255,255,0.3)" }}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    id="sv-reset-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
                    onFocus={(e) => { e.target.style.border = "1px solid #2fa3f2"; e.target.style.boxShadow = "0 0 0 3px rgba(47,163,242,0.15)"; }}
                    onBlur={(e) => { e.target.style.border = "1px solid rgba(255,255,255,0.12)"; e.target.style.boxShadow = "none"; }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:translate-y-0"
                style={{
                  background: "linear-gradient(135deg, #2fa3f2, #1a7abf)",
                  boxShadow: "0 8px 24px rgba(47,163,242,0.35)",
                }}
              >
                {loading ? "Sending..." : "Send Reset Link →"}
              </button>

              <Link
                href="/login"
                className="block text-center text-xs font-semibold uppercase tracking-widest hover:text-[#2fa3f2] transition-colors"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                ← Back to Login
              </Link>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
