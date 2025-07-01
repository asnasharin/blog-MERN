import { Link } from "react-router-dom";
import heroImage from "../../assets/hero.png"; // adjust the path if needed

export default function Hero() {
  return (
    <section className="px-4 md:px-12 mt-6">
      <div className="relative w-full h-[80vh] rounded-2xl overflow-hidden shadow-lg">
       
        <img
          src={heroImage}
          alt="Hero Banner"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start px-8 md:px-16 text-white rounded-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to My Blog
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl">
            Dive into stories, tutorials, and developer journeys. Learn and grow, one post at a time.
          </p>
        </div>
      </div>
    </section>
  );
}
