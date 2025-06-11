import Button from "@/components/common/Button";
import StudentStatistics from "./StudentStatistics";
import Form from "../common/form";
import { useState } from "react";

export default function Student() {
  const [showClassDropdown, setShowClassDropdown] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");

  const toggleClassDropdown = () => {
    setShowClassDropdown(!showClassDropdown);
  };

  const handleClassSelect = (classLevel: string) => {
    setSelectedClass(classLevel);
    setShowClassDropdown(false);
    // You can add additional logic here for when a class is selected
    console.log("Selected class:", classLevel);
  };

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div>
          <h1 className="text-2xl font-medium text-gray-600">Student</h1>
          <p className="text-lg text-gray-600">
            Manage Student record and enrollment
          </p>
        </div>

        {/* Buttons - positioned differently based on screen size */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 relative">
          <div className="relative">
            <Button onClick={toggleClassDropdown}>
              {showClassDropdown ? "Close Class" : "View Students"}
            </Button>

            {/* Dropdown Menu */}
            {showClassDropdown && (
              <div className="absolute left-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded-t-md"
                  onClick={() => setShowClassDropdown(false)}
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

          <Button>Import Students</Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Form Section - takes full width on mobile, 2/3 on larger screens */}
        <div className="flex-1 lg:flex-[2]">
          <Form title="Student" />
        </div>

        {/* Statistics Section - appears below on mobile, to the side on larger screens */}
        <div className="flex-1 lg:flex-[1]">
          <StudentStatistics
            studentStats="Student Statistics"
            TotalStats={67}
          />
        </div>
      </div>
    </div>
  );
}
