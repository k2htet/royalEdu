import { Footer, Navbar } from "@/app/components";

const CheckoutLayout = async ({ children }) => {
  return (
    <section className="min-h-screen flex flex-col">
      <Navbar />
      {children}
    </section>
  );
};

export default CheckoutLayout;
