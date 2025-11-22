"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
// import { useRouter } from "next/router";
import { useRouter } from 'next/navigation';
import { User } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import {
  ShieldCheck,
  X,
  Microscope,
  Sparkles,
  CheckCircle,
  XCircle,
  History,
  BrainCircuit,
} from "lucide-react";
import Chart from "chart.js/auto";
import Link from "next/link";

export default function ReportPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const risk_label = searchParams.get('risk_label');
  const age = searchParams.get('age');
  const sex = searchParams.get('sex');
  const symptoms = searchParams.get('symptoms');
  const name = searchParams.get('name'); const triageRef = useRef(null);
  const triageChartRef = useRef(null);

  useEffect(() => {
    // Create triage doughnut chart
    if (!triageRef.current) return;

    const ctx = triageRef.current.getContext("2d");
    if (!ctx) return;

    // destroy previous if present (hot reload safety)
    // @ts-ignore
    if (triageChartRef.current) {
      // @ts-ignore
      triageChartRef.current.destroy();
      triageChartRef.current = null;
    }

    // Chart config
    // (thin donut ring showing 'risk' percentage)
    // Data driven example: risk 92, safe 8
    // Colors intentionally match theme
    // @ts-ignore
    triageChartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Risk", "Safe"],
        datasets: [
          {
            data: [risk_label * 100, 100 - risk_label * 100],
            backgroundColor: ["#EF4444", "#E5E7EB"],
            borderWidth: 0,
            cutout: "85%",
            radius: "100%",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
      },
    });

    return () => {
      // cleanup chart
      // @ts-ignore
      if (triageChartRef.current) {
        // @ts-ignore
        triageChartRef.current.destroy();
        triageChartRef.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Theme CSS variables - you may move this to globals.css */}
      <style jsx global>{`
        :root {
          --color-main: #00a0a9;
          --color-secondary-accent: #005f7b;
          --color-dark: #08314a;
        }
        .text-main {
          color: var(--color-main);
        }
        .bg-main {
          background-color: var(--color-main);
        }
        .bg-secondary-accent {
          background-color: var(--color-secondary-accent);
        }
        .text-dark {
          color: var(--color-dark);
        }
        .bg-dark {
          background-color: var(--color-dark);
        }
      `}</style>

      {/* NAV */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center group">
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

            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold uppercase flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Live Backend Feed
              </span>

              <a
                href="/doc-dashboard"
                className="text-sm font-medium text-gray-500 hover:text-main flex items-center"
              >
                <X className="w-4 h-4 mr-1" />
                Close Patient
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* PATIENT HEADER */}
        <div className="bg-dark rounded-2xl p-6 text-white shadow-xl mb-8 flex flex-col md:flex-row items-start justify-between relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-64 h-64 bg-main opacity-10 rounded-full -mr-20 -mt-20 blur-3xl"
            aria-hidden
          />
          <div className="flex items-center z-10">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-2xl font-bold border-2 border-white/20">
              {/* Initials */}
              <User />
            </div>
            <div className="ml-5">
              <h1 className="text-2xl font-bold">{name}</h1>
              <div className="flex items-center text-gray-300 text-sm mt-1 space-x-4">
                <span>
                  <span className="inline-block mr-1">
                    {/* hash icon as text fallback */}
                    <svg className="w-3 h-3 inline" viewBox="0 0 24 24" fill="currentColor"><path d="M10 3v2h-3v2h3v8h-3v2h3v4h2v-4h3v-2h-3v-8h3V5h-3V3h-2z" /></svg>
                  </span>
                  ID: P-9982-X
                </span>
                <span>
                  <svg className="w-3 h-3 inline mr-1" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10h2v2H7v-2zm4 0h2v2h-2v-2z" /></svg>
                  {age} Years / {sex}
                </span>
                <span>
                  <svg className="w-3 h-3 inline mr-1" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /></svg>
                  Type: O+
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 md:mt-0 flex space-x-4 z-10">
            <div className="text-right">
              <div className="text-xs text-gray-400 uppercase tracking-wider">Chief Complaint</div>
              <div className="font-semibold text-lg">Chest Pain & Dyspnea</div>
            </div>

            <div className="h-12 w-px bg-white/20 mx-2" />

            <div className="text-right">
              <div className="text-xs text-gray-400 uppercase tracking-wider">Admitted</div>
              <div className="font-semibold text-lg">NA</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 space-y-8">
            {/* Smart Diagnostic Engine */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-bold text-dark flex items-center">
                  <Microscope className="w-5 h-5 mr-2 text-main" />
                  Smart Diagnostic Optimization
                </h2>
                <span className="text-xs font-mono text-gray-500">Model: Dx-Optimizer-v4.2</span>
              </div>

              <div className="p-6">
                <div className="flex items-start mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <Sparkles className="w-5 h-5 text-main mr-3 mt-0.5" />
                  <p className="text-sm text-blue-900">
                    <strong>AI Insight:</strong> Based on the patient&apos;s history of <em>hypertension</em> and <em>recent normal lipid panel (3 weeks ago)</em>, the model suggests a targeted cardiac workup rather than a full metabolic screen.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Recommended Tests */}
                  <div>
                    <h3 className="text-sm font-bold text-green-700 uppercase tracking-wide mb-3 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Recommended Immediate Tests
                    </h3>

                    <ul className="space-y-2">
                      <li className="flex items-center justify-between p-3 bg-white border border-green-100 rounded-lg shadow-sm hover:shadow-md transition">
                        <span className="font-medium text-gray-800">High-Sensitivity Troponin I</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">High Priority</span>
                      </li>

                      <li className="flex items-center justify-between p-3 bg-white border border-green-100 rounded-lg shadow-sm hover:shadow-md transition">
                        <span className="font-medium text-gray-800">12-Lead ECG</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Standard</span>
                      </li>

                      <li className="flex items-center justify-between p-3 bg-white border border-green-100 rounded-lg shadow-sm hover:shadow-md transition">
                        <span className="font-medium text-gray-800">D-Dimer</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Rule-out PE</span>
                      </li>
                    </ul>
                  </div>

                  {/* Avoidable Tests */}
                  <div>
                    <h3 className="text-sm font-bold text-red-600 uppercase tracking-wide mb-3 flex items-center">
                      <XCircle className="w-4 h-4 mr-2" />
                      Low Value / Redundant Tests
                    </h3>

                    <ul className="space-y-2">
                      <li className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg opacity-75">
                        <span className="font-medium text-gray-500 line-through">Full Lipid Profile</span>
                        <span className="text-xs text-gray-400">Done 21 days ago</span>
                      </li>

                      <li className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg opacity-75">
                        <span className="font-medium text-gray-500 line-through">Chest MRI</span>
                        <span className="text-xs text-gray-400">Low Pre-test Prob.</span>
                      </li>

                      <li className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg opacity-75">
                        <span className="font-medium text-gray-500 line-through">Vitamin D Levels</span>
                        <span className="text-xs text-gray-400">Not urgent</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Historical Timeline */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-dark mb-6 flex items-center">
                <History className="w-5 h-5 mr-2 text-main" />
                Relevant Medical History
              </h2>

              <div className="relative border-l-2 border-gray-200 ml-3 space-y-8">
                <div className="relative pl-8">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-main rounded-full border-4 border-white shadow-sm"></div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                    <h4 className="font-bold text-gray-800">Hypertension Diagnosis</h4>
                    <span className="text-xs text-gray-500">Nov 2019</span>
                  </div>
                  <p className="text-sm text-gray-600">Started on Lisinopril 10mg. Controlled.</p>
                </div>

                <div className="relative pl-8">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-gray-300 rounded-full border-4 border-white shadow-sm"></div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                    <h4 className="font-bold text-gray-800">Appendectomy</h4>
                    <span className="text-xs text-gray-500">Aug 2015</span>
                  </div>
                  <p className="text-sm text-gray-600">Laparoscopic. No complications.</p>
                </div>

                <div className="relative pl-8">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-gray-300 rounded-full border-4 border-white shadow-sm"></div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                    <h4 className="font-bold text-gray-800">Smoker Status Recorded</h4>
                    <span className="text-xs text-gray-500">Jan 2010</span>
                  </div>
                  <p className="text-sm text-gray-600">1 Pack/Day average.</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-4 space-y-8">
            {/* Triage Score */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Triage Severity Score</h2>

              <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                <canvas ref={triageRef} id="triageChart" className="w-full h-full" />
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-4xl font-extrabold text-red-600">{risk_label * 100}</span>
                  <span className="text-xs font-bold text-gray-400">Percent</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                Patient flagged for immediate cardiac evaluation due to symptom cluster.
              </p>
            </div>

            {/* Complication Model */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-dark mb-4 flex items-center">
                <BrainCircuit className="w-5 h-5 mr-2 text-secondary-accent" />
                Complication Model
              </h2>

              <p className="text-xs text-gray-500 mb-4">
                Predictive analysis if <strong>Coronary Angioplasty</strong> is performed today.
              </p>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">Acute Kidney Injury (AKI)</span>
                    <span className="font-bold text-red-600">High (78%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: "78%" }} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Contributing factor: Pre-existing hypertension.</p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">Bleeding Event</span>
                    <span className="font-bold text-yellow-600">Moderate (45%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "45%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">Infection</span>
                    <span className="font-bold text-green-600">Low (12%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "12%" }} />
                  </div>
                </div>
              </div>

              <div className="mt-6 p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
                <h4 className="text-xs font-bold text-yellow-800 uppercase mb-1">Model Recommendation</h4>
                <p className="text-sm text-yellow-900">
                  Consider <strong>hydration protocol</strong> pre-procedure to mitigate AKI risk. Use minimal contrast dye.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
