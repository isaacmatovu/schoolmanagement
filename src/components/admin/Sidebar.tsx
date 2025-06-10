"use client";
import { useState } from "react";
import { PiStudentFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";
import Student from "./Student";

// Import your components for each section

export default function Sidebar() {
  const [active, setActive] = useState("Students");

  // Function to render the appropriate component based on active state
  const renderComponent = () => {
    switch (active) {
      case "Students":
        return <Student />;
      // case "Teachers":
      //   return <Teachers />;
      // case "Classes":
      //   return <Classes />;
      default:
        return <Student />;
    }
  };

  return (
    <div className="flex w-full h-screen">
      {/* Sidebar */}
      <div className="flex flex-col items-start justify-start bg-gray-100 p-6 gap-y-5 border-r border-gray-400 w-[20%]">
        <p className="text-2xl">Management</p>

        {/* Students Link */}
        <div
          className={`flex items-center justify-center gap-x-4 rounded-lg py-2 px-4 cursor-pointer w-full ${
            active === "Students"
              ? "bg-blue-500 text-white"
              : "hover:bg-blue-300 text-black"
          }`}
          onClick={() => setActive("Students")}
        >
          <p className="text-2xl">Students</p>
          <PiStudentFill className="text-2xl" />
        </div>

        {/* Teachers Link */}
        <div
          className={`flex items-center justify-center gap-x-4 rounded-lg py-2 px-4 cursor-pointer w-full ${
            active === "Teachers"
              ? "bg-blue-500 text-white"
              : "hover:bg-blue-300 text-black"
          }`}
          onClick={() => setActive("Teachers")}
        >
          <p className="text-2xl">Teachers</p>
          <FaChalkboardTeacher className="text-2xl" />
        </div>

        {/* Classes Link */}
        <div
          className={`flex items-center justify-center gap-x-7 rounded-lg py-2 px-4 cursor-pointer w-full ${
            active === "Classes"
              ? "bg-blue-500 text-white"
              : "hover:bg-blue-300 text-black"
          }`}
          onClick={() => setActive("Classes")}
        >
          <p className="text-2xl">Classes</p>
          <IoBookOutline className="text-2xl" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6">{renderComponent()}</div>
    </div>
  );
}
