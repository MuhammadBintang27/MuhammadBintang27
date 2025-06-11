import { useEffect } from "react";
import "./style.css";

const SkillCloud = () => {
  useEffect(() => {
    const skills = document.querySelectorAll(".skill");

    const getRandomSkills = (num) => {
      const shuffled = [...skills].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, num); // Pilih 2 atau 3 skill secara acak
    };

    const animateSkills = () => {
      // Reset all scales
      skills.forEach((skill) => {
        skill.classList.remove("scale-up");
      });

      // Pilih 2 atau 3 skill secara acak dan terapkan animasi bubble
      const randomSkills = getRandomSkills(2 + Math.floor(Math.random() * 2)); // 2 atau 3 skill
      randomSkills.forEach((skill) => {
        skill.classList.add("scale-up");
      });
    };

    // Jalankan animasi setiap 2 detik
    const interval = setInterval(animateSkills, 2000);

    // Cleanup interval ketika komponen tidak lagi digunakan
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-center h-screen w-full max-w-6xl mx-auto px-4">
      {/* Left Section: about me */}
      <div className="w-full md:w-1/2 text-white text-center flex flex-col items-center justify-center mb-8 md:mb-0 ">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
        <p className="text-base md:text-lg text-teal-400 text-justify md:px-8"> 
          I’m an Informatics student at Universitas Syiah Kuala, passionate
          about technology and innovation. Actively involved in campus
          organizations and IT projects, I’m always learning and growing through
          hands-on experience. Outside of academics, I'm a huge football fan,
          especially when it comes to Manchester United, always excited to dive
          into discussions about the game.
        </p>
      </div>

      {/* Right Section: My Expertise */}
      <div className="w-full md:w-1/2 text-white text-center flex flex-col items-center justify-center">
      <div className=" text-4xl md:text-5xl font-bold text-center text-white transform mb-[30px]">
          My Expertise
        </div>
        <div className="relative w-[400px] h-[400px] mx-auto flex items-center justify-center">
          {/* Web Development Title */}
          <span className="absolute text-[24px] font-bold text-white top-[7%] left-[30%] transform -translate-x-1/2">
            <span className="block">Web</span>
            <span className="block">Development</span>
          </span>

          {/* Web Development Small Titles */}
          <span className="skill absolute text-[18px] font-semibold text-teal-400 top-[0%] left-[5%]">
            React
          </span>
          <span className="skill absolute text-[18px] font-semibold text-teal-400 top-[5%] left-[36%]">
            Next Js
          </span>
          <span className="skill absolute text-[18px] font-semibold text-teal-400 top-[26%] left-[0%]">
            Node JS
          </span>
          <span className="skill absolute text-[18px] font-semibold text-teal-400 top-[22%] right-[35%]">
            Laravel
          </span>

          {/* Coding Title */}
          <span className="absolute text-[24px] font-bold text-white top-[38%] left-[20%] transform -translate-x-1/2">
            <span className="block">Coding</span>
          </span>

          {/* Coding Small Titles */}
          <span className="skill absolute text-[18px] font-semibold text-teal-400 top-[32%] left-[3%]">
            JavaScript
          </span>
          <span className="skill absolute text-[18px] font-semibold text-teal-400 top-[37%] left-[34%]">
            Python
          </span>
          <span className="skill absolute text-[18px] font-semibold text-teal-400 top-[47%] left-[29%]">
            PHP
          </span>
          <span className="skill absolute text-[18px] font-semibold text-teal-400 top-[47%] left-[10%]">
            Java
          </span>
          <span className="skill absolute text-[18px] font-semibold text-teal-400 top-[45%] left-[2%]">
            C
          </span>

          {/* Machine Learning Title */}
          <span className="absolute text-[24px] font-bold text-white top-[39%] left-[63%] transform -translate-x-1/2">
            <span className="block">Machine</span>
            <span className="block">Learning</span>
          </span>

          {/* Machine Learning Small Titles */}
          <span className="skill absolute text-[18px] font-semibold text-teal-400 top-[32%] left-[57%]">
            OpenCV
          </span>
          <span className="skill absolute text-[18px] font-semibold text-teal-400 top-[40%] left-[78%]">
            <span className="block">Web</span>
            <span className="block">Scrapping</span>
          </span>
          <span className="skill absolute text-[18px] font-semibold text-teal-400 top-[58%] left-[59%]">
            <span className="block">Neural</span>
            <span className="block">Networks</span>
          </span>
          <span className="skill absolute text-[18px] font-semibold text-teal-400 top-[58%] left-[42%]">
            NLP
          </span>

          {/* Database Title */}
          <span className="absolute text-[24px] font-bold text-white top-[65%] left-[16%] transform -translate-x-1/2">
            <span className="block">Database</span>
            <span className="block">Management</span>
          </span>

          {/* Database Small Titles */}
          <span className="skill absolute text-[18px] font-semibold text-teal-400 top-[58%] left-[2%]">
            NoSQL
          </span>
          <span className="skill absolute text-[18px] font-semibold text-teal-400 top-[70%] left-[38%]">
            SQL
          </span>
          <span className="skill absolute text-[18px] font-semibold text-teal-400 top-[84%] left-[0%]">
            RDBMS
          </span>
          <span className="skill absolute text-[18px] font-semibold text-teal-400 top-[83%] left-[30%]">
            <span className="block">Data</span>
            <span className="block">Modeling</span>
          </span>

          {/* Mobile Development Title */}
          <span className="absolute text-[24px] font-bold text-white top-[74%] left-[80%] transform -translate-x-1/2">
            <span className="block">Mobile</span>
            <span className="block">Development</span>
          </span>

          {/* Mobile Development Small Titles */}
          <span className="skill absolute text-[18px] font-semibold text-teal-400 top-[90%] left-[60%]">
            <span className="block">State</span>
            <span className="block">Management</span>
          </span>
          <span className="skill absolute text-[18px] font-semibold text-teal-400 top-[80%] left-[45%]">
            Flutter
          </span>
          <span className="skill absolute text-[18px] font-semibold text-teal-400 top-[70%] left-[82%]">
            <span className="block">Firebase</span>
            <span className="block">Integration</span>
          </span>
          <span className="skill absolute text-[18px] font-semibold text-teal-400 top-[83%] left-[30%]">
            <span className="block">Data</span>
            <span className="block">Modeling</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SkillCloud;
