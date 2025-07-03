"use client";
import { IoIosSchool } from "react-icons/io";
import { MdOutlineSecurity } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { TiMessageTyping } from "react-icons/ti";
import { FaBook } from "react-icons/fa";
import { ChangeEvent, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

interface Form {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Form>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate email and password fields as user types
    if (name === "email" || name === "password") {
      const newErrors = validateForm({ ...formData, [name]: value });
      setErrors((prev) => ({
        ...prev,
        [name]: newErrors[name as keyof FormErrors],
      }));
    }

    if (submitError) setSubmitError(null);
  };
  const validateForm = (values: Form): FormErrors => {
    const errors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be 8 characters long";
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const errors = validateForm(formData);
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      setLoading(true);
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredentials.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === "Teacher") {
          router.push("/teacher");
        } else if (userData.role === "Admin") {
          router.push("/admin");
        }
      }
    } catch (error: any) {
      let errorMessage = "Login failed. Please try again.";

      if (error.code) {
        switch (error.code) {
          case "auth/invalid-email":
            errorMessage = "Invalid email address format.";
            break;
          case "auth/user-not-found":
          case "auth/wrong-password":
            errorMessage = "Invalid email or password.";
            break;
          case "auth/too-many-requests":
            errorMessage =
              "Too many attempts. Account temporarily disabled. Try again later or reset your password.";
            break;
          case "auth/user-disabled":
            errorMessage =
              "This account has been disabled. Please contact support.";
            break;
        }
      }

      setSubmitError(errorMessage);
    } finally {
      setLoading(false);
    }
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

        {/* Form Section */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Welcome Back
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2 mb-6">
              Sign in to access your academic dashboard
            </p>

            {/* Custom styled error message */}
            {submitError && (
              <div className="w-full mb-4 p-3 bg-red-100 dark:bg-red-900/50 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-200 rounded-md flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {submitError}
              </div>
            )}

            <div className="w-full space-y-4">
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Enter your email"
                  className={`w-full p-3 border ${
                    errors.email
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white`}
                  onChange={handleChange}
                  onBlur={(e) => {
                    const newErrors = validateForm({
                      ...formData,
                      email: e.target.value,
                    });
                    setErrors((prev) => ({ ...prev, email: newErrors.email }));
                  }}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  placeholder="Enter your password"
                  className={`w-full p-3 border ${
                    errors.password
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white`}
                  onChange={handleChange}
                  onBlur={(e) => {
                    const newErrors = validateForm({
                      ...formData,
                      password: e.target.value,
                    });
                    setErrors((prev) => ({
                      ...prev,
                      password: newErrors.password,
                    }));
                  }}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.password}
                  </p>
                )}
              </div>

              <button
                disabled={loading}
                type="submit"
                className={`w-full text-white p-3 rounded-md transition-colors font-medium ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } flex items-center justify-center`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
