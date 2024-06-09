import PropTypes from "prop-types";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DownloadButton = ({ videoInfo }) => {
  const Menu = ["MP4 720", "MP4 420", "MP4 360", "MP3", "AVI"];
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState("MP4 720");

  const [isLoading, setIsLoading] = useState(false);

  const fetchAndDownload = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/proxy_download?stream_url=${encodeURIComponent(
          videoInfo.stream_url
        )}&title=${encodeURIComponent(videoInfo.title)}`
      );
      if (!res.ok) {
        console.error("Network response was not ok", res);
        throw new Error("Network response was not ok");
      }
      const blob = await res.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const downloadLink = document.createElement("a");
      downloadLink.href = downloadUrl;
      downloadLink.setAttribute("download", `${videoInfo.title}.mp4`);
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const variants = {
    open: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
    closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="mt-16">
      {isLoading ? <span>Loading to compress</span> : ""}

      <div
        className="justify-start text-left"
      >
        <button
          className="bg-red-base text-xl rounded-l-2xl py-3 px-4 text-white"
          onClick={fetchAndDownload}
        >
          Download
        </button>

        <button
          onClick={() => setOpen(!open)}
          className="bg-white text-xl font-semibold text-red-base rounded-r-2xl py-3 px-8"
        >
          {menu}
          <AnimatePresence>
            {open && (
              <motion.ul
                initial="closed"
                animate="open"
                exit="closed"
                variants={variants}
                className="bg-white text-red-base mt-4 rounded-r-2xl overflow-hidden"
                style={{ overflow: "hidden" }}
              >
                {Menu.map((menuItem) => (
                  <li
                    onClick={() => {
                      setOpen(false);
                      setMenu(menuItem);
                    }}
                    key={menuItem}
                    className="p-2 cursor-pointer rounded hover:bg-red-dark2 hover:text-white"
                  >
                    {menuItem}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
};

DownloadButton.propTypes = {
  videoInfo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    stream_url: PropTypes.string.isRequired,
  }).isRequired,
};

export default DownloadButton;
