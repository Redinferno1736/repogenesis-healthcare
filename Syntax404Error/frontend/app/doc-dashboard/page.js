"use client";

import {
  ShieldCheck,
  Bell,
  AlertTriangle,
  BrainCircuit,
  History,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function DoctorDashboard() {
  return (
    <div className="bg-gray-50 font-sans text-gray-800 min-h-screen">

      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <Link href="#" className="flex items-center group">
              <div className="bg-[#429795]/10 p-2 rounded-lg mr-3 border border-[#2D7A7F]/20 transition-transform duration-300 group-hover:scale-110">
                <ShieldCheck className="w-6 h-6 text-[#2D7A7F]" />
              </div>

              {/* Clean static text instead of TextPressure */}
              <div className="text-3xl font-semibold text-[#1B1B3A] select-none font-sans tracking-tight">
                Med
              </div>
              <div className="text-3xl font-semibold text-[#429795] select-none font-sans tracking-tight">
                Sphere
              </div>
            </Link>

            {/* Profile */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex flex-col items-end mr-2">
                <span className="text-sm font-bold text-gray-700">
                  Dr. Sarah Jenkins
                </span>
                <span className="text-xs text-gray-500">
                  Cardiology Specialist
                </span>
              </div>

              <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>

              <Link
                href="/"
                className="text-sm font-medium text-red-600 hover:text-red-800"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#08314A]">Patient Queue</h1>
            <p className="text-gray-500 text-sm mt-1">
              Prioritized by symptom severity & AI risk assessment.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-4 md:mt-0 flex space-x-3">
            <div className="flex items-center px-4 py-2 bg-red-50 border border-red-100 rounded-lg">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2 animate-pulse"></div>
              <span className="text-sm font-bold text-red-700">3 Critical</span>
            </div>

            <div className="flex items-center px-4 py-2 bg-blue-50 border border-blue-100 rounded-lg">
              <span className="text-sm font-bold text-blue-700">
                12 Total Waiting
              </span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          <button className="px-4 py-2 bg-[#08314A] text-white text-sm font-medium rounded-full shadow-md">
            All Patients
          </button>
          <button className="px-4 py-2 bg-white text-gray-600 border border-gray-200 text-sm font-medium rounded-full hover:bg-gray-50">
            Critical Only
          </button>
          <button className="px-4 py-2 bg-white text-gray-600 border border-gray-200 text-sm font-medium rounded-full hover:bg-gray-50">
            Waiting Results
          </button>
          <button className="px-4 py-2 bg-white text-gray-600 border border-gray-200 text-sm font-medium rounded-full hover:bg-gray-50">
            Post-Op Follow Up
          </button>
        </div>

        {/* PRIORITY LIST */}
        <div className="space-y-4">

          {/* Patient 1 – CRITICAL */}
          <div className="patient-card bg-white rounded-xl border-l-8 border-red-500 shadow-sm p-5 flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex-1 min-w-0 mb-4 md:mb-0">

              <div className="flex items-center mb-1">
                <h3 className="text-lg font-bold text-gray-900 mr-3">
                  James H. (58M)
                </h3>

                <span className="badge-critical px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide flex items-center">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  High Severity
                </span>

                <span className="ml-2 text-xs text-gray-400">Wait time: 10m</span>
              </div>

              <p className="text-gray-600 text-sm mb-2">
                <span className="font-semibold">Chief Complaint:</span>{" "}
                &quot;Crushing chest pain radiating to left arm, shortness of breath.&quot;
              </p>

              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span className="flex items-center">
                  <BrainCircuit className="w-4 h-4 mr-1 text-[#00A0A9]" />
                  AI Risk:
                  <strong className="ml-1 text-red-600">
                    92% (MI Likely)
                  </strong>
                </span>

                <span className="flex items-center">
                  <History className="w-4 h-4 mr-1" /> History: Hypertension,
                  Smoker
                </span>
              </div>

            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
                View History
              </button>

              <Link href='/report'><button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 shadow-lg shadow-red-200 flex items-center">
                Start Consult
                <ArrowRight className="w-4 h-4 ml-2" />
              </button></Link>
            </div>
          </div>

          {/* Patient 2 – MODERATE */}
          <div className="patient-card bg-white rounded-xl border-l-8 border-yellow-400 shadow-sm p-5 flex flex-col md:flex-row justify-between">
            <div className="flex-1 min-w-0 mb-4 md:mb-0">

              <div className="flex items-center mb-1">
                <h3 className="text-lg font-bold text-gray-900 mr-3">
                  Linda K. (34F)
                </h3>

                <span className="badge-moderate px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide">
                  Moderate Severity
                </span>

                <span className="ml-2 text-xs text-gray-400">Wait time: 25m</span>
              </div>

              <p className="text-gray-600 text-sm mb-2">
                <span className="font-semibold">Chief Complaint:</span>{" "}
                &quot;Persistent abdominal pain (lower right), nausea, low fever.&quot;
              </p>

              <div className="flex items-center text-xs text-gray-500">
                <BrainCircuit className="w-4 h-4 mr-1 text-[#00A0A9]" />
                AI Risk:
                <strong className="ml-1 text-yellow-600">
                  65% (Appendicitis?)
                </strong>
              </div>

            </div>

            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
                View History
              </button>

              <button className="px-4 py-2 bg-[#005F7B] text-white rounded-lg text-sm font-bold hover:bg-opacity-90 shadow-md">
                Start Consult
              </button>
            </div>
          </div>

          {/* Patient 3 – MODERATE */}
          <div className="patient-card bg-white rounded-xl border-l-8 border-yellow-400 shadow-sm p-5 flex flex-col md:flex-row justify-between">
            <div className="flex-1 min-w-0 mb-4 md:mb-0">

              <div className="flex items-center mb-1">
                <h3 className="text-lg font-bold text-gray-900 mr-3">
                  Robert M. (62M)
                </h3>

                <span className="badge-moderate px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide">
                  Moderate Severity
                </span>

                <span className="ml-2 text-xs text-gray-400">Wait time: 15m</span>
              </div>

              <p className="text-gray-600 text-sm mb-2">
                <span className="font-semibold">Chief Complaint:</span>{" "}
                &quot;Post-op wound redness and mild swelling (Knee Replacement).&quot;
              </p>

              <div className="flex items-center text-xs text-gray-500">
                <BrainCircuit className="w-4 h-4 mr-1 text-[#00A0A9]" />
                AI Risk:
                <strong className="ml-1 text-yellow-600">
                  45% (Possible Infection)
                </strong>
              </div>

            </div>

            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
                View History
              </button>

              <button className="px-4 py-2 bg-[#005F7B] text-white rounded-lg text-sm font-bold hover:bg-opacity-90 shadow-md">
                Start Consult
              </button>
            </div>
          </div>

          {/* Patient 4 – STABLE */}
          <div className="patient-card bg-white rounded-xl border-l-8 border-emerald-400 shadow-sm p-5 flex flex-col md:flex-row justify-between opacity-80 hover:opacity-100">
            <div className="flex-1 min-w-0 mb-4 md:mb-0">

              <div className="flex items-center mb-1">
                <h3 className="text-lg font-bold text-gray-900 mr-3">
                  Emily R. (22F)
                </h3>

                <span className="badge-stable px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide">
                  Stable
                </span>

                <span className="ml-2 text-xs text-gray-400">Wait time: 5m</span>
              </div>

              <p className="text-gray-600 text-sm mb-2">
                <span className="font-semibold">Chief Complaint:</span>{" "}
                &quot;Routine follow-up for seasonal allergies.&quot;
              </p>

              <div className="flex items-center text-xs text-gray-500">
                <BrainCircuit className="w-4 h-4 mr-1 text-[#00A0A9]" />
                AI Risk:
                <strong className="ml-1 text-green-600">Low</strong>
              </div>

            </div>

            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
                View History
              </button>

              <button className="px-4 py-2 bg-[#00A0A9] text-white rounded-lg text-sm font-bold hover:bg-opacity-90 shadow-md">
                Start Consult
              </button>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
