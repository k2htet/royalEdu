const Footer = () => {
  return (
    <footer className="py-4">
      <div className="hidden lg:flex justify-between container mx-auto px-4">
        <div className="w-[30%]">
          <h1 className="text-h4 text-primary font-bold my-2">Royal.edu</h1>
          <p className={`font-myanmar text-base text-black-100`}>
            အင်တာနက်ရှိရုံဖြင့် နေရာမရွေး အချိန်မရွေးသင်ယူလေ့လာနိုင်မည့်
            <span className="font-poppins"> Nihongo </span>
            သင်ကြားရေး <span className="font-poppins">Website !</span>
          </p>
        </div>
        <div className="w-[30%]">
          <h1 className="text-h4 text-primary my-2">Contact Us</h1>
          <p className="text-h6 text-black-100">09962560377</p>
          <p className="text-h6 text-black-100">kokohtet.dev@gmail.com</p>
          <p className="text-h6 text-black-100">No.9 Nat Chaung 3st,Tamwe</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
