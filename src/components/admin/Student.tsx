import Button from "@/components/common/Button";
import StudentStatistics from "./StudentStatistics";
import Form from "../common/form";
import { useState, useEffect } from "react";
import { fetchStudentsByClass } from "../services/StudentService";

interface Student {
  id: string;
  name: string;
  stream: string;
  class: string;
}

export default function Student() {
  const [showClass, setShowClass] = useState<boolean>(false);
  const [showClassDropdown, setShowClassDropdown] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch students when selectedClass changes
  useEffect(() => {
    const loadStudents = async () => {
      if (selectedClass) {
        setLoading(true);
        try {
          const data = await fetchStudentsByClass(selectedClass);
          setStudents(data);
          setError("");
        } catch {
          const message: string = "Failed to fetch students";
          setError(message);
        } finally {
          setLoading(false);
        }
      }
    };

    loadStudents();
  }, [selectedClass]);

  const toggleClassDropdown = () => {
    setShowClassDropdown(!showClassDropdown);
  };

  const handleClassSelect = (classLevel: string) => {
    setSelectedClass(classLevel);
    setShowClassDropdown(false);
  };

  const handleClass = () => {
    setShowClass(!showClass);
  };

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      {}
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div>
          <h1 className="text-2xl font-medium text-gray-600">Student</h1>
          <p className="text-lg text-gray-600">
            Manage Student record and enrollment
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 relative">
          <div className="relative">
            <div className="flex gap-x-2">
              <Button onClick={toggleClassDropdown}>
                {selectedClass ? `Class ${selectedClass}` : "View Students"}
              </Button>
              <Button onClick={handleClass}>
                {" "}
                {showClass ? "Close class" : "Open class"}
              </Button>
            </div>

            {showClassDropdown && (
              <div className="absolute left-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
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

      {/* Student List Section */}
      {showClass && selectedClass ? (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Students in Class {selectedClass}
          </h2>

          {loading ? (
            <p>Loading students...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : students.length === 0 ? (
            <p>No students found for this class</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stream
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Class
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student: Student) => (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.stream}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.class}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="flex-1 lg:flex-[2]">
            <Form title="Student" />
          </div>

          <div className="flex-1 lg:flex-[1]">
            <StudentStatistics
              studentStats="Student Statistics"
              TotalStats={students.length}
            />
          </div>
        </div>
      )}
    </div>
  );
}
