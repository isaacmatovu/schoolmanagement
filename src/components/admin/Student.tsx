import { PiStudentThin } from "react-icons/pi";
import Button from "@/components/common/Button";
import StudentStatistics from "./StudentStatistics";

export default function Student() {
  return (
    <div className="flex justify-between">
      <div>
        <div>
          <h1 className="text-2xl text-gray-600">Student</h1>
          <p className="text-xl text-gray-600">
            Manage Student record and enrollment
          </p>
        </div>
        <form className="flex flex-col gap-y-4 w-full max-w-[300px] border border-gray-400 p-4 rounded-lg">
          <div className="flex justify-center items-center">
            <h1>Register Student</h1>
            <PiStudentThin className="text-4xl text-blue-500" />
          </div>
          <label className="text-sm flex justify-between items-center">
            Name
            <input
              type="text"
              placeholder="Enter name"
              className="border border-gray-300 shadow-2xl py-2 px-1 rounded-lg focus:outline-none"
            />
          </label>
          <label className="text-sm flex justify-between items-center">
            Email
            <input
              type="email"
              placeholder="Enter email"
              className="border border-gray-300 shadow-2xl py-2 px-1 rounded-lg focus:outline-none"
            />
          </label>
          <label className="text-sm flex justify-between items-center">
            Tel
            <input
              type="text"
              placeholder="Enter phone number"
              className="border border-gray-300 shadow-2xl py-2 px-1 rounded-lg focus:outline-none"
            />
          </label>
          <label className="text-sm flex justify-between items-center">
            Password
            <input
              type="password"
              placeholder="Enter password"
              className="border border-gray-300 shadow-2xl py-2 px-1 rounded-lg focus:outline-none"
            />
          </label>
          <Button text="Register" />
        </form>
      </div>
      <div className="flex justify-start items-center gap-x-4">
        <Button text="View Student" />
        <Button text="Import Students" />
      </div>
      <div className="pt-9">
        <StudentStatistics />
      </div>
    </div>
  );
}
