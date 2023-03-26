import { createClient } from "@/app/utils/supabase-server";
import LessonCard from "./component/LessonCard";

const EnrollCourse = async ({ params: { courseId } }) => {
  const supabase = createClient();

  const getEnroll = async () => {
    const { data, error } = await supabase
      .from("enrollment")
      .select("student_id")
      .eq("course_id", courseId);

    return { data, error };
  };

  const getCourse = async () => {
    const { data, error } = await supabase
      .from("courses")
      .select("*,lessons(*)")
      .eq("id", courseId)
      .order("lesson", { foreignTable: "lessons", ascending: true })
      .single();

    return { data, error };
  };

  const enrollData = getEnroll();
  const courseData = getCourse();

  const [enrollOrNot, course] = await Promise.all([enrollData, courseData]);

  if (enrollOrNot.data.length === 0) {
    throw new Error("Your are not enroll this course,please enroll");
  }

  return (
    <div className="flex-1 bg-background flex flex-col items-center justify-center">
      <div className="container px-4 grid grid-cols-1 lg:grid-cols-2 items-center mx-auto py-4 gap-5">
        <div>
          <h1 className="text-h2 text-secondary ">{course.data.title}</h1>
          <h2 className="text-h5 text-black/75 my-3">{course.data.des}</h2>
        </div>

        <div>
          <p className="text-base text-white leading-loose p-4 bg-secondary rounded-md">
            {course.data.detail}
          </p>
        </div>
      </div>

      <div className="container px-4 gap-5">
        <div className="bg-white border-primary  border-r-4 border-l-4 my-4 py-4 ">
          <h1 className="text-h2 text-black-100 text-center">Classes</h1>
          {course.data.lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              cTitle={course.data.title}
              title={lesson.title}
              url={`/student/learn/${lesson.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnrollCourse;
