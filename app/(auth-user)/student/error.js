"use client"; // Error components must be Client components

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Error({ error, reset }) {
  const path = usePathname();
  const splitPath = path.split("/");
  const courseId = splitPath[splitPath.length - 1];

  return (
    <div>
      <h2>{error.message}</h2>
      <Link href={`/checkout/course/${courseId}`}>Enroll Course Now</Link>
    </div>
  );
}
