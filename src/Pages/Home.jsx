import LayoutWeb from "../Components/Layouts/Layout";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen text-white pt-[93px] px-4 md:px-8 lg:px-16">
        {/* Header Section */}
        <div className="flex items-center relative mt-6 mb-4">
          {/* Circular Background for Hello */}
          <div className="text-md md:text-base bg-blue-700 py-1 px-3 rounded-full flex items-center">
            <span className="text-orange-300 font-semibold">Hello!</span>
          </div>
          {/* Smaller Vector Image Positioned Next to the Circular Background */}
          <img
            src="/vector1.png" // Ensure this path is correct
            alt="Vector Graphic"
            className="animated-vector -mt-10 w-8 h-8 md:w-8 md:h-8 animate-move-up-down" // Apply custom Tailwind animation class
          />
        </div>

        {/* Main Title */}
        <h1 className="text-3xl md:text-5xl font-bold leading-tight text-center mb-10">
          I’m <span className="text-orange-300">Bintang</span>,
          <br /> Web & Mobile Developer
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 w-full max-w-3xl">
          {/* Image Section */}
          <div className="flex-1 relative -mt-[49px]">
            {/* Image Wrapper */}
            <div>
              <img
                src="/fotoutama.png" // Ensure this path is correct
                alt="Bintang"
                className="w-full max-w-xs mx-auto object-contain relative z-10"
              />
            </div>
            {/* Rounded Background (Light Effect with animation) */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-orange-300 to-transparent animate-fluidWave"
              style={{
                clipPath: "ellipse(120% 100% at 50% 100%)", // Initial clip-path before animation
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
