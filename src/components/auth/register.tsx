"use client";
import { IoIosSchool } from "react-icons/io";
import { MdOutlineSecurity } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { TiMessageTyping } from "react-icons/ti";
import { FaBook } from "react-icons/fa";
import { ChangeEvent, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

interface Form {
  email: string;
  password: string;
  role: string;
}

export default function Regiter() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Form>({
    email: "",
    password: "",
    role: "Teacher",
  });

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await setDoc(doc(db, "users", userCredentials.user.uid), {
        uid: userCredentials.user.uid,
        role: formData.role,
      });
      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        alert("Registration failed:... " + error.message);
      } else {
        alert("Registration failed:... " + String(error));
      }
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-600 flex flex-col items-center justify-center py-8 gap-y-4 text-white">
          <IoIosSchool className="text-5xl" />
          <h1 className="text-3xl font-bold">Marks Management</h1>
          <p className="text-xl font-light">Academic Excellence Platform</p>

          {/* User Roles */}
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <span className="bg-gray-900 text-white rounded-full px-4 py-2 text-sm font-medium">
              Teachers
            </span>
            <span className="bg-gray-900 text-white rounded-full px-4 py-2 text-sm font-medium">
              Parents
            </span>
            <span className="bg-gray-900 text-white rounded-full px-4 py-2 text-sm font-medium">
              Students
            </span>
            <span className="bg-gray-900 text-white rounded-full px-4 py-2 text-sm font-medium">
              Admin
            </span>
          </div>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            <div className="flex flex-col items-center text-center">
              <FaBook className="text-3xl text-white" />
              <p className="mt-2 text-sm font-medium">Grades</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <GiProgression className="text-3xl text-white" />
              <p className="mt-2 text-sm font-medium">Progress Tracking</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <MdOutlineSecurity className="text-3xl text-white" />
              <p className="mt-2 text-sm font-medium">Secure Access</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <TiMessageTyping className="text-3xl text-white" />
              <p className="mt-2 text-sm font-medium">Communication</p>
            </div>
          </div>
        </div>

        {/* Login Section */}
        <form onSubmit={handleRegister}>
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Welcome Back
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2 mb-6">
              Sign in to access your academic dashboard
            </p>

            <div className="w-full space-y-4">
              <input
                type="text"
                name="email"
                value={formData.email}
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                onChange={handleChange}
              />
              <div className="flex gap-3 justify-start items-center">
                <label>Select Role</label>
                <select
                  className="border border-gray-300 p-1"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="Teacher">Teacher</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                onChange={handleChange}
              />
              <button
                disabled={loading}
                type="submit"
                className={`w-full text-white p-3 rounded-md transition-colors font-medium ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Signing up" : "Sign Up"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
