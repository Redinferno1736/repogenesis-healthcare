"use client";
import { useState } from "react";
import { ShieldCheck, HeartPulse } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";


export default function PatientLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = () => {
    // Update this route to whatever your backend Google OAuth URL is
    router.push("/api/auth/google");
  };

  return (
    <div className="min-h-screen bg-[#F2E6C9]/20 flex items-center justify-center font-sans">
      <div className="max-w-4xl w-full mx-auto flex flex-col md:flex-row bg-white shadow-2xl rounded-3xl border border-[#DBC2A9] overflow-hidden">

        {/* Left Section */}
        <div className="w-full md:w-1/2 bg-linear-to-br from-[#429795] to-[#2D7A7F] p-10 text-white flex flex-col justify-center">
          <div className="flex items-center space-x-3 mb-8">
            <HeartPulse className="w-10 h-10" />
            <h1 className="text-3xl font-extrabold tracking-tight">MedSphere</h1>
          </div>

          <h2 className="text-4xl font-bold mb-4">Patient Login</h2>
          <p className="text-white/80 text-lg leading-relaxed">
            Login to access your medical history, health insights, and doctor recommendations.
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-10">
          <h3 className="text-2xl font-bold text-[#1B1B3A] mb-6 text-center">
            Welcome Back 🧑‍🩺
          </h3>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 border border-[#429795] rounded-xl text-[#1B1B3A] font-semibold hover:bg-[#429795]/10 transition-all mb-6"
          >
            <img src="/google.png" alt="Google Logo" className="w-6 h-6" />
            Continue with Google
          </button>

          <form className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-[#1B1B3A]">
                Email
              </label>
              <input
                type="email"
                placeholder="patient@example.com"
                className="w-full mt-2 p-4 rounded-xl border border-[#DBC2A9] focus:border-[#429795] focus:ring-2 focus:ring-[#429795]/40 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#1B1B3A]">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full mt-2 p-4 rounded-xl border border-[#DBC2A9] focus:border-[#429795] focus:ring-2 focus:ring-[#429795]/40 outline-none"
              />
            </div>

            <button
              className="w-full py-4 text-white text-lg font-bold rounded-xl bg-linear-to-r from-[#429795] to-[#2D7A7F] hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
            >
              Login
            </button>

            <p className="text-center text-[#1B1B3A]/70 mt-2">
              New patient?{" "}
              <Link href="/psignup" className="text-[#2D7A7F] font-semibold">
                Create an account
              </Link>
            </p>
          </form>

        </div>
      </div>
    </div>
  );
}
