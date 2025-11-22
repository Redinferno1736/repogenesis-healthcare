"use client";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";  // only if you're using NextAuth

export default function DoctorLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/dashboard" }); 
  };

  return (
    <div className="min-h-screen bg-[#F2E6C9]/20 flex items-center justify-center font-sans">
      <div className="max-w-4xl w-full mx-auto flex flex-col md:flex-row bg-white shadow-2xl rounded-3xl border border-[#DBC2A9] overflow-hidden">
        
        {/* Left Section */}
        <div className="w-full md:w-1/2 bg-linear-to-br from-[#2D7A7F] to-[#429795] p-10 text-white flex flex-col justify-center">
          <div className="flex items-center space-x-3 mb-8">
            <ShieldCheck className="w-10 h-10" />
            <h1 className="text-3xl font-extrabold tracking-tight">MedSphere</h1>
          </div>

          <h2 className="text-4xl font-bold mb-4">Doctor Login</h2>
          <p className="text-white/80 text-lg leading-relaxed">
            Access your dashboard, manage patients, and stay updated with seamless connectivity.
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-10">
          <h3 className="text-2xl font-bold text-[#1B1B3A] mb-6 text-center">
            Welcome Back, Doctor 👨‍⚕️
          </h3>

          <form className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-[#1B1B3A]">Email</label>
              <input
                type="email"
                className="w-full mt-2 p-4 rounded-xl border border-[#DBC2A9] focus:border-[#429795] focus:ring-2 focus:ring-[#429795]/40 outline-none"
                placeholder="doctor@example.com"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#1B1B3A]">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full mt-2 p-4 rounded-xl border border-[#DBC2A9] focus:border-[#429795] focus:ring-2 focus:ring-[#429795]/40 outline-none"
                placeholder="Enter your password"
              />
            </div>

            <button
              className="w-full py-4 text-white text-lg font-bold rounded-xl bg-linear-to-r from-[#2D7A7F] to-[#429795] hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
            >
              Login
            </button>

            {/* Divider */}
            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#DBC2A9]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-3 text-[#1B1B3A]/60">OR</span>
              </div>
            </div>

            {/* Google LOGIN BUTTON */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-[#DBC2A9] rounded-xl hover:bg-gray-50 transition"
            >
              <Image
                src="/google.png"  // make sure file exists in /public
                width={22}
                height={22}
                alt="Google logo"
              />
              <span className="font-medium text-[#1B1B3A]">
                Continue with Google
              </span>
            </button>

            <p className="text-center text-[#1B1B3A]/70">
              New doctor?{" "}
              <Link href="/dsignup" className="text-[#2D7A7F] font-semibold">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
