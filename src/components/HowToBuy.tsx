/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Platform {
  id: number;
  name: string;
  logo: React.ReactNode;
  link: string;
}

export const HowToBuy = () => {
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

    const howToBuyElement = document.getElementById("how-to-buy");
    if (howToBuyElement) {
      observer.observe(howToBuyElement);
    }

    return () => {
      if (howToBuyElement) {
        observer.unobserve(howToBuyElement);
      }
    };
  }, []);

  const platforms: Platform[] = [
    {
      id: 1,
      name: "Buy on Jupiter",
      logo: "/logo/jupiter.svg",
      link: "https://jup.ag/swap/So11111111111111111111111111111111111111112-GkyPYa7NnCFbduLknCfBfP7p8564X1VZhwZYJ6CZpump",
    },
    {
      id: 2,
      name: "Buy on PreRich",
      logo: "/logo/prerich.png",
      link: "https://app.prerich.com/solana/coin/GkyPYa7NnCFbduLknCfBfP7p8564X1VZhwZYJ6CZpump",
    },
    {
      id: 3,
      name: "Buy on Pump.fun",
      logo: "/logo/pump.png",
      link: "https://pump.fun/coin/GkyPYa7NnCFbduLknCfBfP7p8564X1VZhwZYJ6CZpump?include-nsfw=true",
    },
  ];

  return (
    <div
      id="how-to-buy"
      className="bg-[#FAF1E8] py-12 sm:py-16 lg:py-20 scroll-mt-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div
          className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase tracking-wider text-black hover:text-orange-500 transition-colors duration-500 cursor-default">
            HOW TO BUY
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mt-4">
            Choose your preferred platform
          </p>
        </div>

        {/* Platform Cards - Mobile Layout */}
        <div className="block lg:hidden space-y-6">
          {platforms.map((platform, index) => (
            <Link
              key={platform.id}
              href={platform.link}
              target="_blank"
              className={`block bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-500 hover:scale-105  ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
              style={{
                transitionDelay: `${index * 200 + 300}ms`,
              }}
            >
              <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="flex-shrink-0">
                  <img
                    src={platform.logo as string}
                    alt={platform.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain hover:scale-110 hover:rotate-12 transition-all duration-500 ease-in-out"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 hover:text-orange-600 transition-colors duration-300">
                    {platform.name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500 mt-1">
                    Tap to trade $DREAMHOUSE
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-gray-400 hover:text-orange-500 transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Platform Cards - Desktop Layout */}
        <div className="hidden lg:flex items-center justify-center gap-6 xl:gap-8">
          {platforms.map((platform, index) => (
            <Link
              key={platform.id}
              href={platform.link}
              target="_blank"
              className={`bg-white rounded-3xl p-8 xl:p-10 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-500 hover:scale-110  group ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${index * 200 + 300}ms`,
              }}
            >
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative">
                  <img
                    src={platform.logo as string}
                    alt={platform.name}
                    className="w-24 h-24 xl:w-32 xl:h-32 object-contain hover:scale-125 hover:rotate-12 transition-all duration-700 ease-in-out"
                  />
                </div>

                <h3 className="text-2xl xl:text-3xl font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                  {platform.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Note */}
        <div
          className={`text-center mt-8 sm:mt-12 lg:mt-16 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 hover:text-gray-800 transition-colors duration-300">
            Safe, secure, and simple ways to buy{" "}
            <span className="font-bold text-orange-600 hover:text-orange-700 transition-colors duration-300">
              $DREAMHOUSE
            </span>{" "}
            tokens
          </p>
        </div>
      </div>
    </div>
  );
};
