import "server-only";
import React, { Suspense } from "react";
import "./globals.css";

import { Poppins } from "next/font/google";
import { Noto_Sans_Myanmar } from "next/font/google";
import SupabaseProvider from "./components/supabase-provider";
import SupabaseListener from "./components/supabase-listener";
import { createClient } from "./utils/supabase-server";
import PageLoading from "./loading";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--poppins",
});

const myanmar = Noto_Sans_Myanmar({
  weight: "400",
  display: "swap",
  subsets: ["myanmar"],
  variable: "--myanmar",
});

export const metadata = {
  title: "Royal.Edu",
};

export default async function RootLayout({ children }) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <head />
      <body className={`${poppins.variable} ${myanmar.variable}`}>
        <SupabaseProvider session={session}>
          <SupabaseListener serverAccessToken={session?.access_token} />
          <Suspense fallback={<PageLoading />}>{children}</Suspense>
        </SupabaseProvider>
      </body>
    </html>
  );
}
