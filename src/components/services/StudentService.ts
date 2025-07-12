import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

interface Student {
  id: string;
  name: string;
  stream: string;
  class: string;
}

// Fetch students by class level
export const fetchStudentsByClass = async (classLevel: string) => {
  try {
    const studentsRef = collection(db, "students");
    const q = query(studentsRef, where("class", "==", classLevel));
    const querySnapshot = await getDocs(q);

    const students: Student[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      students.push({
        id: doc.id,
        name: data.name || "", // Provide defaults if needed
        stream: data.stream || "",
        class: data.class || "",
      });
    });

    return students;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw new Error("Failed to fetch students");
  }
};
