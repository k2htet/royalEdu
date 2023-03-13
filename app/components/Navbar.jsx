"use client";

import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { useSupabase } from "./supabase-provider";

const Navbar = () => {
  const { session } = useSupabase();

  return (
    <nav className="border-black-100/25 border-b-2 items-center py-3">
      <div className="flex justify-between items-center container px-4 mx-auto ">
        <div className="flex justify-between items-center w-[50%] lg:w-[60%] xl:w-[50%]">
          <Link href="/">
            <h1 className=" text-h2 text-primary">Royal.edu</h1>
          </Link>
          <ul className="hidden lg:flex items-center text-h6 space-x-5 text-black-100">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/courses">Courses</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
          </ul>
        </div>
        {session ? (
          <div className="hidden lg:flex justify-between text-h6 items-center space-x-4 h-full text-black-100">
            <Link href="/student/dashboard">
              <h1 className="text-primary flex items-center gap-3">
                Dashboard
                <span>
                  <BsArrowRight color="black" />
                </span>
              </h1>
            </Link>
          </div>
        ) : (
          <div className="hidden lg:flex justify-between text-h6 items-center space-x-4 h-full text-black-100">
            <Link href="/login">
              <h1>Login</h1>
            </Link>
            <div className="w-[2px] h-[30px] bg-black-100" />
            <Link href="/register">
              <h1 className="text-primary flex items-center gap-3">
                Register
                <span>
                  <BsArrowRight color="black" />
                </span>
              </h1>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
