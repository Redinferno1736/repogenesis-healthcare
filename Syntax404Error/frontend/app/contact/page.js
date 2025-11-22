"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Navbar from "../Navbar/page";

export default function ContactPage() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-[#F2E6C9]/20 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-3xl border border-[#DBC2A9]"
      >
        <h1 className="text-4xl font-extrabold text-[#1B1B3A] text-center mb-8">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Contact Info */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-5"
          >
            <h2 className="text-2xl font-semibold text-[#1B1B3A] mb-3">
              Get in Touch
            </h2>

            <div className="flex items-center gap-3">
              <Mail className="text-[#2D7A7F]" />
              <p className="text-[#1B1B3A]/80">support@medsphere.com</p>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="text-[#2D7A7F]" />
              <p className="text-[#1B1B3A]/80">+91 98765 43210</p>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="text-[#2D7A7F]" />
              <p className="text-[#1B1B3A]/80">
                MedSphere HQ, Bengaluru, India
              </p>
            </div>

            <p className="text-[#1B1B3A]/70 text-sm leading-relaxed">
              For inquiries, feedback, or support, feel free to contact us.
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-5"
          >
            <div>
              <label className="text-[#1B1B3A] font-medium">Full Name</label>
              <input
                type="text"
                className="mt-1 w-full p-3 rounded-xl border border-[#DBC2A9] focus:ring-2 focus:ring-[#2D7A7F] outline-none"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="text-[#1B1B3A] font-medium">Email</label>
              <input
                type="email"
                className="mt-1 w-full p-3 rounded-xl border border-[#DBC2A9] focus:ring-2 focus:ring-[#2D7A7F] outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="text-[#1B1B3A] font-medium">Message</label>
              <textarea
                rows="4"
                className="mt-1 w-full p-3 rounded-xl border border-[#DBC2A9] focus:ring-2 focus:ring-[#2D7A7F] outline-none"
                placeholder="Write your message..."
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl text-white font-semibold bg-linear-to-r from-[#2D7A7F] to-[#429795] flex items-center justify-center gap-2 shadow-md"
            >
              Send Message <Send size={18} />
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </div>
    </>
  );
}
