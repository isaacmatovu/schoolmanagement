import { ChangeEvent, FormEvent, useState } from "react";
import Button from "../common/Button";
import { addMarks } from "../services/MarksService";

interface MarksProps {
  handleClose: () => void;
  student: any; // Changed to receive full student object
}

export default function Marks(props: MarksProps) {
  const { handleClose, student } = props;
  const [marksData, setMarksData] = useState({
    subject: "",
    marks: "",
    examType: "BOT",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validation
    if (!marksData.subject) {
      setError("Subject is required");
      return;
    }

    const marksValue = Number(marksData.marks);
    if (isNaN(marksValue)) {
      setError("Please enter valid marks");
      return;
    }
    if (marksValue < 0 || marksValue > 100) {
      setError("Marks must be between 0-100");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await addMarks(student.id, {
        subject: marksData.subject,
        marks: marksValue,
        examType: marksData.examType,
      });

      setSuccess(true);
      setMarksData({ subject: "", marks: "", examType: "BOT" });

      // Auto-close after success
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err) {
      setError("Failed to add marks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setMarksData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4">
          Add Marks for {student.name} ({student.class})
        </h2>

        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
            Marks added successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4 justify-center items-center flex-wrap">
            <div className="flex flex-col">
              <label>Subject</label>
              <input
                value={marksData.subject}
                name="subject"
                type="text"
                className="w-52 border border-gray-400 p-2 rounded"
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="flex flex-col">
              <label>Marks (0-100)</label>
              <input
                value={marksData.marks}
                name="marks"
                type="number"
                min="0"
                max="100"
                className="w-28 border border-gray-400 p-2 rounded"
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="flex flex-col">
              <label>Exam Type</label>
              <select
                className="w-52 border border-gray-400 p-2 rounded"
                name="examType"
                onChange={handleChange}
                value={marksData.examType}
                disabled={loading}
              >
                <option value="BOT">Beginning of Term</option>
                <option value="midterm">Midterm</option>
                <option value="final">Final</option>
                <option value="quiz">Quiz</option>
              </select>
            </div>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="flex justify-center gap-4 mt-6">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
            <Button onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
