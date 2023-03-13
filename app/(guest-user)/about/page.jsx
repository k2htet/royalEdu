import Image from "next/image";
import aboutImg from "../../../public/aboutImg.svg";

const About = () => {
  return (
    <div className="flex-1 bg-background flex items-center justify-center">
      <div className="container px-4 mx-auto grid grid-cols-1 lg:grid-cols-2 py-4">
        <div className="flex items-center">
          <Image
            src={aboutImg}
            alt="about img"
            className="w-[50%] lg:w-[60%] xl:w-[70%] h-auto mx-auto"
          />
        </div>
        <div className="font-poppins space-y-1">
          <h1 className="text-primary text-h2  text-center lg:text-start">
            About Us
          </h1>
          <h2 className="text-primary text-h3 text-center lg:text-start">
            Introduction
          </h2>
          <p className="text-base text-black-100">
            eJLS is a Japanese language education website where you can learn
            real-time, anywhere just by having the internet. Not only can you
            learn from basic to advanced Japanese, but you can also learn
            Japanese-related information, you can also learn knowledge. An
            e-Learning Website that allows you to pass the Japan Accredited
            Japanese Language Proficiency Test (JLPT, Nat-Test, and JFT Exam) by
            practicing proficiency tests such as Japanese Language Proficiency
            Test in one place. eJLS is an E-Learning Website established by
            WILLTEC MYANMAR Co., Ltd. WILLTEC MYANMAR Co., Ltd is a Myanmar
            branch based in Osaka, Japan, teaching Japanese language to young
            people in Myanmar and introduces employment in Japan. There are also
            training schools in Taunggyi and Yangon. Learning the language can
            increase your job opportunities. The eJLS Website has been set up
            for those students who want to attend external classes but are
            unable to attend for various situations and who want to learn from
            distant places and who have no time for external classes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
