import { useState, useCallback } from "react";
import axios from "axios";
import DownloadButton from "../DownloadButton";

const Hooks = () => {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [videoInfo, setVideoInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useCallback(async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/download", {
        url,
      });

      const { title, thumbnail, stream_url } = response.data.video_info;


      setVideoInfo({ title, thumbnail, stream_url });
      setMessage("Download succesful!");
      console.log(message);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  },[url, message]);

  return (
    <>
      <form
        className="relative w-full max-w-2xl mx-auto"
        onSubmit={handleSearch}
      >
        <div className="relative">
          <input
            className="w-full md:py-8 py-4 px-4 pr-20 border md:text-xl text-sm border-black bg-white rounded-3xl text-black"
            type="text"
            placeholder="Search or paste youtube link here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          
          <button
            className="absolute right-0 h-full md:text-xl text-sm md:px-8 px-4 py-2 bg-red-base text-white rounded-3xl"
            type="submit"
          >
            Search
          </button>
          
        </div>
      </form>
      <span className="text-xs md:text-sm">
        By using our service are accepting our Term and Conditions
      </span>
      {isLoading ? "Se incarca" : ""}
      {videoInfo && (
        <div className="w-full my-12 rounded-3xl flex justify-center px-10 py-4 bg-tautara-base max-w-4xl mx-auto mt-8">
          <div className="w-2/4  my-4 mr-8">
            <img
              className="rounded-3xl w-full h-full max-h-44 object-cover"
              src={videoInfo.thumbnail}
              alt="Thumbnail"
            />
          </div>
          <div className="my-4 relative flex flex-col justify-between">
            <h2 className="text-xl font-bold text-left">{videoInfo.title}</h2>
            <DownloadButton videoInfo={videoInfo} />
          </div>
        </div>
      )}
    </>
  );
};

export default Hooks;
