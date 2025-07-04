"use client";
import { useState } from "react";
import { PiStudentFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
// import { RiParentFill } from "react-icons/ri";
import Student from "./Student";
import Teachers from "./Teacher";
import { FiLogOut } from "react-icons/fi";
import Button from "../common/Button";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";

export default function Sidebar() {
  const [active, setActive] = useState("Students");
  const router = useRouter();

  const renderComponent = () => {
    switch (active) {
      case "Students":
        return <Student />;
      case "Teachers":
        return <Teachers />;
      // case "Parent":
      //   return <Parent />;
      default:
        return <Student />;
    }
  };

  const handleLogOut = async (): Promise<void> => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      alert("Failed to logout:" + error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row w-full min-h-screen">
      {/* Sidebar */}
      <div className="flex flex-row sm:flex-col bg-gray-100 p-2 sm:p-4 gap-2 border-b sm:border-r border-gray-300 w-full sm:w-52 md:w-64">
        <p className="hidden sm:block text-xl md:text-2xl font-semibold p-2 md:p-4">
          Management
        </p>

        {/* Students Link */}
        <div
          className={`flex items-center justify-center sm:justify-start gap-3 rounded-lg p-3 cursor-pointer transition-colors flex-1 sm:flex-none ${
            active === "Students"
              ? "bg-blue-500 text-white"
              : "hover:bg-blue-300 text-black"
          }`}
          onClick={() => setActive("Students")}
        >
          <PiStudentFill className="text-xl md:text-2xl" />
          <p className="text-sm sm:text-base md:text-lg">Students</p>
        </div>

        {/* Teachers Link */}
        <div
          className={`flex items-center justify-center sm:justify-start gap-3 rounded-lg p-3 cursor-pointer transition-colors flex-1 sm:flex-none ${
            active === "Teachers"
              ? "bg-blue-500 text-white"
              : "hover:bg-blue-300 text-black"
          }`}
          onClick={() => setActive("Teachers")}
        >
          <FaChalkboardTeacher className="text-xl md:text-2xl" />
          <p className="text-sm sm:text-base md:text-lg">Teachers</p>
        </div>

        {/* Parent Link (commented out) */}
        <Button text="LogOut" onClick={handleLogOut}>
          <FiLogOut className="text-xl md:text-2xl" />
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-auto">{renderComponent()}</div>
    </div>
  );
}
//  <FiLogOut className="text-xl md:text-2xl" />
