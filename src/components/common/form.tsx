"use client";
import { PiStudentThin } from "react-icons/pi";
import Button from "./Button";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
interface FormProps {
  title: string;
}

interface FormValues {
  name: string;
  stream: string;
  class: string;
}
interface FormErrors {
  name?: string;
  stream?: string;
  class?: string;
}

export default function Form(props: FormProps) {
  const { title } = props;
  //tracks form data
  const [form, setForm] = useState<FormValues>({
    name: "",
    stream: "",
    class: "",
  });
  const [errors, setErrors] = useState<FormErrors>({}); //tracks errors
  const [isSubmitting, setIsSubmitting] = useState(false); //tracks form submission

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm(form); // Always validate on submit
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      console.log("form submitted", form);
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

    //stream validation
    if (!values.stream.trim()) {
      errors.stream = "stream is required";
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
          value={form.stream}
        />
      </label>
      {errors.stream && (
        <p className="text-red-500 text-xs mt-1">{errors.stream}</p>
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
        {isSubmitting ? "Regitering..." : "Register"}
      </Button>
    </form>
  );
}
