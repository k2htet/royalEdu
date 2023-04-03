"use client";

import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { useSupabase } from "@/app/components/supabase-provider";
import { useState } from "react";
import Loading from "@/app/components/Loading";
const Navbar = ({ user }) => {
  const [loader, setLoader] = useState(false);
  const { supabase } = useSupabase();

  const signOut = async () => {
    setLoader((prev) => !prev);
    return await supabase.auth.signOut();
  };

  return (
    <>
      <nav className="border-black-100/25 border-b-2 items-center py-3">
        <div className="flex justify-between items-center container px-4 mx-auto ">
          <div className="flex justify-between items-center w-[50%] lg:w-[60%] xl:w-[50%]">
            <Link href="/">
              <h1 className=" text-h5 md:text-h2 text-primary font-bold">
                Royal.edu
              </h1>
            </Link>
            <ul className="hidden lg:flex items-center text-h6 space-x-5 text-black-100/75">
              <li>
                <Link href="/student/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link href="/courses">Our Courses</Link>
              </li>
            </ul>
          </div>

          {loader ? (
            <Loading height="auto" />
          ) : (
            <div>
              <h1>{user.user_metadata.username}</h1>

              <div className="flex justify-between text-base items-center space-x-4 h-full text-black-100">
                <button onClick={signOut}>
                  <h1 className="text-primary flex items-center gap-3">
                    Sign Out
                    <span>
                      <BsArrowRight color="black" />
                    </span>
                  </h1>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="flex justify-center items-center lg:hidden gap-5 text-base text-black-100/75 py-3 border-x-2 border-primary container px-4 mx-auto">
        <Link href="/student/dashboard">Dashboard</Link>
        <Link href="/courses">Our Courses</Link>
      </div>
    </>
  );
};

export default Navbar;
