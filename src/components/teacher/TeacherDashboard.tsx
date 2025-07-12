"use client";
import { useEffect, useState } from "react";
import { PiStudentFill } from "react-icons/pi";
import Button from "../common/Button";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { useRouter } from "next/navigation";
import { fetchStudentsByClass } from "../services/StudentService";
import Marks from "./marks";

// import Students from "../Students/Students";
interface Students {
  id: string;
  name: string;
  stream: string;
  class: string;
}

export default function TeacherSideBar() {
  const [active, setActive] = useState("Students");
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState<Students[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();
  const [displayMarks, setDisplayMarks] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

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
  const handleMarks = (student: Students): void => {
    console.log("Selected student:", student); // Debug log
    setDisplayMarks(true);
    setSelectedStudent(student);
  };

  const handleClose = (): void => {
    setDisplayMarks(false);
    setSelectedStudent(null);
  };

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
      <div className="flex-1 p-4 sm:p-6 overflow-auto">
        {displayMarks && selectedStudent && (
          <Marks handleClose={handleClose} student={selectedStudent} />
        )}
        {selectedClass && !displayMarks && (
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
                    {students.map((student: Students) => (
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
                        <td
                          onClick={() => handleMarks(student)}
                          className="px-6 py-4 whitespace-nowrap cursor-pointer hover:text-blue-600"
                        >
                          Add marks
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap cursor-pointer hover:text-blue-600">
                          Edit marks
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

//
