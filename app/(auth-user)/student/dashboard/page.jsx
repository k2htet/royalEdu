import { createClient } from "@/app/utils/supabase-server";
import DashboardCard from "../../components/DashboardCard";
import EnrollCourseCard from "../../components/EnrollCourseCard";

const Dashboard = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex-1 bg-background flex items-center justify-center">
      <div className="container px-4 mx-auto grid grid-cols-1 lg:grid-cols-2 py-4 gap-4">
        <div className="space-y-3">
          <DashboardCard title="Enroll Courses" items="2">
            <EnrollCourseCard
              title="N5 Full Package"
              classes="80 Classes"
              url="/"
            />
          </DashboardCard>
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
