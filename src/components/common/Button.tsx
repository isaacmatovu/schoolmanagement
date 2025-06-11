interface ButtonProps {
  text?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}
export default function Button(props: ButtonProps) {
  const { text, children, onClick } = props;
  return (
    <div className="flex justify-center items-center">
      <button
        className="bg-black text-white px-4 py-2 rounded-lg shadow-2xl"
        onClick={onClick}
      >
        {text} {children}
      </button>
    </div>
  );
}
