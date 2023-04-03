import Link from "next/link";

const Button = ({ title, colorClass, href }) => {
  return (
    <Link href={href} className="text-white">
      <button className="btn btn-primary text-base md:text-h6 text-white btn-md  px-4">
        {title}
      </button>
    </Link>
  );
};

export default Button;
