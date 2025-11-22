"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";


const page = () => {
   const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#F2E6C9]/95 backdrop-blur-md shadow-lg"
            : "bg-[#F2E6C9]/70 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
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

            {/* Nav Links */}
            <div className="hidden md:flex space-x-8">
              {["Features", "How It Works", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(/\s+/g, "")}`}
                  className="relative text-[#1B1B3A]/80 hover:text-[#2D7A7F] font-medium transition-colors duration-200 py-2 group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#429795] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link
                href="/dlogin"
                className="hidden md:block px-5 py-2.5 text-sm font-semibold text-[#2D7A7F] hover:bg-[#429795]/10 rounded-lg transition duration-200"
              >
                Doctor Login
              </Link>
              <Link
                href="/plogin"
                className="px-6 py-2.5 text-sm font-semibold text-white bg-linear-to-r from-[#2D7A7F] to-[#429795] rounded-lg hover:shadow-lg hover:shadow-[#429795]/30 transition-all duration-200"
              >
                Patient Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>
  )
}

export default page