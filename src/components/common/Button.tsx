interface ButtonProps {
  text?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}
export default function Button(props: ButtonProps) {
  const { text, children, onClick, type = "button" } = props;
  return (
    <div className="flex justify-center items-center">
      <button
        className="bg-black text-white px-4 py-2 rounded-lg shadow-2xl cursor-pointer"
        onClick={onClick}
        type={type}
      >
        {text} {children}
      </button>
    </div>
  );
}
