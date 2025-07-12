interface ButtonProps {
  text?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}
export default function Button(props: ButtonProps) {
  const { text, children, onClick, type = "button" } = props;
  return (
    <div className="flex justify-center items-center">
      <button
        className="flex disabled:bg-gray-400 gap-x-2 bg-blue-500 hover:bg-blue-300 hover:text-black text-white px-4 py-2 rounded-lg shadow-2xl cursor-pointer"
        onClick={onClick}
        type={type}
      >
        {children} {text}
      </button>
    </div>
  );
}
// "bg-blue-500 text-white"
//                 : "hover:bg-blue-300 text-black"
