export default function Button(props) {
  const { text } = props;
  return (
    <div className="flex justify-center items-center">
      <button className="bg-black text-white px-4 py-2 rounded-lg shadow-2xl">
        {text}
      </button>
    </div>
  );
}
