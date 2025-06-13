"use client";

import { useRouter } from "next/navigation";
import Button from "../common/Button";
interface ButtonProps {
  id: number;
}
export default function NavButton(props: ButtonProps) {
  const { id } = props;
  const router = useRouter();
  function handleClick() {
    router.push(`/posts/${id}`);
  }
  return <Button onClick={handleClick} />;
}
