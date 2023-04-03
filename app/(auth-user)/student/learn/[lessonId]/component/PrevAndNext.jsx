import Link from "next/link";

import { createClient } from "@/app/utils/supabase-server";

const PrevAndNext = async ({ lesson }) => {
  const supabase = createClient();

  const getPrev = async () => {
    const { data, error } = await supabase
      .from("lessons")
      .select("id")
      .eq("course_id", lesson.course_id)
      .eq("lesson", lesson.lesson - 1)
      .single();

    return { data, error };
  };

  const getNext = async () => {
    const { data, error } = await supabase
      .from("lessons")
      .select("id")
      .eq("course_id", lesson.course_id)
      .eq("lesson", lesson.lesson + 1)
      .single();
    return { data, error };
  };

  const prevData = getPrev();
  const nextData = getNext();

  const [prev, next] = await Promise.all([prevData, nextData]);

  return (
    <>
      {prev.data && (
        <Link
          href={`/student/learn/${prev.data?.id}`}
          className={`btn btn-secondary btn-sm text-white ${
            !prev && "invisible"
          }`}
        >
          Prev
        </Link>
      )}

      {next.data && (
        <Link
          href={`/student/learn/${next.data?.id}`}
          className={`btn btn-secondary btn-sm text-white `}
        >
          Next
        </Link>
      )}
    </>
  );
};

export default PrevAndNext;
