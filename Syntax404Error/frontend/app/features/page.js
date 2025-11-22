"use client";

import { CheckCircle, ShieldCheck, HeartPulse, UploadCloud, Stethoscope } from "lucide-react";
import Navbar from "../Navbar/page";

export default function FeaturesPage() {
  const features = [
    {
      title: "Smart Health Tracking",
      description: "Automatically track symptoms and health history with intelligent analysis.",
      icon: HeartPulse,
    },
    {
      title: "Secure Medical Records",
      description: "Upload and store reports safely with encryption and secure cloud processing.",
      icon: UploadCloud,
    },
    {
      title: "Verified Doctors",
      description: "Consult only certified and trusted medical professionals on the platform.",
      icon: ShieldCheck,
    },
    {
      title: "AI-Based Suggestions",
      description: "Get AI-powered insights to help you understand your symptoms better.",
      icon: Stethoscope,
    },
    {
      title: "Appointment Management",
      description: "Schedule and manage doctor appointments with real-time updates.",
      icon: CheckCircle,
    },
  ];

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-[#F2E6C9]/20 pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-[#1B1B3A]">Features</h1>
        <p className="text-[#1B1B3A]/70 mt-4 max-w-2xl mx-auto">
          MedSphere brings advanced tools to simplify patient care and enhance the doctor–patient experience.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white border border-[#DBC2A9] rounded-2xl p-8 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer"
          >
            <f.icon className="w-12 h-12 text-[#2D7A7F] mb-5" />
            <h2 className="text-xl font-semibold text-[#1B1B3A]">{f.title}</h2>
            <p className="mt-3 text-[#1B1B3A]/70">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
