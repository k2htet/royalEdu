import Link from "next/link";

const Button = ({ title, colorClass, href }) => {
  return (
    <Link href={href} className="text-white">
      <button
        className={`${colorClass} text-base font-bold px-3 py-2 md:text-h5 lg:text-h5 lg:px-5 lg:py-2 xl:text-h4 rounded-[10px] xl:px-6 xl:py-3`}
      >
        {title}
      </button>
    </Link>
  );
};

export default Button;
