"use client";
import { useSupabase } from "@/app/components/supabase-provider";
import React from "react";
import { useRouter } from "next/navigation";

const FreeForm = ({ courseId, price, status }) => {
  const { supabase } = useSupabase();
  const router = useRouter();
  const handleClick = async () => {
    const { data, error } = await supabase
      .from("orders")
      .insert({ course_id: courseId, price, status });

    router.push("student/dashboard");
  };

  return (
    <button
      className="btn btn-md btn-primary w-full text-h6 text-white"
      onClick={handleClick}
    >
      Enroll
    </button>
  );
};

export default FreeForm;
