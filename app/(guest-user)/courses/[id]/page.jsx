import { createClient } from "@/app/utils/supabase-server";
import { notFound } from "next/navigation";
import Link from "next/link";

const Course = async ({ params: { id } }) => {
  const supabase = createClient();
  const { data: course } = await supabase
    .from("courses")
    .select()
    .match({ id })
    .single();

  if (!course) {
    notFound();
  }

  const { data: enrollOrNot, error } = await supabase
    .from("enrollment")
    .select("student_id")
    .eq("course_id", id);

  const { data: orders } = await supabase
    .from("orders")
    .select("student_id")
    .eq("course_id", id)
    .eq("status", false);

  return (
    <div className="flex-1 bg-background flex flex-col items-center justify-center">
      <div className="container px-4 grid grid-cols-1 lg:grid-cols-2 items-center mx-auto py-4 gap-5">
        <div className="space-y-3 bg-secondary rounded-t-lg shadow-sm ">
          <h1 className="text-h4 text-white rounded-t-md underline-offset-4 underline text-center py-1">
            Course Detail
          </h1>
          <p className="text-base text-black-100 bg-white leading-loose p-4 rounded-b-md border-b-2 border-b-primary">
            {course.detail}
          </p>
        </div>
        <div>
          <h1 className="text-h2 text-secondary ">{course.title}</h1>
          <h2 className="text-h5 text-black/75 my-3">{course.des}</h2>

          {enrollOrNot.length === 0 ? (
            orders.length === 0 ? (
              <Link
                href={`/checkout/course/${id}`}
                className="text-white btn-primary text-h6 btn py-2 rounded-md"
              >
                Enroll Now
              </Link>
            ) : (
              <span className=" bg-primary text-white p-2 rounded-full">
                Pending
              </span>
            )
          ) : (
            <Link
              href={`/student/enroll/${id}`}
              className="text-white btn-primary text-h6 btn py-2 rounded-md"
            >
              Resume Your Course
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Course;
