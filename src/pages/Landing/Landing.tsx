import { Link } from "react-router-dom";
import { useDispatch } from "@/store/hooks";
import "./Landing.css";

const Landing = () => {
  const dispatch = useDispatch();
  return (
    <div className="page fixed h-screen w-screen p-0 top-0 left-0 bg-black justify-center">
      <div className="w-full max-w-screen-lg logo-mask m-16 animate-fade aspect-[1.9]">
        <video playsInline autoPlay muted loop className="h-full w-full">
          <source src="https://www.pexels.com/es-es/download/video/4125737/?fps=25.0&h=226&w=426" />
        </video>
      </div>
      <span className="tracking-[0.8em] text-center font-thin text-white text-lg uppercase p-8">
        Luxury Tattoo Studio
      </span>
      <div className="flex items-center mt-8 gap-x-4">
        <Link to="/login" className="btn btn-outline">
          Client zone
        </Link>
        <Link to="/gallery" className="btn btn-outline">
          Gallery
        </Link>
      </div>
    </div>
  );
};

export default Landing;
