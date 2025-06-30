"use client";
import React, { useEffect, useState } from "react";
import { RiInstagramFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { HiMenu, HiX } from "react-icons/hi";

const Header = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentProgress = window.pageYOffset;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setScrollProgress((currentProgress / scrollHeight) * 100);
      }
    };

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  const linkBuyToken =
    "https://pump.fun/coin/GkyPYa7NnCFbduLknCfBfP7p8564X1VZhwZYJ6CZpump?include-nsfw=true";
  const linkInstagram = "https://www.instagram.com/chillhousesol";
  const linkTwitter = "https://x.com/ChillHouseSOL";

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = window.innerWidth < 768 ? 80 : 100; // Smaller offset for mobile
      const elementPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setMobileMenuOpen(false);
  };

  return (
    <div className="backdrop-blur-md relative">
      {/* Scroll Progress Bar */}
      <div
        className="absolute bottom-0 left-0 h-1 bg-orange-500 transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 lg:py-6">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex justify-between items-center">
          <div className="flex items-center text-xl lg:text-2xl gap-3 xl:gap-6">
            <button
              onClick={scrollToTop}
              className="py-1 px-3 lg:py-1 lg:px-4 bg-white border-[2px] border-b-[4px] border-[var(--black)] rounded-[8px] text-[16px] lg:text-[18px] transition-all duration-300 ease-in-out hover:border-t-[4px] hover:border-b-[2px] hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="py-1 px-3 lg:py-1 lg:px-4 bg-white border-[2px] border-b-[4px] border-[var(--black)] rounded-[8px] text-[16px] lg:text-[18px] transition-all duration-300 ease-in-out hover:border-t-[4px] hover:border-b-[2px] hover:scale-105 hover:shadow-lg active:scale-95"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("tokenomics")}
              className="py-1 px-3 lg:py-1 lg:px-4 bg-white border-[2px] border-b-[4px] border-[var(--black)] rounded-[8px] text-[16px] lg:text-[18px] transition-all duration-300 ease-in-out hover:border-t-[4px] hover:border-b-[2px] hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Tokenomics
            </button>
            <button
              onClick={() => scrollToSection("how-to-buy")}
              className="py-1 px-3 lg:py-1 lg:px-4 bg-white border-[2px] border-b-[4px] border-[var(--black)] rounded-[8px] text-[16px] lg:text-[18px] transition-all duration-300 ease-in-out hover:border-t-[4px] hover:border-b-[2px] hover:scale-105 hover:shadow-lg active:scale-95"
            >
              How to Buy
            </button>
          </div>
          <div className="flex items-center gap-2 lg:gap-4">
            <a
              href={linkBuyToken}
              target="_blank"
              className="flex justify-center uppercase items-center bg-orange-500 py-1 px-2 lg:py-1 lg:px-4 border-[2px] border-b-[4px] border-[var(--black)] rounded-[8px] text-[14px] lg:text-[16px] transition-all duration-300 ease-in-out hover:border-t-[4px] hover:border-b-[2px] hover:scale-105 hover:shadow-lg hover:bg-orange-600 active:scale-95"
            >
              <span className="hidden xl:inline">Buy $Dreamhouse</span>
              <span className="xl:hidden">Buy Token</span>
            </a>
            <a
              href={linkInstagram}
              target="_blank"
              className="flex justify-center bg-white items-center w-[35px] h-[35px] lg:w-[40px] lg:h-[40px] border-[2px] border-b-[4px] border-[var(--black)] rounded-[8px] text-[18px] lg:text-[20px] transition-all duration-300 ease-in-out hover:border-t-[4px] hover:border-b-[2px] hover:scale-110 hover:shadow-lg hover:text-pink-600 active:scale-95"
              aria-label="Instagram"
            >
              <RiInstagramFill />
            </a>
            <a
              href={linkTwitter}
              target="_blank"
              className="flex justify-center bg-white items-center w-[35px] h-[35px] lg:w-[40px] lg:h-[40px] border-[2px] border-b-[4px] border-[var(--black)] rounded-[8px] text-[18px] lg:text-[20px] transition-all duration-300 ease-in-out hover:border-t-[4px] hover:border-b-[2px] hover:scale-110 hover:shadow-lg hover:text-blue-600 active:scale-95"
              aria-label="Twitter"
            >
              <FaXTwitter />
            </a>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex justify-between items-center">
          <div className="flex items-center gap-3">
            <a
              href={linkInstagram}
              target="_blank"
              className="flex justify-center bg-white items-center w-[35px] h-[35px] border-[2px] border-b-[3px] border-[var(--black)] rounded-[6px] text-[16px] transition-all duration-300 ease-in-out hover:scale-110 hover:text-pink-600"
              aria-label="Instagram"
            >
              <RiInstagramFill />
            </a>
            <a
              href={linkTwitter}
              target="_blank"
              className="flex justify-center bg-white items-center w-[35px] h-[35px] border-[2px] border-b-[3px] border-[var(--black)] rounded-[6px] text-[16px] transition-all duration-300 ease-in-out hover:scale-110 hover:text-blue-600"
              aria-label="Twitter"
            >
              <FaXTwitter />
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={linkBuyToken}
              target="_blank"
              className="bg-orange-500 py-2 px-3 border-[2px] border-b-[3px] border-[var(--black)] rounded-[6px] text-[14px] font-semibold text-white transition-all duration-300 ease-in-out hover:bg-orange-600 active:scale-95"
            >
              Buy
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex justify-center bg-white items-center w-[40px] h-[40px] border-[2px] border-b-[3px] border-[var(--black)] rounded-[6px] text-[20px] transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
            >
              {mobileMenuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg z-50">
            <div className="container mx-auto px-4 py-4 space-y-3">
              <button
                onClick={scrollToTop}
                className="w-full py-3 px-4 bg-white border-[2px] border-b-[3px] border-[var(--black)] rounded-[6px] text-[18px] font-semibold transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="w-full py-3 px-4 bg-white border-[2px] border-b-[3px] border-[var(--black)] rounded-[6px] text-[18px] font-semibold transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("tokenomics")}
                className="w-full py-3 px-4 bg-white border-[2px] border-b-[3px] border-[var(--black)] rounded-[6px] text-[18px] font-semibold transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
              >
                Tokenomics
              </button>
              <button
                onClick={() => scrollToSection("how-to-buy")}
                className="w-full py-3 px-4 bg-orange-500 border-[2px] border-b-[3px] border-[var(--black)] rounded-[6px] text-[18px] font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-orange-600 active:scale-95"
              >
                How to Buy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
