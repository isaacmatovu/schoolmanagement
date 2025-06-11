import { PiStudentFill } from "react-icons/pi";
interface StudentProps {
  studentStats: string;
  TotalStats: number;
}

export default function StudentStatistics(props: StudentProps) {
  const { studentStats, TotalStats } = props;
  return (
    <div className="w-full max-w-[400px] border border-gray-400 p-4 rounded-lg shadow-lg">
      <div className="flex justify-between bg-gray-200 border-b border-gray-400 p-4 rounded-lg">
        <h1>{studentStats}</h1>
        <PiStudentFill className="text-3xl text-blue-400" />
      </div>
      <div className="flex gap-x-3">
        <p>{TotalStats}</p>
      </div>
    </div>
  );
}
