import { createClient } from "@/app/utils/supabase-server";

const Dashboard = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex-1 bg-background flex items-center justify-center">
      <div className="container px-4 mx-auto grid grid-cols-1 lg:grid-cols-2 py-4">
        <h1 className="text-primary">မကြာမီလာမည်။</h1>
      </div>
    </div>
  );
};

export default Dashboard;
