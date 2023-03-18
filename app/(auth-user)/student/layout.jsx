import { Footer } from "@/app/components";
import Navbar from "../components/Navbar";
import { createClient } from "@/app/utils/supabase-server";

const AuthLayout = async ({ children }) => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return (
    <section className="min-h-screen flex flex-col">
      <Navbar user={data.user} />
      {children}
      <Footer />
    </section>
  );
};

export default AuthLayout;
