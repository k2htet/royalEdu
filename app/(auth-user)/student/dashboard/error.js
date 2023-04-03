"use client"; // Error components must be Client components

import Link from "next/link";

export default function Error({ error }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-3">
      <h2 className="text-red-600 text-h3 text-center">
        No Enroll Courses Found!
      </h2>
      <Link
        href="/courses"
        className="btn btn-md bg-red-600 hover:bg-secondary border-0 text-white"
      >
        Enroll Course Now
      </Link>
    </div>
  );
}
