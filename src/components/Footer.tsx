"use client";
import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

export const Footer = () => {
  const linkInstagram = "https://www.instagram.com/chillhousesol";
  const linkTwitter = "https://x.com/ChillHouseSOL";

  return (
    <footer className="bg-[#FAF1E8]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Left Section: Logo + Links */}
          <div className="space-y-4 md:w-1/2">
            <h2 className="text-3xl uppercase font-semibold">$DREAMHOUSE</h2>
            <div className="flex flex-wrap gap-4 text-[16px]">
              <a href="#" className="hover:underline">
                Terms
              </a>
              <a href="#" className="hover:underline">
                Privacy
              </a>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </div>
            <p className="text-sm text-gray-700">
              © 2025 $DREAMHOUSE. All rights reserved.
            </p>
          </div>

          {/* Right Section: Socials */}
          <div className="space-y-4 md:w-1/2 md:text-right">
            <h3 className="text-lg font-medium">Follow Us</h3>
            <div className="flex gap-4 justify-start md:justify-end">
              <a
                href={linkInstagram}
                target="_blank"
                className="flex justify-center items-center w-10 h-10 bg-white border-2 border-b-4 border-black rounded-lg text-xl transition hover:border-t-4 hover:border-b-2"
                aria-label="Telegram"
              >
                <RiInstagramFill />
              </a>
              <a
                href={linkTwitter}
                target="_blank"
                className="flex justify-center items-center w-10 h-10 bg-white border-2 border-b-4 border-black rounded-lg text-xl transition hover:border-t-4 hover:border-b-2"
                aria-label="Twitter"
              >
                <FaXTwitter />
              </a>
            </div>
            <p className="text-sm text-gray-700">
              Join our community for the latest updates and exclusive content!
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
