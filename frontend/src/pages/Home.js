import React, { useState } from "react";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  const onClickLogin = () => {
    window.location.href = "/login";
  }

  const onClickSignUp = () => {
    window.location.href = "/signup";
  }


  return (
    <div className="flex items-center flex-col bg-gradient-to-r h-screen from-gray-100 via-green-50 to-indigo-50">
      <div className="mx-[5%] my-[1%] text-[40px] sm:text-[60px] md:text-[70px] lg:text-[75px] w-[80%] text-center text-[#666666] ">
        <span className="font-bold bg-gradient-to-r from-sky-400 to-emerald-500 bg-clip-text text-transparent ">
        Welcome to 
        </span>{" "}
        <span className="font-bold bg-gradient-to-r from-emerald-500 to-sky-300 bg-clip-text text-transparent">
        PortfolioPro
        </span>
      </div>
      <div className="text-[25px] w-[80%] sm:w-[70%] md:w-[50%] lg:w-[37%] text-center text-[#666666] ">
      Buy, sell, and visualize stocks easily. Take control of your investments with our intuitive platform.
      </div>
      <div className="">
        <button
          onClick={onClickSignUp}
          className="m-5 py-2 px-5 bg-black text-white rounded-md "
        >
          Sign Up
        </button>
        <button
          onClick={onClickLogin}
          className="m-5 py-2 px-5 border border-black text-black rounded-md"
        >
          Login
        </button>
      </div>
      
    </div>
  );
};

export default Home;

// import React from 'react';

// function Home() {
//   return (
//     <div>
//       <div className='bg-gradient-to-r from-[#6E56CF] to-[#F9D1FF] text-transparent bg-clip-text text-6xl text-center mt-8'>
//         Welcome to PortfolioPro!
//       </div>
//     </div>
//   );
// }

// export default Home;
