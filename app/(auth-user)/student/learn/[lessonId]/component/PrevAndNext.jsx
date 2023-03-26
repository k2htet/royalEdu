"use client";
import { useSupabase } from "@/app/components/supabase-provider";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PrevAndNext = ({ lesson, lessonsByCat }) => {
  const [lessonDay, setLessonDay] = useState(lesson.lesson);
  const { supabase } = useSupabase();
  const initialLesson = lessonsByCat[0].lesson;
  const lastLesson = lessonsByCat.length - 1;
  const router = useRouter();

  const handleNextOrPrev = async (nextOrPrev) => {
    if (nextOrPrev === "next") {
      setLessonDay((prev) => prev + 1);
    } else {
      setLessonDay((prev) => prev - 1);
    }
    const { data: nextLesson, error } = await supabase
      .from("lessons")
      .select()
      .eq("lesson", lessonDay)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (nextLesson) {
      const { data: completeOrNot } = await supabase
        .from("complete_lesson")
        .select("student_id")
        .eq("lesson_id", lesson.id)
        .single();

      if (!completeOrNot) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const { data: insertCompleteLesson } = await supabase
          .from("complete_lesson")
          .insert({ student_id: user.id, lesson_id: lesson.id });
      }

      router.push(`/student/learn/${nextLesson.id}`);
    }
  };

  return (
    <>
      <button
        onClick={() => handleNextOrPrev("prev")}
        className={`btn btn-secondary btn-sm text-white ${
          initialLesson == lesson.lesson && "invisible"
        }`}
      >
        Prev
      </button>
      <button
        onClick={() => handleNextOrPrev("next")}
        className={`btn btn-secondary btn-sm text-white ${
          lastLesson == lesson.lesson && "invisible"
        }`}
      >
        Next
      </button>
    </>
  );
};

export default PrevAndNext;
