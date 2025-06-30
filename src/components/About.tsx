/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const About = () => {
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

    const aboutElement = document.getElementById("about");
    if (aboutElement) {
      observer.observe(aboutElement);
    }

    return () => {
      if (aboutElement) {
        observer.unobserve(aboutElement);
      }
    };
  }, []);

  interface InfoToken {
    image: string;
    url: string;
  }
  const infoToken: InfoToken[] = [
    {
      image: "/logo/coingecko.svg",
      url: "https://www.coingecko.com/en/coins/chill-house",
    },
    {
      image: "/logo/jupiter.svg",
      url: "https://jup.ag/swap/So11111111111111111111111111111111111111112-GkyPYa7NnCFbduLknCfBfP7p8564X1VZhwZYJ6CZpump",
    },
    {
      image: "/logo/dexscreener.svg",
      url: "https://dexscreener.com/solana/35tqqmeirwebk6fr5qipwastuaavo32vjnuljpxvsxuk",
    },
    {
      image: "/logo/dextools.svg",
      url: "https://www.dextools.io/app/en/solana/pair-explorer/35TqQMeiRwEbK6FR5qiPwastuAAvo32VjnULJpxVSxUK?t=1751249596596",
    },
  ];
  const linkBuyToken =
    "https://pump.fun/coin/GkyPYa7NnCFbduLknCfBfP7p8564X1VZhwZYJ6CZpump?include-nsfw=true";
  return (
    <div
      id="about"
      className="bg-[#FAF1E8] scroll-mt-20 py-12 sm:py-16 lg:py-20"
    >
      {/* Mobile Layout */}
      <div className="lg:hidden container mx-auto px-4 sm:px-6">
        <div
          className={`flex flex-col items-center text-center space-y-8 sm:space-y-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div
            className={`w-full max-w-xs sm:max-w-sm transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <img
              src="/logo/house.png"
              alt="Dreamhouse"
              className="w-full h-auto hover:scale-105 transition-transform duration-700 ease-in-out float-animation"
            />
          </div>

          <div
            className={`w-full max-w-2xl space-y-6 sm:space-y-8 transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl uppercase font-bold hover:text-orange-500 transition-colors duration-300 px-4">
              About $Dreamhouse
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl lowercase hover:scale-105 transition-transform duration-300 px-4">
              Dreamhouse is a community-driven project that aims to create a
              decentralized real estate platform.
            </p>
            <div className="px-4">
              <a
                href={linkBuyToken}
                target="_blank"
                className="inline-block uppercase bg-orange-500 py-3 sm:py-4 px-4 sm:px-6 border-[2px] border-b-[4px] border-[var(--black)] rounded-[8px] text-[16px] sm:text-[18px] font-semibold transition-all duration-300 ease-in-out hover:border-t-[4px] hover:border-b-[2px] hover:scale-105 hover:shadow-lg hover:bg-orange-600 active:scale-95"
              >
                Buy $Dreamhouse
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Social Links */}
        <div
          className={`flex flex-wrap items-center gap-4 sm:gap-6 justify-center py-8 sm:py-12 transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {infoToken.map((item, index) => (
            <Link key={item.image} href={item.url} target="_blank">
              <img
                src={item.image}
                alt="Dreamhouse"
                className="w-[100%] h-[100%] sm:w-40 sm:h-40 rounded-full object-contain hover:scale-125 transition-all duration-300 ease-in-out hover:rotate-12 hover:shadow-xl"
                style={{
                  animationDelay: `${index * 100 + 800}ms`,
                  animation: isVisible
                    ? `fadeInScale 0.6s ease-out forwards`
                    : "none",
                }}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div
          className={`container mx-auto px-6 xl:px-8 flex justify-between items-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div
            className={`w-[40%] transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <img
              src="/logo/house.png"
              alt="Dreamhouse"
              className="hover:scale-105 transition-transform duration-500 ease-in-out float-animation"
            />
          </div>
          <div
            className={`w-[50%] gap-10 space-y-5 text-center transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <h2 className="text-6xl xl:text-8xl uppercase font-bold hover:text-orange-500 transition-colors duration-300">
              About $Dreamhouse
            </h2>
            <p className="text-2xl xl:text-3xl lowercase hover:scale-105 transition-transform duration-300">
              Dreamhouse is a community-driven project that aims to create a
              decentralized real estate platform.
            </p>
            <a
              href={linkBuyToken}
              target="_blank"
              className="inline-block uppercase bg-orange-500 py-4 px-6 xl:py-5 xl:px-8 border-[2px] border-b-[4px] border-[var(--black)] rounded-[8px] text-[18px] xl:text-[20px] transition-all duration-300 ease-in-out hover:border-t-[4px] hover:border-b-[2px] hover:scale-105 hover:shadow-lg hover:bg-orange-600 active:scale-95"
            >
              Buy $Dreamhouse
            </a>
          </div>
        </div>

        {/* Desktop Social Links */}
        <div
          className={`flex items-center gap-4 xl:gap-10 justify-center py-10 xl:py-12 transition-all duration-2000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {infoToken.map((item, index) => (
            <Link key={item.image} href={item.url} target="_blank">
              <img
                src={item.image}
                alt="Dreamhouse"
                className="w-20 h-20 xl:w-40 xl:h-40 rounded-full object-contain hover:scale-125 transition-all duration-300 ease-in-out hover:rotate-12 hover:shadow-xl"
                style={{
                  animationDelay: `${index * 100 + 800}ms`,
                  animation: isVisible
                    ? `fadeInScale 0.6s ease-out forwards`
                    : "none",
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
