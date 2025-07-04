"use client";
import { useState } from "react";
import { PiStudentFill } from "react-icons/pi";
import Button from "../common/Button";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { useRouter } from "next/navigation";

// import Students from "../Students/Students";

export default function TeacherSideBar() {
  const [active, setActive] = useState("Students");
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const router = useRouter();

  const toggleStudentDropdown = () => {
    setShowStudentDropdown(!showStudentDropdown);
    if (active !== "Students") {
      setActive("Students");
    }
  };

  const handleLogOut = async (): Promise<void> => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      alert("failed to logout" + error);
    }
  };

  const handleClassSelect = (classLevel: string) => {
    setSelectedClass(classLevel);
    setShowStudentDropdown(false);
    // You can add additional logic here for when a class is selected
  };

  // const renderComponent = () => {
  //   return (
  //     // Your existing render logic
  //     // <Students />
  //   );
  // };

  return (
    <div className="flex flex-col sm:flex-row w-full min-h-screen">
      {/* Sidebar */}
      <div className="flex flex-row sm:flex-col bg-gray-100 p-2 sm:p-4 gap-2 border-b sm:border-r border-gray-300 w-full sm:w-52 md:w-64">
        <p className="hidden sm:block text-xl md:text-2xl font-semibold p-2 md:p-4">
          Management
        </p>

        {/* Students Link with Dropdown */}
        <div className="relative flex-1 sm:flex-none">
          <div
            className={`flex items-center justify-center sm:justify-start gap-3 rounded-lg p-3 cursor-pointer transition-colors ${
              active === "Students"
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-300 text-black"
            }`}
            onClick={toggleStudentDropdown}
          >
            <PiStudentFill className="text-xl md:text-2xl" />
            <p className="text-sm sm:text-base md:text-lg select-none">
              {showStudentDropdown ? "Close Menu" : "Students"}
            </p>
          </div>

          {/* Dropdown Menu */}
          {showStudentDropdown && (
            <div className="absolute left-0 sm:left-full sm:top-0 sm:ml-2 mt-1 w-full sm:w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <div
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded-t-md"
                onClick={() => setShowStudentDropdown(false)}
              >
                Select Class
              </div>
              <div className="border-t border-gray-200">
                {["S1", "S2", "S3", "S4", "S5", "S6"].map((classLevel) => (
                  <div
                    key={classLevel}
                    className={`px-4 py-2 hover:bg-blue-100 cursor-pointer ${
                      selectedClass === classLevel
                        ? "bg-blue-50 font-medium"
                        : ""
                    }`}
                    onClick={() => handleClassSelect(classLevel)}
                  >
                    {classLevel}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Teachers Link */}
        <Button text="Logout" onClick={handleLogOut}>
          <FiLogOut className="text-xl md:text-2xl" />
        </Button>
      </div>

      {/* Main Content Area */}
      {/* <div className="flex-1 p-4 sm:p-6 overflow-auto">{renderComponent()}</div> */}
    </div>
  );
}

//
