import Link from "next/link";

const LessonCard = ({ cTitle, title, url }) => {
  return (
    <div className="w-[60%] bg-secondary rounded-md p-4 flex justify-between items-center my-3 mx-auto">
      <h1 className=" text-white pt-2 text-h6 font-bold">{cTitle}</h1>
      <div className="text-white text-h6">
        <h1 className="pt-2 text-h6 font-bold">{title}</h1>

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

export default LessonCard;
