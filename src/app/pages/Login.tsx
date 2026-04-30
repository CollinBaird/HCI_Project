import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    // Simulate successful login — swap with real API call when ready
    login(email, email.split("@")[0]);
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#f0f4ff" }}>
      {/* Left panel — branding */}
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 p-12 text-white"
        style={{ background: "linear-gradient(145deg, #0d1f51 0%, #1a3a8f 60%, #2563eb 100%)" }}
      >
        <div>
          <h1 className="text-4xl font-black tracking-tight">UPlan</h1>
          <p className="text-blue-200 mt-2 text-sm">Plan your perfect event</p>
        </div>
        <div>
          <blockquote className="text-2xl font-light leading-relaxed text-blue-100">
            "Every great event starts with a great plan."
          </blockquote>
          <p className="mt-4 text-blue-300 text-sm">— The UPlan Team</p>
        </div>
        <div className="text-blue-400 text-xs">© 2026 UPlan. All rights reserved.</div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 text-center">
            <h1 className="text-3xl font-black text-[#0d1f51]">UPlan</h1>
            <p className="text-gray-500 text-sm mt-1">Plan your perfect event</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h2>
            <p className="text-gray-500 text-sm mb-8">Sign in to your account to continue</p>

            {error && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <a href="#" className="text-xs text-blue-600 hover:underline">Forgot password?</a>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#0d1f51] text-white font-semibold rounded-xl hover:bg-blue-900 transition text-sm"
              >
                Sign in
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 font-medium hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}