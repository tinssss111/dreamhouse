/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { FaXTwitter, FaTiktok } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

interface SocialLink {
  name: string;
  icon: string;
  url: string;
  logo: React.ReactNode;
}

export const Community = () => {
  const socialLinks: SocialLink[] = [
    {
      name: "Twitter",
      icon: "Twitter",
      url: "https://x.com/ChillHouseSOL",
      logo: <FaXTwitter />,
    },
    {
      name: "Instagram",
      icon: "Instagram",
      url: "https://www.instagram.com/chillhousesol",
      logo: <RiInstagramFill />,
    },
    {
      name: "Pump.fun",
      icon: "Pump.fun",
      url: "https://pump.fun/coin/GkyPYa7NnCFbduLknCfBfP7p8564X1VZhwZYJ6CZpump?include-nsfw=true",
      logo: (
        <img
          src="/logo/pump.png"
          alt="Pump.fun"
          className="w-[20px] h-[20px]"
        />
      ),
    },
    {
      name: "Tiktok",
      icon: "Tiktok",
      url: "https://www.tiktok.com/@chillhousesol",
      logo: <FaTiktok />,
    },
  ];

  return (
    <div className="bg-[#FAF1E8] py-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold mb-6 uppercase tracking-wider">
            Community
          </h2>
          <p className="text-2xl mx-auto flex flex-col items-center gap-4">
            Follow us on Twitter, Instagram, Pump.fun, and TikTok.
            <span className="">Be part of the $DREAMHOUSE fam!</span>
          </p>
        </div>

        {/* Social Links Grid */}
        <div className=" mb-16">
          {socialLinks.map((social, index) => (
            <div
              key={social.name}
              className="group relative"
              style={{
                animationDelay: `${index * 0.2}s`,
                animation: "fadeInUp 0.8s ease-out forwards",
              }}
            >
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-[200px] items-center mx-auto`}
              >
                {/* Icon */}
                <div className="text-center mb-6 block">
                  <div className="flex justify-center items-center gap-3 p-3 bg-white border-[2px] border-b-[4px] border-[var(--black)] rounded-[8px] no-underline text-[20px] transition-all duration-200 ease-in-out hover:border-t-[4px] hover:border-b-[2px]">
                    {social.icon}
                    {social.logo}
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
