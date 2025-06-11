import { PiStudentThin } from "react-icons/pi";
import Button from "./Button";
interface FormProps {
  title: string;
}

export default function Form(props: FormProps) {
  const { title } = props;
  return (
    <form className="flex flex-col gap-y-4 w-full max-w-[300px] border border-gray-400 p-4 rounded-lg">
      <div className="flex justify-center items-center">
        <h1>Register {title}</h1>
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
  );
}
