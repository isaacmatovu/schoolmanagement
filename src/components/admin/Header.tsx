import { RiAdminFill } from "react-icons/ri";
interface HeaderProps {
  title: string;
}

export default function Header(props: HeaderProps) {
  const { title }: HeaderProps = props;
  return (
    <div className="flex items-center justify-between bg-gray-100 p-6 border-b border-gray-400">
      <div className="flex items-center gap-x-4">
        <h1 className="text-2xl">{title}</h1>
        <RiAdminFill className="text-3xl text-black" />
      </div>
      <p className="text-sm sm:text-2xl">School Management Sysytem</p>
    </div>
  );
}
