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
  name?: string;
  stream?: string;
  class?: string;
  subject?: string;
}

export default function Form(props: FormProps) {
  const { title } = props;
  const isStudentForm = title === "Student";

  const initialFormState = isStudentForm
    ? { name: "", stream: "", class: "", createdAt: new Date() }
    : { name: "", subject: "", class: "", createdAt: new Date() };
  //tracks form data
  const [form, setForm] = useState<FormValues>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({}); //tracks errors
  const [isSubmitting, setIsSubmitting] = useState(false); //tracks form submission
  const [submitError, setSubmitError] = useState<string | null>(null); //tracks submission error
  const [succcesFormMessage, setFormSuccessMessage] = useState<string | null>(
    null
  ); //tracks form submission success message

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm(form); // Always validate on submit
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
    }

    try {
      //determine collection based on the form type
      const collectionName = isStudentForm ? "students" : "teachers";
      const formData = isStudentForm
        ? {
            name: form.name,
            stream: (form as StudentData).stream,
            class: form.class,
            createdAt: form.createdAt,
          }
        : {
            name: form.name,
            subject: (form as TeacherData).subject,
            class: form.class,
            createdAt: form.createdAt,
          };

      await addDoc(collection(db, collectionName), formData);

      setForm(initialFormState); // Reset form after successful submission
    } catch {
      const message: string = "An error occured while submitting the form";
      setSubmitError(message);
    } finally {
      const message: string = "Form submitted successfully";
      setFormSuccessMessage(message);
      setTimeout(() => {
        setFormSuccessMessage("");
      }, 500);
      setIsSubmitting(false);
    }
  };

  const validateForm = (values: FormValues): FormErrors => {
    const errors: FormErrors = {};
    //name validation
    if (!values.name.trim()) {
      errors.name = "name is required";
    } else if (values.name.length < 2) {
      errors.name = "Name must be atleast 2 characters";
    }
    if (isStudentForm) {
      //stream validation
      if (!(values as StudentData).stream?.trim()) {
        errors.stream = "stream is required";
      }
    } else {
      //subject validation for teacher form
      if (!(values as TeacherData).subject?.trim()) {
        errors.stream = "Subject is required";
      }
    }
    //class validation
    if (!values.class.trim()) {
      errors.class = "Class is required";
    }
    return errors;
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
            } shadow-2xl py-2 px-1 rounded-lg focus:outline-none`}
            onChange={handleChange}
            value={form.name}
          />
        </label>
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}

        {errors.stream && (
          <p className="text-red-500 text-xs mt-1">{errors.stream}</p>
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
                } shadow-2xl py-2 px-1 rounded-lg focus:outline-none`}
                onChange={handleChange}
                value={isStudentForm ? (form as StudentData).stream : ""}
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
                } shadow-2xl py-2 px-1 rounded-lg focus:outline-none`}
                onChange={handleChange}
                value={!isStudentForm ? (form as TeacherData).subject : ""}
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
            } shadow-2xl py-2 px-1 rounded-lg focus:outline-none`}
            onChange={handleChange}
            value={form.class}
          />
        </label>
        {errors.class && (
          <p className="text-red-500 text-xs mt-1">{errors.class}</p>
        )}
        <Button type="submit">
          {isSubmitting ? "Registering..." : "Register"}
        </Button>
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
