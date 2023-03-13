import { Footer, Navbar } from "../components";

const GuestLayout = async ({ children }) => {
  return (
    <section className="min-h-screen flex flex-col">
      <Navbar />
      {children}
      <Footer />
    </section>
  );
};

export default GuestLayout;
