import React from "react";
import { reason } from "../constant/data";
const ReasonCard = () => {
  return (
    <div className="flex flex-col justify-between gap-8">
      {reason.map((data) => (
        <div className="grid grid-cols-12 items-center" key={data.id}>
          <div className="w-5 h-5 relative bg-primary rounded-full md:w-7 md:h-7 " />
          <h1 className=" text-base text-black-100 px-4 col-span-11">
            {data.des}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default ReasonCard;
