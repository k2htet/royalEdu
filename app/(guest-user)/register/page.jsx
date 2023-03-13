"use client";

import Image from "next/image";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

import { useSupabase } from "@/app/components/supabase-provider";

import { useEffect, useState } from "react";

import authImg from "../../../public/authImg.svg";
import Loading from "../../components/Loading";

// validation
const schema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup.string().email().required("Email address is required."),
  password: yup.string().required("Password is required."),
  cPassword: yup
    .string()
    .required("Confirm password required.")
    .oneOf([yup.ref("password"), null], "Passwords does not match"),
});

const Register = () => {
  const { supabase } = useSupabase();
  const [loader, setLoader] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [reset, isSubmitSuccessful]);

  const onSubmit = async (userData) => {
    setLoader((prev) => !prev);
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          username: userData.username,
        },
        emailRedirectTo: "http://localhost:3000/student/dashboard",
      },
    });

    if (user) {
      setLoader((prev) => !prev);
      setCurrentUser(true);
    }

    if (error) {
      throw new Error(error.message);
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
        {loader ? (
          <Loading />
        ) : (
          <div className="w-[80%] mx-auto">
            <form
              className="p-6 border-2 flex flex-col items-center justify-center border-black-100 bg-background rounded-md"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="text-center text-black-100">
                <h1 className="text-h2">Sign Up</h1>
                <h3 className="text-h4">Welcome back</h3>
              </div>
              {currentUser ? (
                <div className="text-center text-black-100">
                  <h1 className="text-h4 text-green-600 py-3">
                    Register Complete
                  </h1>
                </div>
              ) : (
                <>
                  <div className="w-full lg:w-[80%] text-black-100 my-3">
                    <label htmlFor="username">
                      Username
                      {errors?.username?.message && (
                        <span className="text-red-600 px-1">
                          ( {errors?.username?.message} )
                        </span>
                      )}
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="block text-h6 w-full border-b-2 border-b-primary focus:outline-none  p-3"
                      {...register("username")}
                    />
                  </div>
                  <div className="w-full lg:w-[80%] text-black-100 my-3">
                    <label htmlFor="email">
                      Email{" "}
                      {errors?.email?.message && (
                        <span className="text-red-600 px-1">
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
                        <span className="text-red-600 px-1">
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
                  <div className="w-full lg:w-[80%] text-black-100 my-3">
                    <label htmlFor="cPassword">
                      Confirm Password
                      {errors?.cPassword?.message && (
                        <span className="text-red-600 px-1">
                          ({errors?.cPassword?.message})
                        </span>
                      )}
                    </label>
                    <input
                      type="password"
                      id="cPassword"
                      className="block w-full text-h6 border-b-2 border-b-primary focus:outline-none  p-3"
                      {...register("cPassword")}
                    />
                  </div>
                </>
              )}

              {currentUser ? (
                <button
                  onClick={() => (window.location.href = "https://gmail.com")}
                  className="w-full btn btn-primary text-h6 rounded-sm text-white lg:w-[80%]"
                >
                  Confirm Your Email
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full btn btn-primary text-h6 rounded-sm text-white lg:w-[80%]"
                >
                  Sign Up
                </button>
              )}

              <p className="text-black-100 my-3">
                Already have an account?
                <span className="px-2">
                  <Link href="/login" className="text-primary">
                    Sign In
                  </Link>
                </span>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
