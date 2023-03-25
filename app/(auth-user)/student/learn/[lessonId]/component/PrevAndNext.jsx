"use client";
import { useSupabase } from "@/app/components/supabase-provider";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PrevAndNext = ({ lesson }) => {
  const [lessonDay, setLessonDay] = useState(lesson.lesson);
  const { supabase } = useSupabase();

  const router = useRouter();

  const handleNextOrPrev = async (next) => {
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
        className={`btn btn-secondary btn-sm text-white `}
      >
        Prev
      </button>
      <button
        onClick={() => handleNextOrPrev("next")}
        className={`btn btn-secondary btn-sm text-white `}
      >
        Next
      </button>
    </>
  );
};

export default PrevAndNext;
