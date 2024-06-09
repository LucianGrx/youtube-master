
const Navbar = () => {
  return (
    <div className="border-b border-gray-500 w-full md:pt-0 pt-10">
        <div className="max-w-7xl mx-auto max-h-28 md:px-5 px-3 flex justify-between">
            <img className="md:max-w-28 md:max-h-28 max-w-24 max-h-24 object-cover" alt="image logo" src="/images/global.png"></img>
            <img className="max-w-sm object-cover md:block hidden" alt="image title" src="/images/h1.png"></img>
            <div className="flex items-center">
                <div className="md:w-10 md:h-10 w-9 h-9 bg-white rounded-full flex items-center justify-center">
                    <img className="md:w-7 md:h-7 w-6 h-6" alt="website link" src="/icons/website-icon.png"></img>
                </div>
                <div className="md:w-10 md:h-10 w-9 h-9 bg-white rounded-full mx-6 flex items-center justify-center">
                    <img className="md:w-7 md:h-7 w-6 h-6" alt="linkedin link" src="/icons/linkedin-icon.png"></img>
                </div>
                <div className="md:w-10 md:h-10 w-9 h-9 bg-white rounded-full flex items-center justify-center">
                    <img className="md:w-7 md:h-7 w-6 h-6" alt="instagram link" src="/icons/insta-icon.png"></img>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar