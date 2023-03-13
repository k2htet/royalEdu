"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSupabase } from "@/app/components/supabase-provider";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import Loading from "@/app/components/Loading";
import Link from "next/link";

const schema = yup.object().shape({
  image: yup
    .mixed()
    .required("You need to upload screenshot!")
    .test("fileSize", "The file is too large.", (value) => {
      return value && value[0]?.size < 2000000;
    })
    .test("type", "Please Upload Image Only!", (value) => {
      return (
        value &&
        (value[0]?.type === "image/jpeg" || value[0]?.type === "image/png")
      );
    }),
});

const CheckoutForm = ({ courseId, userId, price }) => {
  const { supabase } = useSupabase();
  const [loader, setLoader] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoader((prev) => !prev);
    const imageName = uuid();

    const { data: storageData, error: storageError } = await supabase.storage
      .from("transitions")
      .upload(`${userId}/${imageName}`, data.image[0], {
        cacheControl: "3600",
        upsert: false,
      });

    if (!storageError) {
      // if storage !error make orders
      const { error } = await supabase.from("orders").insert({
        student_id: userId,
        course_id: courseId,
        price,
      });

      if (!error) {
        setSuccess(true);
      }

      if (error) {
        // If order error delete transitions
        const { error } = await supabase.storage
          .from("transitions")
          .remove([`${userId}/${imageName}`]);
        throw new Error("Please try again");
      }
    }

    if (storageError) {
      throw new Error("Please try again");
    }

    reset();
    setLoader((prev) => !prev);
  };

  return loader ? (
    <Loading height="auto" />
  ) : (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 font-poppins"
      >
        {errors && (
          <h1 className="font-poppins text-red-600">
            {errors?.image?.message}
          </h1>
        )}
        <div className="flex justify-between items-center">
          {success ? (
            <div>
              <h1 className="font-poppins text-green-600">
                Checkout successful,please call 09962560377
              </h1>
              <hr className="my-2" />
              <Link
                href="/student/dashboard"
                className="btn btn-md btn-primary w-full text-h6 text-white"
              >
                Go To Dashboard
              </Link>
            </div>
          ) : (
            <>
              <h1 className="font-myanmar text-primary">
                ငွေလွှဲ <span className="font-poppins">Screenshot</span>
              </h1>
              <input
                id="image"
                type="file"
                className="file-input file-input-primary w-[50%] max-w-xs"
                {...register("image")}
                required
              />
              <hr />
              <button
                type="submit"
                className="btn btn-md btn-primary w-full text-h6 text-white"
              >
                Check out
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;
