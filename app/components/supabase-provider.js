"use client";

import { createContext, useContext, useState } from "react";
import { createClient } from "../utils/supabase-browser";

const Context = createContext();

export default function SupabaseProvider({ children, session }) {
  const [supabase] = useState(() => createClient());

  return (
    <Context.Provider value={{ supabase, session }}>
      <>{children}</>
    </Context.Provider>
  );
}

export const useSupabase = () => useContext(Context);
