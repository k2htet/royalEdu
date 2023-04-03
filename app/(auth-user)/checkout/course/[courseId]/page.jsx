import CheckoutForm from "@/app/(auth-user)/components/CheckoutForm";
import FreeForm from "@/app/(auth-user)/components/FreeForm";
import { createClient } from "@/app/utils/supabase-server";

const CheckoutCourse = async ({ params: { courseId } }) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("courses")
    .select()
    .eq("id", courseId)
    .single();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error("Course not Found!");
  }

  return (
    <div className="flex-1 bg-background flex items-center justify-center">
      <div className="container px-4 mx-auto grid grid-cols-1 items-center lg:grid-cols-3 py-4">
        <div className="col-span-2">
          <h1 className="text-h3 font-bold text-black-100 ">{data?.title}</h1>
          <h5 className="text-black-100 text-base md:text-h5">{data.des}</h5>
        </div>
        <div>
          <div className="bg-white text-black-100 rounded-md text-h5 space-y-3 p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-primary font-poppins">Total Price</h1>
              <h1 className="font-poppins">{data.price}</h1>
            </div>
            <hr />
            {!data.type && (
              <div className="flex justify-between items-center">
                <h1 className="font-myanmar text-primary">
                  ငွေလွှဲရန်{" "}
                  <span className="font-poppins">(Wave , KBZ Pay)</span>
                </h1>
                <h1>09962560377</h1>
              </div>
            )}

            <hr />
            {!data.type ? (
              <CheckoutForm
                userId={user.id}
                courseId={courseId}
                price={data.price}
              />
            ) : (
              <FreeForm
                courseId={courseId}
                price={data.price}
                status={data.type}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCourse;
