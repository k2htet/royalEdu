import "server-only";
import { Footer } from "@/app/components";
import Navbar from "../components/Navbar";
import { createClient } from "@/app/utils/supabase-server";
import { Suspense } from "react";
import PageLoading from "./loading";

const AuthLayout = async ({ children }) => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return (
    <section className="min-h-screen flex flex-col">
      <Navbar user={data.user} />
      <Suspense fallback={<PageLoading />}>{children}</Suspense>

      <Footer />
    </section>
  );
};

export default AuthLayout;
