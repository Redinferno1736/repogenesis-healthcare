"use client";

import { ClipboardList, UploadCloud, FileSearch, MessageCircleHeart, CheckCircle } from "lucide-react";
import Navbar from "../Navbar/page";

export default function HowItWorks() {
  const steps = [
    {
      title: "Create Your Account",
      desc: "Sign up as a patient and set up your basic health profile.",
      icon: ClipboardList,
    },
    {
      title: "Upload Previous Reports",
      desc: "If you have prior health records, upload them for better doctor assessment.",
      icon: UploadCloud,
    },
    {
      title: "Describe Your Symptoms",
      desc: "Tell us what you're experiencing so we can guide your next steps.",
      icon: FileSearch,
    },
    {
      title: "Connect With a Doctor",
      desc: "We match you with verified doctors based on your symptoms and history.",
      icon: MessageCircleHeart,
    },
    {
      title: "Get Your Treatment Plan",
      desc: "Receive a detailed diagnosis and follow-up care recommendations.",
      icon: CheckCircle,
    },
  ];

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-[#F2E6C9]/20 pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-[#1B1B3A]">How It Works</h1>
        <p className="text-[#1B1B3A]/70 mt-4 max-w-2xl mx-auto">
          MedSphere simplifies medical journeys with an easy and connected care flow.
        </p>
      </div>

      <div className="max-w-5xl mx-auto mt-16 space-y-10">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-start gap-6 bg-white border border-[#DBC2A9] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
          >
            <div className="bg-[#2D7A7F]/10 rounded-xl p-4">
              <step.icon className="w-10 h-10 text-[#2D7A7F]" />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#1B1B3A]">
                Step {index + 1}: {step.title}
              </h3>
              <p className="text-[#1B1B3A]/70 mt-2">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
