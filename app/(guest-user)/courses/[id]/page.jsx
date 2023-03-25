import { createClient } from "@/app/utils/supabase-server";
import { notFound } from "next/navigation";
import Link from "next/link";
import supabase from "@/app/utils/supabase";

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

  return (
    <div className="flex-1 bg-background flex flex-col items-center justify-center">
      <div className="container px-4 grid grid-cols-1 lg:grid-cols-2 items-center mx-auto py-4 gap-5">
        <div>
          <p className="text-base text-white leading-loose p-4 bg-secondary rounded-md">
            {course.detail}
          </p>
        </div>
        <div>
          <h1 className="text-h2 text-secondary ">{course.title}</h1>
          <h2 className="text-h5 text-black/75 my-3">{course.des}</h2>

          {enrollOrNot.length === 0 ? (
            <Link
              href={`/checkout/course/${id}`}
              className="text-white btn-primary text-h6 btn py-2 rounded-md"
            >
              Enroll Now
            </Link>
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
