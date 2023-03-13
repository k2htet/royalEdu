"use client";
import authImg from "../../../public/authImg.svg";
import Image from "next/image";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useSupabase } from "@/app/components/supabase-provider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "@/app/components/Loading";

const schema = yup.object({
  email: yup.string().email().required("Email address is required."),
  password: yup.string().required("Password is required."),
});

const Login = () => {
  const { supabase } = useSupabase();
  const router = useRouter();
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (userData) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: userData.password,
    });

    if (error) {
      throw new Error(error.message);
    } else {
      return router.push("/student/dashboard");
    }
  };

  return (
    <div className="flex-1 bg-background flex items-center">
      <div className="container p-4 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
        <div className="hidden lg:block">
          <Image
            src={authImg}
            alt="auth img"
            className="w-[70%] h-auto m-auto block"
          />
        </div>
        <div className="w-[80%] mx-auto">
          {loader ? (
            <Loading />
          ) : (
            <form
              className="p-6 border-2 flex flex-col items-center justify-center border-black-100 bg-background rounded-md"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="text-center text-black-100">
                <h1 className="text-h2">Sign In</h1>
                <h3 className="text-h4">Welcome back</h3>
              </div>

              <div className="w-full lg:w-[80%] text-black-100 my-3">
                <label htmlFor="email">
                  Email{" "}
                  {errors?.email?.message && (
                    <span className="text-red px-1">
                      ( {errors?.email?.message} )
                    </span>
                  )}
                </label>
                <input
                  type="email"
                  id="email"
                  className="block text-h6 w-full border-b-2 border-b-primary focus:outline-none  p-3"
                  {...register("email")}
                />
              </div>
              <div className="w-full lg:w-[80%] text-black-100 my-3">
                <label htmlFor="password">
                  Password{" "}
                  {errors?.password?.message && (
                    <span className="text-red px-1">
                      ({errors?.password?.message})
                    </span>
                  )}
                </label>
                <input
                  type="password"
                  id="password"
                  className="block w-full text-h6 border-b-2 border-b-primary focus:outline-none  p-3"
                  {...register("password")}
                />
              </div>

              <button
                type="submit"
                className="w-full btn btn-primary text-h6 rounded-sm text-white lg:w-[80%]"
              >
                Login
              </button>

              <p className="text-black-100 my-3">
                Don&apos;t have an account?
                <span className="px-2">
                  <Link href="/register" className="text-primary">
                    Sign Up
                  </Link>
                </span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
