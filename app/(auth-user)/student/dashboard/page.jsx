import "server-only";
import { createClient } from "@/app/utils/supabase-server";
import DashboardCard from "../../components/DashboardCard";
import EnrollCourseCard from "../../components/EnrollCourseCard";
import { error } from "daisyui/src/colors";

const Dashboard = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const studentId = user ? user.id : null;

  const { data: orders } = await supabase
    .from("orders")
    .select("*,courses(title)")
    .eq("student_id", studentId)
    .eq("status", false);

  // enrollment tableထဲမှာ student id ရှိမရှိစစ်
  const { data: enrollments, error: enrollmentsError } = await supabase
    .from("enrollment")
    .select("course_id")
    .eq("student_id", studentId);

  if (orders.length === 0) {
    if (enrollments.length === 0) {
      throw new Error("No Enrollment Found");
    }
  }

  // student enrollထားရင် enrollထားတဲ့ course idကိုယူ

  const courseIds = enrollments.map((enrollment) => enrollment.course_id);

  // ရတဲ့ idနဲ့ data fetch

  const { data: courses, error: coursesError } = await supabase
    .from("courses")
    .select("*,lessons(*)")
    .in("id", courseIds);

  return (
    <div className="flex-1 bg-background flex items-center justify-center">
      <div className="container px-4 mx-auto grid grid-cols-1 lg:grid-cols-2 py-4 gap-4">
        <DashboardCard title="Enroll Courses" items={courseIds.length}>
          {orders.length > 0 &&
            orders.map((order) => (
              <div key={order.courses.title} className="my-3">
                <div className="alert bg-secondary text-white ">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="stroke-current flex-shrink-0 w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span>
                      {order.courses.title} course is pending for enroll!
                    </span>
                  </div>
                </div>
              </div>
            ))}
          {courses &&
            courses.map((course) => (
              <EnrollCourseCard
                key={course.id}
                title={course.title}
                url={`/student/enroll/${course.id}`}
                classes={course.lessons.length}
              />
            ))}
        </DashboardCard>

        <div>
          <DashboardCard title="Certificates" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
