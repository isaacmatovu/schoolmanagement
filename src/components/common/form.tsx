"use client";
import { PiStudentThin } from "react-icons/pi";
import Button from "./Button";
import { ChangeEvent, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";
//interface props
interface FormProps {
  title: string;
}

interface StudentData {
  name: string;
  stream: string;
  class: string;
  studentId?: string;
  createdAt: Date;
}

interface TeacherData {
  name: string;
  subject: string;
  class: string;
  teacherId?: string;
  createdAt: Date;
}
type FormValues = StudentData | TeacherData;

interface FormErrors {
  name: string;
  stream: string;
  class: string;
  subject: string;
}

export default function Form(props: FormProps) {
  const { title } = props;
  const isStudentForm = title === "Student";

  const initialFormState = isStudentForm
    ? { name: "", stream: "", class: "", createdAt: new Date() }
    : { name: "", subject: "", class: "", createdAt: new Date() };
  //tracks form data
  const [form, setForm] = useState<FormValues>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    stream: "",
    class: "",
    subject: "",
  }); //tracks errors
  const [isSubmitting, setIsSubmitting] = useState(false); //tracks form submission
  const [submitError, setSubmitError] = useState<string | null>(null); //tracks submission error
  const [succcesFormMessage, setFormSuccessMessage] = useState<string | null>(
    null
  ); //tracks form submission success message
  const [completeForm, setCompleteForm] = useState<string>("");

  const validateForm = () => {
    const errors: FormErrors = { name: "", class: "", stream: "", subject: "" };
    //name validation
    if (!form.name.trim()) {
      errors.name = "name is required";
    } else if (form.name.length < 2) {
      errors.name = "Name must be atleast 2 characters";
    }
    //stream validation
    if (!(form as StudentData).stream) {
      errors.stream = "stream is required";
    }

    //subject validation for teacher form
    if (!(form as TeacherData).subject) {
      errors.subject = "Subject is required";
    }

    //class validation
    if (!form.class.trim()) {
      errors.class = "Class is required";
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      //determine collection based on the form type
      const collectionName = isStudentForm ? "students" : "teachers";
      const formData = isStudentForm
        ? {
            name: form.name.toUpperCase(),
            stream: (form as StudentData).stream.toUpperCase(),
            class: form.class.toUpperCase(),
            createdAt: form.createdAt,
          }
        : {
            name: form.name.toUpperCase(),
            subject: (form as TeacherData).subject.toUpperCase(),
            class: form.class.toUpperCase(),
            createdAt: form.createdAt,
          };
      const Error = validateForm();
      setErrors(Error);
      await addDoc(collection(db, collectionName), formData);

      const message: string = "Form submitted successfully";
      setFormSuccessMessage(message);
      setTimeout(() => {
        setFormSuccessMessage("");
      }, 500);

      setForm(initialFormState); // Reset form after successful submission
    } catch {
      if (
        form.class !== "" &&
        form.name !== "" &&
        (form as StudentData).stream !== "" &&
        (form as TeacherData).subject !== ""
      ) {
        const message: string =
          "An error occured while submitting the form check your internet connection";
        setCompleteForm("");
        setSubmitError(message);
      } else if (
        errors.class === "" &&
        errors.name === "" &&
        errors.stream === "" &&
        errors.subject === ""
      ) {
        setSubmitError("");
        setCompleteForm("fill the whole form");

        console.log("didnt submit");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-4 w-full max-w-[300px] border border-gray-400 p-4 rounded-lg"
      >
        <div className="flex justify-center items-center">
          <h1>Register {title}</h1>
          <PiStudentThin className="text-4xl text-blue-500" />
        </div>
        <label className="text-sm flex justify-between items-center">
          Name
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            className={`border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } shadow-2xl py-2 px-1 rounded-lg focus:outline-none uppercase`}
            onChange={handleChange}
            value={form.name}
            style={{ textTransform: "uppercase" }}
          />
        </label>
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}

        {/* Conditional field based on form type */}
        {isStudentForm ? (
          <>
            <label className="text-sm flex justify-between items-center">
              Stream
              <input
                type="text"
                name="stream"
                placeholder="Enter stream"
                className={`border ${
                  errors.stream ? "border-red-500" : "border-gray-300"
                } shadow-2xl py-2 px-1 rounded-lg focus:outline-none uppercase`}
                onChange={handleChange}
                value={isStudentForm && (form as StudentData).stream}
                style={{ textTransform: "uppercase" }}
              />
            </label>
            {errors.stream && (
              <p className="text-red-500 text-xs mt-1">{errors.stream}</p>
            )}
          </>
        ) : (
          <>
            <label className="text-sm flex justify-between items-center">
              Subject
              <input
                type="text"
                name="subject"
                placeholder="Enter subject"
                className={`border ${
                  errors.subject ? "border-red-500" : "border-gray-300"
                } shadow-2xl py-2 px-1 rounded-lg focus:outline-none uppercase`}
                onChange={handleChange}
                value={!isStudentForm && (form as TeacherData).subject}
                style={{ textTransform: "uppercase" }}
              />
            </label>
            {errors.subject && (
              <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
            )}
          </>
        )}

        <label className="text-sm flex justify-between items-center">
          Class
          <input
            type="text"
            name="class"
            placeholder="Enter class"
            className={`border ${
              errors.class ? "border-red-500" : "border-gray-300"
            } shadow-2xl py-2 px-1 rounded-lg focus:outline-none uppercase`}
            onChange={handleChange}
            value={form.class}
            style={{ textTransform: "uppercase" }}
          />
        </label>
        {errors.class && (
          <p className="text-red-500 text-xs mt-1">{errors.class}</p>
        )}
        <Button type="submit">
          {isSubmitting ? "Registering..." : "Register"}
        </Button>
        {completeForm && (
          <p className="text-red-500 text-xs mt-1">{completeForm}</p>
        )}
        {submitError && (
          <p className="text-red-500 text-xs mt-1">{submitError}</p>
        )}
        {succcesFormMessage && (
          <p className="text-green-500 text-xs mt-1">{succcesFormMessage}</p>
        )}
      </form>
    </>
  );
}
