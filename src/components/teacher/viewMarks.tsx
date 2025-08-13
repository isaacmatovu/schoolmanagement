import { useEffect, useState, useCallback } from "react";
import Button from "../common/Button";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../../firebase";
import { FaSpinner } from "react-icons/fa"; // Added spinner

interface Mark {
  id: string;
  subject: string;
  marks: number;
  examType: string;
  createdAt: Date | null;
}

interface Student {
  id: string;
  name: string;
  class: string;
}

interface ViewMarksProps {
  student: Student;
  handleCloseMarks: () => void;
}

export default function ViewMarks({
  student,
  handleCloseMarks,
}: ViewMarksProps) {
  const [marks, setMarks] = useState<Mark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const marksRef = collection(db, "students", student.id, "marks");
        const q = query(marksRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        const marksData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            subject: data.subject || "N/A", // Handle missing subject
            marks: data.marks || 0, // Handle missing marks
            examType: data.examType || "N/A", // Handle missing examType
            createdAt: data.createdAt?.toDate() || null,
          };
        });

        setMarks(marksData);
        setError("");
      } catch (err) {
        console.error("Error fetching marks:", err);
        setError("Failed to load marks data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMarks();
  }, [student.id]);

  // Memoize formatting function
  const formatExamType = useCallback((type: string) => {
    switch (type) {
      case "BOT":
        return "Beginning of Term";
      case "midterm":
        return "Midterm";
      case "final":
        return "Final";
      case "quiz":
        return "Quiz";
      default:
        return type;
    }
  }, []);

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] z-50"
      onClick={handleCloseMarks} // Close when clicking backdrop
    >
      <div
        className="bg-white rounded-3xl p-6 w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {student.name}'s Marks ({student.class})
          </h2>
          <Button onClick={handleCloseMarks}>Close</Button>
        </div>

        {loading && (
          <div className="text-center py-8 flex flex-col items-center">
            <FaSpinner className="animate-spin text-3xl text-blue-500 mb-2" />
            <p>Loading marks...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        {!loading && !error && marks.length === 0 && (
          <div className="text-center py-8">
            <p>No marks found for this student</p>
          </div>
        )}

        {!loading && marks.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exam Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Marks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Added
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {marks.map((mark) => (
                  <tr key={mark.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {mark.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatExamType(mark.examType)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {mark.marks}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {mark.createdAt?.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }) || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
