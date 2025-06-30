// import Button from "../common/Button";

// interface Student {
//   id: number;
//   name: string;
// }

// export default async function Students() {
//   const FetchStudents = async (): Promise<Student[]> => {
//     const res = await fetch("https://jsonplaceholder.typicode.com/users");
//     return res.json();
//   };

//   const data = await FetchStudents();
//   return (
//     <>
//       <input type="text" placeholder="search" />
//       {data.map((student: Student) => {
//         return (
//           <div
//             key={student.id}
//             className="w-full max-w-[400px] border border-gray-400 p-4 rounded-lg shadow-lg mb-4"
//           >
//             <h1>{student.id}</h1>
//             <h1>{student.name}</h1>
//             <div className="flex gap-x-4">
//               <Button text="View student" />
//               <Button text="Print report" />
//               <Button text="Edit marks" />
//             </div>
//           </div>
//         );
//       })}
//     </>
//   );
// }
