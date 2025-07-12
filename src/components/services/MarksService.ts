import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export const addMarks = async (
  studentId: string,
  marksData: { subject: string; marks: number; examType: string }
) => {
  try {
    const marksRef = collection(db, "students", studentId, "marks");
    await addDoc(marksRef, {
      ...marksData,
      createdAt: new Date(),
    });

    return true;
  } catch (error) {
    console.error("Error adding marks:", error);
    throw new Error("Failed to add marks");
  }
};
