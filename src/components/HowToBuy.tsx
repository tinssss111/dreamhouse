/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";

interface HowToBuy {
  number: string;
  title: React.ReactNode;
  description: string;
}

export const HowToBuy = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [copiedCA, setCopiedCA] = useState(false);

  const contractAddress = "GkyPYa7NnCFbduLknCfBfP7p8564X1VZhwZYJ6CZpump";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    const howToBuyElement = document.getElementById("how-to-buy");
    if (howToBuyElement) observer.observe(howToBuyElement);

    return () => {
      if (howToBuyElement) observer.unobserve(howToBuyElement);
    };
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopiedCA(true);
    setTimeout(() => setCopiedCA(false), 2000);
  };

  const steps = [
    {
      number: "01",
      title: (
        <div className="flex items-center gap-2">
          <span className="hover:text-orange-600 transition-colors duration-300">
            GO TO
          </span>{" "}
          <a
            href="https://pump.fun/"
            target="_blank"
            className="text-orange-500 hover:text-orange-600 transition-colors duration-300 "
          >
            https://pump.fun/
          </a>
        </div>
      ),
      description: "Visit the Pump.fun platform to start trading",
    },
    {
      number: "02",
      title: "SEARCH CONTRACT ADDRESS",
      description:
        "Search for the contract address or paste it directly into the search box.",
    },
    {
      number: "03",
      title: "CLICK BUY BUTTON",
      description:
        "Enter the amount you want to buy and click the buy button to complete your purchase",
    },
  ];

  return (
    <div
      id="how-to-buy"
      className="bg-[#FAF1E8] py-10 sm:py-16 lg:py-20 scroll-mt-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div
          className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-wider text-black hover:text-orange-500 transition-colors duration-500 cursor-default">
            HOW TO BUY
          </h2>
        </div>

        {/* Main Content */}
        <div className="max-w-[800px] mx-auto">
          {/* Contract Address Box */}
          <div
            className={`mb-12 sm:mb-16 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border-[2px] border-b-[4px] border-black hover:shadow-xl group relative overflow-hidden transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform -translate-x-full group-hover:translate-x-full wave-animation"></div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 relative z-10">
                <div className="flex-1 text-[19px] sm:text-[16px] md:text-xl lg:text-2xl break-all">
                  <strong className="mr-1">CA:</strong>
                  {contractAddress}
                </div>
                <button
                  onClick={copyToClipboard}
                  className="border-2 border-b-4 border-black px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-orange-500 hover:bg-orange-600 rounded-lg sm:rounded-xl text-sm sm:text-base lg:text-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 relative overflow-hidden group transition-all duration-300"
                >
                  <span className="relative z-10 text-white font-semibold">
                    {copiedCA ? "Copied!" : "Copy"}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Vertical Steps Layout */}
          <div
            className={`relative transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex flex-col space-y-8 sm:space-y-12">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  {/* Step Row */}
                  <div className="flex items-center space-x-6 sm:space-x-8">
                    {/* Step Number Circle - Left Side */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black text-white rounded-2xl flex items-center justify-center font-black text-xl sm:text-2xl shadow-lg">
                        {step.number}
                      </div>
                    </div>

                    {/* Step Card - Right Side */}
                    <div className="flex-1">
                      <div className="bg-white  rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-black hover:shadow-2xl transition-all duration-300 hover:scale-105 group relative overflow-hidden">
                        {/* Content */}
                        <div className="text-left">
                          <h3 className="text-sm sm:text-2xl font-black tracking-wide text-black mb-4 group-hover:text-orange-500 transition-colors duration-300">
                            {step.title}
                          </h3>
                          <p className="text-sm sm:text-xl leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Connecting Line (not shown after last step) */}
                  {index < steps.length - 1 && (
                    <div className="flex absolute top-0 left-0 h-full py-15 sm:py-18 px-8 sm:px-0">
                      <div className="sm:w-20 flex justify-center">
                        <div className="w-[2px] bg-black rounded-full"></div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(100%) skewX(-12deg);
          }
        }

        @keyframes wave {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .wave-animation {
          animation: wave 0.7s ease-out;
        }
      `}</style>
    </div>
  );
};
