"use client"; // Error components must be Client components

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Error({ error, reset }) {
  const path = usePathname();
  const splitPath = path.split("/");
  const courseId = splitPath[splitPath.length - 1];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-3">
      <h2 className="text-red-600 text-h4 text-center">
        Your are not enroll this course,please enroll
      </h2>
      <Link
        href={`/checkout/course/${courseId}`}
        className="btn btn-md bg-red-600 hover:bg-secondary border-0 text-white"
      >
        Enroll Course Now
      </Link>
    </div>
  );
}
