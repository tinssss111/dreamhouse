/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { FaXTwitter, FaTiktok } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

interface SocialLink {
  name: string;
  icon: string;
  url: string;
  logo: React.ReactNode;
}
interface ConfigData {
  contract_address: string;
  pump_fun_url: string;
  x_link: string;
  instagram_link: string;
  tiktok_link: string;
}
export const Community = () => {
  const [config, setConfig] = useState<ConfigData | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("/api/config");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ConfigData = await response.json();
        setConfig(data);
      } catch (e: unknown) {
        console.error("Failed to fetch config: ", e);
      }
    };

    fetchConfig();
  }, []);
  const socialLinks: SocialLink[] = [
    {
      name: "Twitter",
      icon: "Twitter",
      url: config?.x_link || "#",
      logo: <FaXTwitter />,
    },
    {
      name: "Instagram",
      icon: "Instagram",
      url: config?.instagram_link || "#",
      logo: <RiInstagramFill />,
    },
    {
      name: "Pump.fun",
      icon: "Pump.fun",
      url: config?.pump_fun_url || "#",
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
      url: config?.tiktok_link || "#",
      logo: <FaTiktok />,
    },
  ];

  return (
    <div className="bg-[#FAF1E8] py-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-4xl md:text-4xl lg:text-6xl xl:text-4xl font-bold mb-6 uppercase tracking-wider transition-all duration-300 ease-in-out hover:text-orange-500 cursor-default hover:scale-105">
            Community
          </h2>
          <p className="text-2xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl mx-auto flex flex-col items-center gap-4 transition-all duration-300 ease-in-out hover:text-orange-500 cursor-default hover:scale-105">
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
