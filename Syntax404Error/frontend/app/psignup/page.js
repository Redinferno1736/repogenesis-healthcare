"use client";
import { useState } from "react";
import { ShieldCheck, HeartPulse } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PatientSignup() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F2E6C9]/20 flex items-center justify-center font-sans">
      <div className="max-w-4xl w-full mx-auto flex flex-col md:flex-row bg-white shadow-2xl rounded-3xl border border-[#DBC2A9] overflow-hidden">
        
        {/* Left Section */}
        <div className="w-full md:w-1/2 bg-linear-to-br from-[#2D7A7F] to-[#429795] p-10 text-white flex flex-col justify-center">
          <div className="flex items-center space-x-3 mb-8">
            <HeartPulse className="w-10 h-10" />
            <h1 className="text-3xl font-extrabold tracking-tight">MedSphere</h1>
          </div>

          <h2 className="text-4xl font-bold mb-4">Patient Sign Up</h2>
          <p className="text-white/80 text-lg leading-relaxed">
            Create your secure account and begin your smarter healthcare journey today.
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-10">
          <h3 className="text-2xl font-bold text-[#1B1B3A] mb-6 text-center">
            Create Your Account 🧑‍🩺
          </h3>

          <form className="space-y-6">

            <div>
              <label className="text-sm font-semibold text-[#1B1B3A]">Full Name</label>
              <input
                type="text"
                className="w-full mt-2 p-4 rounded-xl border border-[#DBC2A9] focus:border-[#429795] focus:ring-2 focus:ring-[#429795]/40 outline-none"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#1B1B3A]">Email</label>
              <input
                type="email"
                className="w-full mt-2 p-4 rounded-xl border border-[#DBC2A9] focus:border-[#429795] focus:ring-2 focus:ring-[#429795]/40 outline-none"
                placeholder="patient@example.com"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#1B1B3A]">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full mt-2 p-4 rounded-xl border border-[#DBC2A9] focus:border-[#429795] focus:ring-2 focus:ring-[#429795]/40 outline-none"
                placeholder="Create a strong password"
              />
            </div>

            <button
              className="w-full py-4 text-white text-lg font-bold rounded-xl bg-linear-to-r from-[#2D7A7F] to-[#429795] hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
            >
              Sign Up
            </button>

            <p className="text-center text-[#1B1B3A]/70">
              Already have an account?{" "}
              <Link href="/plogin" className="text-[#2D7A7F] font-semibold">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
