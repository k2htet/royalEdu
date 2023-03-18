import { createClient } from "@/app/utils/supabase-server";
import DashboardCard from "../../components/DashboardCard";
import EnrollCourseCard from "../../components/EnrollCourseCard";

const Dashboard = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const studentId = user ? user.id : null;

  // enrollment tableထဲမှာ student id ရှိမရှိစစ်

  const { data: enrollments, error: enrollmentsError } = await supabase
    .from("enrollment")
    .select("course_id")
    .eq("student_id", studentId);

  if (enrollments.length === 0) {
    throw new Error("No Enrollment Found");
  }

  // student enrollထားရင် enrollထားတဲ့ course idကိုယူ

  const courseIds = enrollments.map((enrollment) => enrollment.course_id);

  // ရတဲ့ idနဲ့ data fetch

  const { data: courses, error: coursesError } = await supabase
    .from("courses")
    .select("*,lessons(*)")
    .in("id", courseIds);

  if (courses.length === 0) {
    throw new Error("No Enroll Course Found");
  }

  return (
    <div className="flex-1 bg-background flex items-center justify-center">
      <div className="container px-4 mx-auto grid grid-cols-1 lg:grid-cols-2 py-4 gap-4">
        <DashboardCard title="Enroll Courses" items={courseIds.length}>
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
          <DashboardCard />
        </div>
        <div>
          <DashboardCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
