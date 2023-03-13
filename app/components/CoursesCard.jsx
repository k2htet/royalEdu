import Link from "next/link";

const CoursesCard = ({ title, des, price, id }) => {
  return (
    <div className=" block w-[80%] lg:w-full h-auto rounded-2xl border-2 border-black-100/75 space-y-3 p-4 mx-auto">
      <Link href={`courses/${id}`} className="space-y-3">
        <div className="w-full h-[110px] bg-primary mx-auto rounded-lg"></div>
        <div className="w-[100px] h-[2px] bg-primary mx-auto" />
        <div>
          <h5 className="text-black-100 text-h5">{title}</h5>
          <p className="text-black-100/75 text-base">{des}</p>
        </div>
      </Link>

      <div className="flex justify-between items-center">
        <p className="text-primary font-bold text-h6">{price}ks</p>
        <Link
          href={`checkout/course/${id}`}
          className="btn btn-sm btn-primary text-white"
        >
          Buy now
        </Link>
      </div>
    </div>
  );
};

export default CoursesCard;
