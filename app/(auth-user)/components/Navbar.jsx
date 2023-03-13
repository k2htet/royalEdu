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
    await supabase.auth.signOut();
  };
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
              <Link href="/courses">Our Courses</Link>
            </li>
          </ul>
        </div>

        {loader ? (
          <Loading height="auto" />
        ) : (
          <div>
            <h1>{user.user_metadata.username}</h1>

            <div className="hidden lg:flex justify-between text-h6 items-center space-x-4 h-full text-black-100">
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
  );
};

export default Navbar;
