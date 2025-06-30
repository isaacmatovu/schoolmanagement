import { PiStudentThin } from "react-icons/pi";
import Button from "./Button";
import { ChangeEvent, useState, useEffect } from "react";

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
  const [form, setForm] = useState<FormValues>({
    name: "",
    stream: "",
    class: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form whenever form values change
  useEffect(() => {
    const errors = validateForm(form);
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  }, [form]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) {
      // Highlight all errors if user tries to submit invalid form
      const errors = validateForm(form);
      setErrors(errors);
      return;
    }

    setIsSubmitting(true);

    // Here you would typically send data to your API
    console.log("Form submitted:", form);

    // Reset form after submission (optional)
    // setForm({ name: "", stream: "", class: "" });
  };

  const validateForm = (values: FormValues): FormErrors => {
    const errors: FormErrors = {};

    if (!values.name.trim()) {
      errors.name = "Name is required";
    } else if (values.name.length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!values.stream.trim()) {
      errors.stream = "Stream is required";
    }

    if (!values.class.trim()) {
      errors.class = "Class is required";
    } else if (!/^\d+$/.test(values.class)) {
      errors.class = "Class must be a number";
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

      <div>
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
      </div>

      <div>
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
      </div>

      <div>
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
      </div>

      <Button type="submit" disabled={!isFormValid || isSubmitting}>
        {isSubmitting ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}
