import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../context/AuthContext";

type Step = "account" | "org-choice" | "join-org" | "create-org" | "role";

export function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("account");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orgName, setOrgName] = useState("");
  const [orgType, setOrgType] = useState("");
  const [orgDescription, setOrgDescription] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) { setError("Please fill in all fields."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setError("");
    setStep("org-choice");
  };

  const handleCreateOrgSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName || !orgType) { setError("Please fill in the organization name and type."); return; }
    setError("");
    setStep("role");
  };

  const handleJoinOrgSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinCode) { setError("Please enter an organization code."); return; }
    setError("");
    setStep("role");
  };

  const handleRoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) { setError("Please select a role."); return; }
    // Simulate registration — swap with real API call when ready
    register(email, name, orgName || "Joined Org");
    navigate("/home");
  };

  const stepLabels = [
    { label: "Create your account", key: "account" },
    { label: "Set up your organization", key: "org" },
    { label: "Select your role", key: "role" },
    { label: "Start planning", key: "done" },
  ];

  const currentStepIndex =
    step === "account" ? 0 :
    step === "org-choice" || step === "join-org" || step === "create-org" ? 1 :
    step === "role" ? 2 : 3;

  return (
    <div className="min-h-screen flex" style={{ background: "#f0f4ff" }}>
      {/* Left panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 p-12 text-white"
        style={{ background: "linear-gradient(145deg, #0d1f51 0%, #1a3a8f 60%, #2563eb 100%)" }}
      >
        <div>
          <h1 className="text-4xl font-black tracking-tight">UPlan</h1>
          <p className="text-blue-200 mt-2 text-sm">Plan your perfect event</p>
        </div>

        <div className="space-y-6">
          <p className="text-blue-300 text-xs font-semibold uppercase tracking-widest">Getting started</p>
          <div className="space-y-4">
            {stepLabels.map((s, i) => (
              <div key={s.key} className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i === currentStepIndex ? "bg-white text-[#0d1f51]" : i < currentStepIndex ? "bg-blue-400 text-white" : "bg-blue-800 text-blue-300"
                }`}>
                  {i < currentStepIndex ? "✓" : i + 1}
                </div>
                <span className={`text-sm ${i === currentStepIndex ? "text-white font-medium" : i < currentStepIndex ? "text-blue-300" : "text-blue-400"}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-blue-400 text-xs">© 2026 UPlan. All rights reserved.</div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <h1 className="text-3xl font-black text-[#0d1f51]">UPlan</h1>
            <p className="text-gray-500 text-sm mt-1">Plan your perfect event</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">

            {/* Step 1 — Account */}
            {step === "account" && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Create your account</h2>
                <p className="text-gray-500 text-sm mb-8">Step 1 of 3 — Your personal details</p>
                {error && <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">{error}</div>}
                <form onSubmit={handleAccountSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Smith"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 6 characters"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                  </div>
                  <button type="submit" className="w-full py-3 bg-[#0d1f51] text-white font-semibold rounded-xl hover:bg-blue-900 transition text-sm">
                    Continue →
                  </button>
                </form>
                <p className="text-center text-sm text-gray-500 mt-6">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 font-medium hover:underline">Sign in</Link>
                </p>
              </>
            )}

            {/* Step 2 — Org choice */}
            {step === "org-choice" && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Your organization</h2>
                <p className="text-gray-500 text-sm mb-8">Step 2 of 3 — Join an existing org or create a new one</p>
                <div className="space-y-4">
                  <button onClick={() => { setError(""); setStep("join-org"); }}
                    className="w-full flex items-center gap-4 p-5 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition text-left group">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-xl group-hover:bg-blue-200 transition">🔗</div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Join an existing organization</p>
                      <p className="text-gray-500 text-xs mt-0.5">Enter an invite code to join your team</p>
                    </div>
                  </button>
                  <button onClick={() => { setError(""); setStep("create-org"); }}
                    className="w-full flex items-center gap-4 p-5 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition text-left group">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-xl group-hover:bg-blue-200 transition">🏢</div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Create a new organization</p>
                      <p className="text-gray-500 text-xs mt-0.5">Set up your org and invite others</p>
                    </div>
                  </button>
                </div>
                <button onClick={() => { setStep("account"); setError(""); }}
                  className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 transition mt-6">← Back</button>
              </>
            )}

            {/* Step 2a — Join org */}
            {step === "join-org" && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Join an organization</h2>
                <p className="text-gray-500 text-sm mb-8">Enter the invite code your admin shared with you</p>
                {error && <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">{error}</div>}
                <form onSubmit={handleJoinOrgSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization invite code</label>
                    <input type="text" value={joinCode} onChange={(e) => setJoinCode(e.target.value)} placeholder="e.g. OU-COUNCIL-2026"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                  </div>
                  <button type="submit" className="w-full py-3 bg-[#0d1f51] text-white font-semibold rounded-xl hover:bg-blue-900 transition text-sm">
                    Continue →
                  </button>
                  <button type="button" onClick={() => { setStep("org-choice"); setError(""); }}
                    className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 transition">← Back</button>
                </form>
              </>
            )}

            {/* Step 2b — Create org */}
            {step === "create-org" && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Create an organization</h2>
                <p className="text-gray-500 text-sm mb-8">Set up your org and start planning events</p>
                {error && <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">{error}</div>}
                <form onSubmit={handleCreateOrgSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization name</label>
                    <input type="text" value={orgName} onChange={(e) => setOrgName(e.target.value)} placeholder="e.g. OU Student Council"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization type</label>
                    <select value={orgType} onChange={(e) => setOrgType(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white">
                      <option value="">Select a type...</option>
                      <option value="student-org">Student Organization</option>
                      <option value="greek-life">Greek Life</option>
                      <option value="sports-club">Sports Club</option>
                      <option value="academic">Academic / Honor Society</option>
                      <option value="community">Community Group</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <textarea value={orgDescription} onChange={(e) => setOrgDescription(e.target.value)}
                      placeholder="What does your organization do?" rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none" />
                  </div>
                  <button type="submit" className="w-full py-3 bg-[#0d1f51] text-white font-semibold rounded-xl hover:bg-blue-900 transition text-sm">
                    Continue →
                  </button>
                  <button type="button" onClick={() => { setStep("org-choice"); setError(""); }}
                    className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 transition">← Back</button>
                </form>
              </>
            )}

            {/* Step 3 — Role selection */}
            {step === "role" && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Select your role</h2>
                <p className="text-gray-500 text-sm mb-8">Step 3 of 3 — What best describes you?</p>
                {error && <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">{error}</div>}
                <form onSubmit={handleRoleSubmit} className="space-y-3">
                  {[
                    { value: "admin", label: "Admin", desc: "Manage the organization and members", icon: "👑" },
                    { value: "event-planner", label: "Event Planner", desc: "Create and manage events", icon: "📋" },
                    { value: "member", label: "Member", desc: "View and RSVP to events", icon: "👤" },
                  ].map((r) => (
                    <button key={r.value} type="button" onClick={() => setRole(r.value)}
                      className={`w-full flex items-center gap-4 p-4 border-2 rounded-xl transition text-left ${
                        role === r.value ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                      }`}>
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-xl">{r.icon}</div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{r.label}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{r.desc}</p>
                      </div>
                      {role === r.value && <div className="ml-auto w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">✓</div>}
                    </button>
                  ))}
                  <button type="submit" className="w-full py-3 bg-[#0d1f51] text-white font-semibold rounded-xl hover:bg-blue-900 transition text-sm mt-2">
                    Get Started 🎉
                  </button>
                  <button type="button" onClick={() => { setStep("org-choice"); setError(""); }}
                    className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 transition">← Back</button>
                </form>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}