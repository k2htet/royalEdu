import Image from "next/image";

import { Navbar, Footer, Button, ReasonCard, FAQItem } from "./components";
import { faqData } from "./constant/data";
import hero from "../public/hero.svg";
import wwa from "../public/whoweare.svg";
import rwc from "../public/rwc.svg";
import faq from "../public/faq.svg";

export default function Home() {
  return (
    <section className="flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* landing start  */}
        <div id="landing" className="bg-background">
          <div className="grid grid-cols-1 items-center text-center min-h-screen container px-4 mx-auto lg:grid-cols-3 lg:text-start">
            <div className="col-span-2">
              <h2 className="text-h6 font-bold sm:text-h5 md:text-h4 lg:text-h3 xl:text-h2 text-black-100">
                In This <span className="text-primary">2023</span>
              </h2>
              <h1 className="text-h4 text-primary my-1 font-bold sm:text-h3 md:text-h3 lg:text-h2 xl:text-h1 xl:my-4">
                Are You Ready To Learn Japanese?
              </h1>
              <Button
                title="Join Our Course"
                href="/courses"
                colorClass="bg-primary"
              />
            </div>
            <div className="hidden w-full h-full lg:flex items-center ">
              <Image src={hero} alt="hero image" className="w-full h-auto" />
            </div>
          </div>
        </div>
        {/* landing end  */}

        {/* learn now start */}
        <div className="bg-secondary">
          <div className="min-h-screen flex justify-center items-center flex-col gap-5 container mx-auto p-4">
            <div className="w-full md:w-[50%] h-full">
              <Image src={wwa} alt="wwa image" className="w-full h-auto" />
            </div>
            <div className="text-white w-full md:w-[70%] lg:w-[60%]">
              <h1 className="text-center text-h3 font-bold md:text-h2 lg:text-h1">
                Learn Now
              </h1>
              <p className="text-base md:text-h6 font-bold">
                ယခုလို တိုးတက်နေတဲ့ ခေတ်ကြီးတွင် ဘာသာစကားများ
                သင်ယူတတ်မြောက်ထားခြင်းဖြင့် အလုပ်အကိုင်အခွင့်အလမ်းများ
                တိုးပွားလာနိုင်ပါသည်။ ပြင်ပတွင်သင်တန်းများ တက်ရောက်လိုသော်လည်း
                အကြောင်းအရင်းအမျိုးမျိုးကြောင့် မတက်ရောက်နိုင်သူများ၊ ရပ်ဝေးတွင်
                ရှိနေသော သင်ယူလိုသူများအား ရည်ရွယ်၍ eJLS Website ကို
                တည်ထောင်လိုက်ခြင်းဖြစ်သည်။ အင်တာနက်ရှိရုံဖြင့် အချိန်တိုင်း
                နေရာတိုင်းတွင် အမှန်တကယ် တတ်မြောက်သည်အထိ သင်ယူနိုင်သော Website
                တစ်ခုအဖြစ် ပြုလုပ်ထားပါသည်။ အခြေခံအဆင့်မှ အဆင့်မြင့်ဂျပန်စာအထိ
                လေ့လာသင်ယူနိုင်ပြီး ဂျပန်နိုင်ငံအသိအမှတ်ပြုစာမေးပွဲများတွင်လည်း
                အောင်မြင်နိုင်စေရန် ကြိုးပမ်းအားထုတ်ထားပါသည်။
              </p>
            </div>
          </div>
        </div>
        {/* learn now end */}

        {/* reason why choose start */}
        <div className="bg-background min-h-screen flex flex-col justify-center lg:justify-around">
          <h1 className="text-h4 font-bold text-black-100 text-center underline underline-offset-8 py-4 md:text-h3 lg:text-h2">
            Reason Why Choose <span className="text-primary">Royal.edu</span>
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 container p-4 mx-auto">
            <div className="my-auto hidden lg:block">
              <Image
                src={rwc}
                alt="rwc image"
                className="w-full max-h-[500px]"
              />
            </div>
            <div>
              <ReasonCard />
            </div>
          </div>
        </div>
        {/* reason why choose end */}

        {/* faq start */}
        <div className="bg-secondary">
          <div className="min-h-screen container grid grid-cols-1 lg:grid-cols-2 items-center p-4 mx-auto gap-3">
            <div className="hidden lg:block">
              <Image src={faq} className="w-full h-auto" alt="faq image" />
            </div>
            <div className="space-y-2">
              <h1 className="text-white text-center font-bold text-h3 lg:text-start">
                FAQ
              </h1>
              {faqData.map((data) => (
                <FAQItem
                  key={data.id}
                  id={data.id}
                  title={data.title}
                  des={data.des}
                />
              ))}
            </div>
          </div>
        </div>
        {/* faq end */}
      </main>
      <Footer />
    </section>
  );
}
