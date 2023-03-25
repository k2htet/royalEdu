import "server-only";
import { createClient } from "@/app/utils/supabase-server";
import PrevAndNext from "./component/PrevAndNext";

const Lesson = async ({ params: { lessonId } }) => {
  const supabase = createClient();

  const { data: lesson } = await supabase
    .from("lessons")
    .select()
    .eq("id", lessonId)
    .single();

  const { data: lessonsByCat } = await supabase
    .from("lessons")
    .select()
    .eq("course_id", lesson.course_id)
    .order("lesson", { ascending: true });

  const { data: enrollOrNot } = await supabase
    .from("enrollment")
    .select("student_id")
    .eq("course_id", lesson.course_id)
    .single();

  if (!enrollOrNot) {
    throw new Error("You need to enroll for access course.");
  }

  return (
    <div className="flex-1 bg-background  flex flex-col items-center justify-center">
      <div className="container px-4 grid grid-cols-1 items-center mx-auto py-4 gap-5">
        {enrollOrNot && (
          <>
            <iframe
              src={lesson.url}
              className="w-[60%] h-[350px] mx-auto"
              allowFullScreen
            ></iframe>
            <div className="flex justify-between items-center">
              <PrevAndNext lesson={lesson} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Lesson;
