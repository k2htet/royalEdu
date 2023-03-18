import { Button } from "@/app/components";
import Link from "next/link";
import React from "react";

const EnrollCourseCard = ({ title, classes = 80, url }) => {
  return (
    <div className="bg-secondary rounded-md p-4 flex justify-between items-center my-3">
      <div className="w-16 h-16 bg-white"></div>

      <div className="text-white text-h6">
        <h1 className="pt-2 font-bold">{title}</h1>
        <p>{classes} classes</p>
        <div className="w-full h-[2px] bg-white" />
      </div>

      <div>
        <Link
          href={`${url}`}
          className="bg-white text-primary text-h6 btn-sm py-2 rounded-md"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default EnrollCourseCard;
