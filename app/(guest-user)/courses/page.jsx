import "server-only";
import { CoursesCard } from "@/app/components";
import { createClient } from "@/app/utils/supabase-server";

const Courses = async () => {
  const supabase = createClient();

  const { data: courses, error } = await supabase.from("courses").select();

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className="flex-1 bg-background flex items-center justify-center">
      <div className="container px-4 mx-auto grid grid-cols-1 lg:grid-cols-3 py-4 gap-5">
        <div className="border-primary border-b-2 lg:border-primary lg:border-r-2 lg:border-b-0 flex items-center justify-center">
          <h1 className="w-full text-h4 text-center font-bold md:text-h3 lg:text-h2 py-2  text-primary">
            Check Our Online Courses
          </h1>
        </div>
        <div className="col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {courses.map((course) => (
              <CoursesCard
                key={course.id}
                id={course.id}
                title={course.title}
                des={course.des}
                price={course.price}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
