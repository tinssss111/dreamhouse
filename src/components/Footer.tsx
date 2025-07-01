/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaTiktok } from "react-icons/fa";

interface ConfigData {
  contract_address: string;
  pump_fun_url: string;
  x_link: string;
  instagram_link: string;
  tiktok_link: string;
}

export const Footer = () => {
  const [config, setConfig] = useState<ConfigData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  if (loading) {
    return (
      <footer className="bg-[#A4D8C8] text-center py-8">
        Loading footer content...
      </footer>
    );
  }

  if (error) {
    return (
      <footer className="bg-[#A4D8C8] text-center py-8 text-red-500">
        Error loading footer: {error}
      </footer>
    );
  }

  return (
    <footer className="bg-[#A4D8C8]">
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
                href={config?.pump_fun_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center w-10 h-10 bg-white border-2 border-b-4 border-black rounded-lg text-xl transition hover:border-t-4 hover:border-b-2"
                aria-label="Pump.fun"
              >
                <img
                  src="/logo/pump.png"
                  alt="Pump.fun"
                  className="w-[20px] h-[20px]"
                />
              </a>
              <a
                href={config?.x_link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center w-10 h-10 bg-white border-2 border-b-4 border-black rounded-lg text-xl transition hover:border-t-4 hover:border-b-2"
                aria-label="Twitter"
              >
                <FaXTwitter />
              </a>
              <a
                href={config?.instagram_link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center w-10 h-10 bg-white border-2 border-b-4 border-black rounded-lg text-xl transition hover:border-t-4 hover:border-b-2"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href={config?.tiktok_link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center w-10 h-10 bg-white border-2 border-b-4 border-black rounded-lg text-xl transition hover:border-t-4 hover:border-b-2"
                aria-label="TikTok"
              >
                <FaTiktok />
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
