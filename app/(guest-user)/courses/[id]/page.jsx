import supabase from "@/app/utils/supabase";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const { data: courses } = await supabase.from("courses").select("id");

  return courses?.map(({ id }) => ({
    id,
  }));
}

const Course = async ({ params: { id } }) => {
  const { data } = await supabase
    .from("courses")
    .select()
    .match({ id })
    .single();

  if (!data) {
    notFound();
  }

  return (
    <div className="text-primary">
      <p>မကြာမီလာမည်။</p>
    </div>
  );
};

export default Course;
