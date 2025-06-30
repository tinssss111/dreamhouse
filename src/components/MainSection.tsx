/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";

const MainSection = () => {
  const contractAddress = "GkyPYa7NnCFbduLknCfBfP7p8564X1VZhwZYJ6CZpump";
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="bg-[#F5E6D3] w-full min-h-screen flex items-center justify-center py-16 sm:py-20 lg:py-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Layout (stacked) */}
        <div className="lg:hidden flex flex-col items-center text-center space-y-8 sm:space-y-12">
          <div
            className={`w-full max-w-md sm:max-w-lg transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <img
              src="./images/mainsection.png"
              alt="Dreamhouse"
              className="w-full h-auto max-h-[300px] sm:max-h-[400px] object-contain hover:scale-105 transition-transform duration-700 ease-in-out float-animation"
            />
          </div>

          <div
            className={`w-full max-w-2xl space-y-6 sm:space-y-8 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl uppercase italic font-bold hover:text-orange-500 transition-colors duration-500 cursor-default">
              $Dreamhouse
            </h2>
            <p
              className={`text-lg sm:text-xl md:text-2xl lowercase transition-all duration-1000 delay-300 hover:scale-105 px-4 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              Dreamhouse is a community-driven project that aims to create a
              decentralized real estate platform.
            </p>
            <div
              className={`transition-all duration-1000 delay-500 px-4 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              <div className="flex flex-col sm:flex-row items-center justify-center bg-white p-3 sm:p-4 border-[2px] border-b-[4px] border-[var(--black)] rounded-[8px] text-[16px] sm:text-[18px] transition-all duration-300 ease-in-out hover:border-t-[4px] hover:border-b-[2px] hover:shadow-lg max-w-full">
                <span className="text-md sm:text-[16px] md:text-xl hover:text-orange-500 transition-colors duration-300 break-all text-center mb-3 sm:mb-0 sm:mr-3">
                  <strong className="">CA:</strong>
                  {contractAddress}
                </span>

                <button
                  onClick={copyToClipboard}
                  className={`rounded-md py-2 px-4 text-lg sm:text-xl transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 whitespace-nowrap ${
                    copied
                      ? "bg-amber-300 hover:bg-amber-400 text-white"
                      : "bg-amber-500 hover:bg-amber-600"
                  }`}
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout (side by side) */}
        <div className="hidden lg:flex justify-between items-center">
          <div
            className={`w-[50%] text-3xl uppercase patrick-hand-regular space-y-8 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <h2 className="text-6xl xl:text-8xl uppercase italic font-bold hover:text-orange-500 transition-colors duration-500 cursor-default">
              $Dreamhouse
            </h2>
            <p
              className={`text-2xl xl:text-3xl lowercase transition-all duration-1000 delay-300 hover:scale-105 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              Dreamhouse is a community-driven project that aims to create a
              decentralized real estate platform.
            </p>
            <div
              className={`transition-all duration-1000 delay-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              <div className="flex mr-5 justify-center w-[540px] xl:w-[650px] items-center bg-white p-4 border-[2px] border-b-[4px] border-[var(--black)] rounded-[8px] text-[18px] xl:text-[20px] transition-all duration-300 ease-in-out hover:border-t-[4px] hover:border-b-[2px] hover:shadow-lg">
                <span className="text-[17px] xl:text-xl hover:text-orange-500 transition-colors duration-300">
                  <strong className="mr-1">CA:</strong>
                  {contractAddress}
                </span>

                <button
                  onClick={copyToClipboard}
                  className={`rounded-md py-2 px-4 text-xl xl:text-2xl ml-1 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 ${
                    copied
                      ? "bg-amber-300 hover:bg-amber-400 text-white"
                      : "bg-amber-500 hover:bg-amber-600"
                  }`}
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>
          <div
            className={`w-[50%] transition-all duration-1000 delay-200 text-center ml-14 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <img
              src="./images/mainsection.png"
              alt="Dreamhouse"
              className="h-[600px] xl:h-[700px] xl:w-[800px] hover:scale-105 transition-transform duration-700 ease-in-out float-animation"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
