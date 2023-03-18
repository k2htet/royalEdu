"use client"; // Error components must be Client components

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Error({ error, reset }) {
  const router = useRouter();
  return (
    <div>
      <h2>{error.message}</h2>
      <Link href="/courses">Enroll Course Now</Link>
    </div>
  );
}
