import Link from "next/link";
import Image from "next/image";

export default function RoleSelectionPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2E6C9]/20 p-6 font-sans text-[#1B1B3A]">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md text-center space-y-8 border border-[#DBC2A9]">
        <h1 className="text-3xl font-bold text-[#1B1B3A] select-none tracking-tight">
          Continue As
        </h1>

        <div className="flex flex-col gap-6">
          <Link
            href="/dsignup"
            className="w-full py-4 text-lg font-semibold rounded-xl transition duration-200 shadow-md flex items-center justify-center gap-3 bg-gradient-to-r from-[#2D7A7F] to-[#429795] text-white hover:scale-105 hover:shadow-lg"
          >
            <Image
              src="https://cdn-icons-png.flaticon.com/512/3887/3887511.png"
              alt="Doctor Icon"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            Doctor
          </Link>

          <Link
            href="/psignup"
            className="w-full py-4 text-lg font-semibold rounded-xl transition duration-200 shadow-md flex items-center justify-center gap-3 bg-gradient-to-r from-[#2D7A7F] to-[#4CAF50] text-white hover:scale-105 hover:shadow-lg"
          >
            <Image
              src="https://cdn-icons-png.flaticon.com/512/906/906175.png"
              alt="Patient Icon"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            Patient
          </Link>
        </div>
      </div>
    </div>
  );
}