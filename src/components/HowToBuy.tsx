/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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

  return (
    <div
      id="how-to-buy"
      className="bg-[#F5E6D3] py-10 sm:py-16 lg:py-20 scroll-mt-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div
          className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase tracking-wider text-black hover:text-orange-500 transition-colors duration-500 cursor-default">
            HOW TO BUY
          </h2>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Contract Address Box */}
          <div
            className={`mb-8 sm:mb-12 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200 hover:shadow-xl group relative overflow-hidden transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform -translate-x-full group-hover:translate-x-full wave-animation"></div>

              <label className="block text-xs sm:text-sm text-gray-700 mb-3 relative z-10">
                Contract Address
              </label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 relative z-10">
                <div className="flex-1 text-sm sm:text-lg md:text-xl lg:text-2xl break-all">
                  {contractAddress}
                </div>
                <button
                  onClick={copyToClipboard}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl text-xs sm:text-sm shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 relative overflow-hidden group"
                >
                  <span className="relative z-10">
                    {copiedCA ? (
                      <span className="flex items-center">Copied!</span>
                    ) : (
                      <span className="flex text-xl items-center"> Copy</span>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div
            className={`space-y-4 sm:space-y-6 transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-100/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform -translate-x-full group-hover:translate-x-full wave-animation"></div>
                <div className="flex items-start space-x-4 relative z-10">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {step}
                  </div>
                  <div className="flex-1 text-sm sm:text-base text-gray-800">
                    {step === 1 && (
                      <>
                        <h3 className="font-medium mb-1">
                          Step 1: Go to{" "}
                          <Link
                            href="https://pump.fun/"
                            target="_blank"
                            className="text-orange-500 hover:text-orange-600 underline decoration-2 underline-offset-2"
                          >
                            https://pump.fun/
                          </Link>
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm">
                          Visit the Pump.fun platform to start trading
                        </p>
                      </>
                    )}
                    {step === 2 && (
                      <>
                        <h3 className="font-medium mb-1">
                          Step 2: Search Contract Address{" "}
                          <span className="text-[10px] sm:text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded border border-orange-200">
                            {contractAddress}
                          </span>
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm">
                          Search for the contract address or paste it directly
                          into the search box
                        </p>
                      </>
                    )}
                    {step === 3 && (
                      <>
                        <h3 className="font-medium mb-1">
                          Step 3: Click Buy button
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm">
                          Enter the amount you want to buy and click the buy
                          button to complete your purchase
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
