"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Activity, History } from "lucide-react";
import { useRouter } from "next/navigation"

export default function PatientOnboarding() {
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [surgery, setSurgery] = useState("");

  const [step, setStep] = useState(1);
  const router = useRouter();
  const steps = [
    { id: 1, label: "History" },
    { id: 2, label: "Upload Reports" },
    { id: 3, label: "Final Details" },
  ];

  const next = () => setStep((s) => Math.min(3, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const onFinish = async () => {
    const payload = {
      AGE: Number(age),
      GENDER: sex,
      SYMPTOMS: symptoms,
      SURGERY_NAME: surgery,
    };

    // Send POST to Flask backend
    const res = await fetch("http://localhost:5000/api/predict-risk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    // Pass prediction result to /report page
    const queryParams = new URLSearchParams({
      risk_label: data.risk_label,
      name: data.name,
      age: age,
      sex: sex,
      symptoms: symptoms,
      surgery: surgery
    }).toString();

    router.push(`/report?${queryParams}`);

  };

  return (
    <div className="min-h-screen bg-[#F2E6C9]/20 flex flex-col items-center px-6 py-10 font-sans text-[#1B1B3A]">

      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-8 mb-12 select-none">
        {steps.map((s) => (
          <div key={s.id} className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300
              ${step >= s.id
                  ? "bg-linear-to-r from-[#2D7A7F] to-[#429795] text-white border-[#429795]"
                  : "bg-white border-[#DBC2A9] text-[#1B1B3A]/50"
                }`}
            >
              {s.id}
            </div>
            <span
              className={`text-sm font-semibold transition-opacity duration-300 ${step >= s.id ? "text-[#1B1B3A]" : "text-[#1B1B3A]/40"
                }`}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Card Container */}
      <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-xl border border-[#DBC2A9]">
        <AnimatePresence mode="wait">

          {/* STEP 1 ------------------------------------------------------ */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <History className="w-8 h-8 text-[#2D7A7F]" />
                Do you have a history of doctor visits?
              </h2>

              <div className="flex flex-col gap-4">
                <button
                  onClick={next}
                  className="px-6 py-4 rounded-xl w-full bg-linear-to-r from-[#2D7A7F] to-[#429795] text-white font-semibold hover:scale-105 transition duration-200"
                >
                  Yes, I have previous reports
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-4 rounded-xl w-full bg-white border-2 border-[#DBC2A9] text-[#1B1B3A] font-semibold hover:border-[#429795] hover:text-[#429795] transition duration-200"
                >
                  No, this is my first appointment
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2 ------------------------------------------------------ */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Upload className="w-8 h-8 text-[#2D7A7F]" />
                Upload Your Medical Reports
              </h2>

              <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-[#429795] rounded-xl p-10 cursor-pointer bg-[#F2E6C9]/20 hover:bg-[#F2E6C9]/40 transition duration-200">
                <Upload className="w-12 h-12 text-[#2D7A7F] mb-3" />
                <span className="font-semibold text-[#1B1B3A]">
                  Click to upload files
                </span>
                <input type="file" multiple className="hidden" />
              </label>

              <div className="flex justify-between mt-8">
                <button
                  onClick={prev}
                  className="px-6 py-3 rounded-xl bg-white border-2 border-[#DBC2A9] font-semibold hover:border-[#429795] hover:text-[#429795]"
                >
                  Back
                </button>

                <button
                  onClick={next}
                  className="px-6 py-3 rounded-xl bg-linear-to-r from-[#2D7A7F] to-[#429795] text-white font-semibold hover:scale-105 transition duration-200"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3 ------------------------------------------------------ */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Activity className="w-8 h-8 text-[#2D7A7F]" />
                Final Details
              </h2>

              {/* Sex + Age */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="font-semibold">Sex</label>
                  <select value={sex} onChange={(e) => setSex(e.target.value)}
                    className="w-full mt-2 p-4 border-2 border-[#DBC2A9] rounded-xl bg-white focus:border-[#429795] focus:ring-2 focus:ring-[#429795]/40 outline-none"
                  >
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>


                <div>
                  <label className="font-semibold">Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter your age"
                    className="w-full mt-2 p-4 border-2 border-[#DBC2A9] rounded-xl focus:border-[#429795] focus:ring-2 focus:ring-[#429795]/40 outline-none"
                  />
                </div>
              </div>

              {/* Symptoms */}
              <h3 className="text-xl font-bold mb-4">Describe Your Symptoms</h3>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows="6"
                className="w-full p-5 border-2 border-[#DBC2A9] rounded-xl focus:border-[#429795] focus:ring-2 focus:ring-[#429795]/40 outline-none transition"
                placeholder="Describe what symptoms you are experiencing..."
              ></textarea>

              {/* Surgery Name */}
              <h3 className="text-xl font-bold mb-4">Type of Surgery</h3>
              <input
                type="text"
                value={surgery}
                onChange={(e) => setSurgery(e.target.value)}
                placeholder="Enter your surgery name (e.g., CABG)"
                className="w-full p-5 border-2 border-[#DBC2A9] rounded-xl focus:border-[#429795] focus:ring-2 focus:ring-[#429795]/40 outline-none transition mb-4"
              />

              <div className="flex justify-between mt-8">
                <button
                  onClick={prev}
                  className="px-6 py-3 rounded-xl bg-white border-2 border-[#DBC2A9] font-semibold hover:border-[#429795] hover:text-[#429795]"
                >
                  Back
                </button>
                <button
                  onClick={onFinish}
                  className="px-6 py-3 rounded-xl bg-linear-to-r from-[#2D7A7F] to-[#429795] text-white font-semibold hover:scale-105 transition duration-200"
                >
                  Finish
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
