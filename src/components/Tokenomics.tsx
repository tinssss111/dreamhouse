"use client";
import React, { useEffect, useState } from "react";

export const Tokenomics = () => {
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

    const tokenomicsElement = document.getElementById("tokenomics");
    if (tokenomicsElement) {
      observer.observe(tokenomicsElement);
    }

    return () => {
      if (tokenomicsElement) {
        observer.unobserve(tokenomicsElement);
      }
    };
  }, []);

  const tokenomics = [
    {
      title: "Ticker",
      value: "$DREAMHOUSE",
    },
    {
      title: "Total Supply",
      value: "968686868.8866",
    },
    {
      title: "Max Supply",
      value: "1,000,000,000,000",
    },
    {
      title: "Liquidity",
      value: "🔥",
    },
  ];
  return (
    <div
      id="tokenomics"
      className="bg-[#F5E6D3] scroll-mt-20 py-12 sm:py-16 lg:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl uppercase text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 hover:text-orange-500 hover:scale-105 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Tokenomics
        </h2>

        {/* Mobile Layout - Single Column */}
        <div className="sm:hidden">
          <div className="space-y-4">
            {tokenomics.map((item, index) => (
              <div
                className={`flex flex-col items-center bg-white px-4 py-6 rounded-lg shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
                key={item.title}
                style={{
                  transitionDelay: `${index * 150 + 200}ms`,
                }}
              >
                <div className="text-lg font-semibold text-gray-700 hover:text-orange-600 transition-colors duration-300">
                  {item.title}
                </div>
                <div className="text-2xl font-bold hover:scale-110 transition-transform duration-300 text-center break-words">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tablet Layout - Two Columns */}
        <div className="hidden sm:block lg:hidden">
          <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
            {tokenomics.map((item, index) => (
              <div
                className={`flex flex-col items-center bg-white px-4 py-8 rounded-lg shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-xl hover:rotate-1 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
                key={item.title}
                style={{
                  transitionDelay: `${index * 150 + 200}ms`,
                }}
              >
                <div className="text-xl font-semibold text-gray-700 hover:text-orange-600 transition-colors duration-300 text-center">
                  {item.title}
                </div>
                <div className="text-3xl font-bold hover:scale-110 transition-transform duration-300 text-center break-words">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Layout - Single Column */}
        <div className="hidden lg:block">
          <div className="flex justify-center">
            <div className="space-y-6">
              {tokenomics.map((item, index) => (
                <div
                  className={`flex flex-col items-center bg-white px-8 py-12 xl:px-10 xl:py-15 rounded-lg shadow-lg transition-all duration-500 hover:scale-110 hover:shadow-xl hover:rotate-1 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 min-w-[400px] xl:min-w-[500px] ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-10"
                  }`}
                  key={item.title}
                  style={{
                    transitionDelay: `${index * 200 + 200}ms`,
                  }}
                >
                  <div className="text-2xl xl:text-3xl font-semibold text-gray-700 hover:text-orange-600 transition-colors duration-300">
                    {item.title}
                  </div>
                  <div className="text-4xl xl:text-5xl font-bold hover:scale-110 transition-transform duration-300 text-center">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
