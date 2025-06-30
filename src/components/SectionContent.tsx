/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";

export const SectionContent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const sectionElement = document.getElementById("section-content");
    if (sectionElement) {
      observer.observe(sectionElement);
    }

    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement);
      }
    };
  }, []);

  const linkBuyToken =
    "https://pump.fun/coin/GkyPYa7NnCFbduLknCfBfP7p8564X1VZhwZYJ6CZpump?include-nsfw=true";
  const content =
    "Memecoin inspires the community to live a life without luxury and money.Life without trending audio, stay away from the city";

  return (
    <div id="section-content" className="bg-[#F5E6D3] scroll-mt-20">
      {/* Mobile Layout */}
      <div className="lg:hidden py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div
            className={`flex flex-col items-center text-center space-y-8 sm:space-y-12 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Image First on Mobile */}
            <div
              className={`w-full max-w-md sm:max-w-lg transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <img
                src="./logo/chill.png"
                alt="Dream House coin"
                className="w-full h-auto hover:scale-105 transition-transform duration-700 ease-in-out float-animation drop-shadow-2xl"
              />
            </div>

            {/* Content */}
            <div
              className={`w-full max-w-2xl space-y-6 sm:space-y-8 transition-all duration-1000 delay-400 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl uppercase font-bold hover:text-orange-500 transition-colors duration-500 cursor-default">
                What is Dream House coin?
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 hover:text-gray-900 transition-colors duration-300 leading-relaxed">
                {content}
              </p>
              <div
                className={`flex justify-center transition-all duration-1000 delay-600 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                }`}
              >
                <a
                  href={linkBuyToken}
                  target="_blank"
                  className="inline-flex items-center justify-center uppercase bg-orange-500 py-3 sm:py-4 px-6 sm:px-8 border-[2px] border-b-[4px] border-[var(--black)] rounded-[8px] text-[16px] sm:text-[18px] font-semibold transition-all duration-300 ease-in-out hover:border-t-[4px] hover:border-b-[2px] hover:scale-105 hover:shadow-lg hover:bg-orange-600 active:scale-95 group"
                >
                  Buy $Dreamhouse
                  <img
                    src="/logo/house.png"
                    alt="$Dreamhouse"
                    className="w-6 h-7 sm:w-8 sm:h-10 rounded-md ml-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="container mx-auto min-h-screen px-6 xl:px-8 flex justify-between items-center">
          <div
            className={`w-[50%] xl:w-[60%] space-y-8 xl:space-y-10 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <h2 className="text-5xl xl:text-6xl 2xl:text-7xl uppercase font-bold hover:text-orange-500 transition-colors duration-500 cursor-default">
              What is Dream House coin?
            </h2>
            <p className="text-2xl xl:text-3xl text-gray-700 hover:text-gray-900 transition-colors duration-300 leading-relaxed w-full max-w-4xl">
              {content}
            </p>
            <div
              className={`flex items-center gap-5 transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              <a
                href={linkBuyToken}
                target="_blank"
                className="inline-flex items-center justify-center uppercase bg-orange-500 py-4 xl:py-5 px-8 xl:px-10 border-[2px] border-b-[4px] border-[var(--black)] rounded-[8px] text-[18px] xl:text-[20px] font-semibold transition-all duration-300 ease-in-out hover:border-t-[4px] hover:border-b-[2px] hover:scale-105 hover:shadow-xl hover:bg-orange-600 active:scale-95 group"
              >
                Buy $Dreamhouse
                <img
                  src="/logo/house.png"
                  alt="$Dreamhouse"
                  className="w-8 h-10 xl:w-10 xl:h-12 rounded-md ml-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 ease-in-out drop-shadow-lg"
                />
              </a>
            </div>
          </div>

          <div
            className={`w-[40%] xl:w-[35%] transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative group">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-700 transform scale-110"></div>

              <img
                src="./logo/chill.png"
                alt="Dream House coin"
                className="relative w-full h-auto hover:scale-110 transition-all duration-700 ease-in-out float-animation drop-shadow-2xl group-hover:drop-shadow-3xl"
              />

              {/* Floating particles */}
              <div className="absolute top-1/4 -left-4 w-3 h-3 bg-orange-400 rounded-full opacity-0 group-hover:opacity-70 group-hover:animate-bounce transition-all duration-500 delay-100"></div>
              <div className="absolute top-1/3 -right-6 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-70 group-hover:animate-bounce transition-all duration-500 delay-300"></div>
              <div className="absolute bottom-1/3 -left-2 w-4 h-4 bg-pink-400 rounded-full opacity-0 group-hover:opacity-50 group-hover:animate-bounce transition-all duration-500 delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
