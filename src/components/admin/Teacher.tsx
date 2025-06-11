import Button from "@/components/common/Button";
import StudentStatistics from "./StudentStatistics";
import Form from "../common/form";

export default function Student() {
  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div>
          <h1 className="text-2xl font-medium text-gray-600">Teacher</h1>
          <p className="text-lg text-gray-600">
            Manage Teacher record and enrollment
          </p>
        </div>

        {/* Buttons - positioned differently based on screen size */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button>View Teachers</Button>
          <Button>Import Teacher</Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Form Section - takes full width on mobile, 2/3 on larger screens */}
        <div className="flex-1 lg:flex-[2]">
          <Form title="Teacher" />
        </div>

        {/* Statistics Section - appears below on mobile, to the side on larger screens */}
        <div className="flex-1 lg:flex-[1]">
          <StudentStatistics
            studentStats="Teacher Statistics"
            TotalStats={67}
          />
        </div>
      </div>
    </div>
  );
}
