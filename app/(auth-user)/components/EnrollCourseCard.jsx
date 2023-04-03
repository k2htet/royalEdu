import { Button } from "@/app/components";
import Link from "next/link";
import React from "react";

const EnrollCourseCard = ({ title, classes = 80, url }) => {
  return (
    <div className="bg-secondary rounded-md p-2 py-4 flex flex-col justify-between items-center my-3 gap-3 md:flex-row md:p-4">
      <div className="w-full md:w-[20%] h-14 bg-white"></div>

      <div className="text-white text-h6">
        <h1 className="pt-2 font-bold">{title}</h1>
        <p>{classes} classes</p>
        <div className="w-full h-[2px] bg-white" />
      </div>

      <div>
        <Link
          href={`${url}`}
          className="bg-white text-primary text-base md:text-h6 btn-xs py-1 md:btn-sm md:py-2 rounded-md"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default EnrollCourseCard;
