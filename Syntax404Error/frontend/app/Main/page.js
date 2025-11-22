"use client";
import { useState, useEffect } from "react";
import {
  ShieldCheck,
  Shield,
  Microscope,
  Scroll,
  UserCheck,
  Link2,
  HeartHandshake,
  Activity,
} from "lucide-react";
import Link from "next/link";

const FEATURES = [
  {
    icon: Shield,
    title: "HIPAA Compliant",
    desc: "Your data is encrypted and protected with industry-leading security standards.",
  },
  {
    icon: Microscope,
    title: "AI-Powered Diagnostics",
    desc: "Smart analysis suggests relevant tests based on your symptoms and history.",
  },
  {
    icon: Scroll,
    title: "Complete Records",
    desc: "Access your entire medical history in one secure, organized location.",
  },
];

const PROCESS_STEPS = [
  {
    icon: UserCheck,
    title: "Secure Connection",
    desc: "Sign up and securely link your historical health records.",
  },
  {
    icon: Link2,
    title: "Analyze & Advise",
    desc: "AI analyzes symptoms to suggest essential diagnostic tests.",
  },
  {
    icon: HeartHandshake,
    title: "Informed Recovery",
    desc: "Receive personalized advice to prevent complications.",
  },
];

export default function LandingPage() {
  

  return (
    <div className="font-sans text-[#1B1B3A] overflow-x-hidden bg-[#F2E6C9]/20">
      {/* Hero Section */}
      <header className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-linear-to-br from-white via-[#F2E6C9]/30 to-[#429795]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Hero Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <div className="inline-block px-4 py-1.5 bg-[#2D7A7F]/10 text-[#2D7A7F] font-semibold text-sm rounded-full mb-6 border border-[#2D7A7F]/20">
              🩺 Revolutionizing Patient Care
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-[#1B1B3A] mb-6">
              Your Health Journey, <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2D7A7F] to-[#429795]">
                Smarter.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-[#1B1B3A]/70 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Smart Clinic Connect streamlines your healthcare experience,
              ensuring every visit is efficient, informed, and focused on your
              well-being.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Link
                href="/select"
                className="px-8 py-4 bg-linear-to-r from-[#2D7A7F] to-[#429795] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center"
              >
                Get Started <Activity className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/features"
                className="px-8 py-4 bg-white text-[#2D7A7F] border-2 border-[#DBC2A9] font-bold rounded-xl hover:border-[#429795] hover:text-[#429795] hover:scale-105 transition-all duration-200 flex items-center justify-center"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Hero Graphic */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="bg-white rounded-3xl shadow-2xl border border-[#F2E6C9] overflow-hidden">
                <div className="h-2 bg-linear-to-r from-[#2D7A7F] to-[#429795]"></div>
                <div className="p-8 flex flex-col items-center justify-center h-80">
                  <div className="bg-[#429795]/10 p-6 rounded-full mb-6 border-2 border-[#2D7A7F]/20">
                    <Shield className="w-24 h-24 text-[#2D7A7F]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1B1B3A] mb-2">
                    Secure & Verified
                  </h3>
                  <p className="text-[#1B1B3A]/60">HIPAA Compliant Platform</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base font-bold text-[#2D7A7F] uppercase tracking-wide mb-2">
              Why Choose Us
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-[#1B1B3A] mb-4">
              Features that empower your health
            </h3>
            <p className="text-lg text-[#1B1B3A]/70 max-w-2xl mx-auto">
              Experience a seamless integration of technology and care designed
              to give you clarity and control.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => (
              <div
                key={index}
                className="bg-[#F2E6C9]/30 rounded-2xl p-8 border-2 border-[#DBC2A9] hover:border-[#429795] hover:shadow-xl transition-all duration-300 group"
              >
                <div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-[#2D7A7F]" />
                </div>
                <h4 className="text-xl font-bold text-[#1B1B3A] mb-3">
                  {feature.title}
                </h4>
                <p className="text-[#1B1B3A]/70 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20 bg-linear-to-b from-[#F2E6C9]/20 to-[#DBC2A9]/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1B1B3A] mb-4">
              How It Works
            </h2>
            <p className="text-xl text-[#1B1B3A]/70">
              Three simple steps to a better healthcare experience
            </p>
          </div>

          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div className="hidden md:block absolute top-12 left-10 right-10 h-1 bg-linear-to-r from-[#429795] via-[#2D7A7F] to-[#429795] opacity-30"></div>

            {PROCESS_STEPS.map((step, index) => (
              <div
                key={index}
                className="relative z-10 flex-1 flex flex-col items-center text-center"
              >
                <div className="relative w-24 h-24 bg-white rounded-full shadow-xl border-4 border-[#429795] flex items-center justify-center mb-6 hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-10 h-10 text-[#2D7A7F]" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#2D7A7F] text-white rounded-full flex items-center justify-center font-bold text-sm border-2 border-white">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#1B1B3A]">
                  {step.title}
                </h3>
                <p className="text-[#1B1B3A]/70 max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 overflow-hidden bg-linear-to-br from-[#1B1B3A] to-[#2D7A7F]">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, #429795 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-[#F2E6C9] mb-6">
            Ready for a Smarter Experience?
          </h2>
          <p className="text-xl text-[#F2E6C9]/80 mb-10 max-w-2xl mx-auto">
            Join the platform that puts precision, security, and personalized
            care at the forefront of your journey.
          </p>
          <Link
            href="/select"
            className="inline-flex items-center px-12 py-5 bg-linear-to-r from-[#429795] to-[#2D7A7F] text-white font-bold rounded-xl text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-[#DBC2A9]/30"
          >
            Sign Up Today
          </Link>
        </div>
      </section>
    </div>
  );
}
