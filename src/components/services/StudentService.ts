import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

// Fetch students by class level
export const fetchStudentsByClass = async (classLevel: string) => {
  try {
    const studentsRef = collection(db, "students");
    const q = query(studentsRef, where("class", "==", classLevel));
    const querySnapshot = await getDocs(q);

    const students: any[] = [];
    querySnapshot.forEach((doc) => {
      students.push({ id: doc.id, ...doc.data() });
    });

    return students;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw new Error("Failed to fetch students");
  }
};
