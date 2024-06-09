import Hooks from "../hooks/Hooks";
import Lottie from "react-lottie";
import animationData from "/public/animations/Animation-1715357131400";


const Home = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="w-full md:pt-20 pt-8 px-8">
      <h1 className="font-bold text-3xl">The best YouTube Video Downloader</h1>
      <div>
        <div className="flex justify-center pt-8">
          {/* <img className="w-28 object-contain" src="/images/heart-box.png" alt="heart emoji"></img> */}
          <div className="flex flex-col">
            <img className="w-16 ml-24" src="/images/cat-speaking.png" alt="cat dialog"></img>
            <Lottie options={defaultOptions} width={300} height={85} />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <Hooks />
        </div>
      </div>
    </div>
  );
};

export default Home;
