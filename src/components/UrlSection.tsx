"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface ImageItem {
  id: string;
  src: string;
  alt: string;
  link?: string;
}

export const UrlSection = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  // Array of image items từ thư mục /ins
  const imageItems: ImageItem[] = [
    {
      id: "1",
      src: "/ins/Screenshot 2025-06-30 124831.png",
      alt: "Dream House Vision 1",
      link: "https://www.instagram.com/reel/DGjC0TJyr5e/?utm_source=ig_embed&utm_campaign=loading",
    },
    {
      id: "2",
      src: "/ins/Screenshot 2025-06-30 124859.png",
      alt: "Dream House Vision 2",
      link: "https://www.instagram.com/reel/DIxAJa6zEtX/?utm_source=ig_embed&utm_campaign=loading",
    },
    {
      id: "3",
      src: "/ins/Screenshot 2025-06-30 124936.png",
      alt: "Dream House Vision 3",
      link: "https://www.instagram.com/reel/DEoOPlqPMcv/?utm_source=ig_embed&utm_campaign=loading",
    },
    {
      id: "4",
      src: "/ins/Screenshot 2025-06-30 125118.png",
      alt: "Dream House Vision 4",
      link: "https://www.instagram.com/reel/CrBVMdxLBFi/?utm_source=ig_embed&utm_campaign=loading",
    },
  ];

  const loopedImages = [...imageItems, ...imageItems];

  // Handle image load
  const handleImageLoad = (id: string) => {
    setImagesLoaded((prev) => new Set([...prev, id]));
  };

  useEffect(() => {
    setIsMounted(true);

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    const urlSectionElement = document.getElementById("url-section");
    if (urlSectionElement) {
      observer.observe(urlSectionElement);
    }

    return () => {
      if (urlSectionElement) {
        observer.unobserve(urlSectionElement);
      }
    };
  }, []);

  // Handle scroll for infinite loop
  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const handleScroll = () => {
      const maxScroll = scrollEl.scrollWidth / 2;
      if (scrollEl.scrollLeft >= maxScroll) {
        scrollEl.scrollLeft = 0;
      }
    };

    scrollEl.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollEl.removeEventListener("scroll", handleScroll);
  }, []);

  // Simple loading skeleton
  const SkeletonLoader = ({ mobile = false }: { mobile?: boolean }) => (
    <div
      className={`${
        mobile ? "w-full h-80" : "w-72 xl:w-80 h-96"
      } bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse rounded-2xl flex items-center justify-center`}
    >
      <div className="text-gray-400 text-lg">Loading...</div>
    </div>
  );

  if (!isMounted) {
    return (
      <div id="url-section" className="bg-[#FAF1E8] py-10 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase text-center mb-8 sm:mb-12">
            When the goal isn&apos;t Gucci
          </h1>
          <div className="relative">
            {/* Mobile Loading */}
            <div className="block sm:hidden space-y-4">
              {imageItems.slice(0, 3).map((item) => (
                <SkeletonLoader key={item.id} mobile />
              ))}
            </div>

            {/* Desktop Loading */}
            <div className="hidden sm:flex gap-4 lg:gap-6 overflow-hidden">
              {imageItems.map((item) => (
                <SkeletonLoader key={item.id} />
              ))}
            </div>
          </div>
          <p className="text-center mt-8 sm:mt-12 text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">
            &ldquo;A memecoin inspired by the destination of life. Join the{" "}
            <span className="text-orange-600 font-bold">$DREAMHOUSE</span>{" "}
            revolution!&rdquo;
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      id="url-section"
      className="bg-[#FAF1E8] py-12 sm:py-16 lg:py-20 relative overflow-hidden scroll-mt-20"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-16 h-16 sm:w-20 sm:h-20 bg-yellow-400 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 sm:w-32 sm:h-32 bg-orange-400 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-16 sm:h-16 bg-pink-400 rounded-full blur-lg animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center">
        {/* Title Section */}
        <div
          className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase font-bold hover:text-orange-500 transition-colors duration-500 cursor-default">
            When the goal isn&apos;t Gucci
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mt-4 hover:text-gray-800 transition-colors duration-300">
            Discover the journey that inspired our community
          </p>
        </div>

        {/* Mobile Layout - Vertical Stack */}
        <div className="block lg:hidden">
          <div className="space-y-4 sm:space-y-6 text-center">
            {imageItems.map((item, index) => (
              <Link
                href={item.link || ""}
                key={item.id}
                className={`w-full mx-auto transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
                style={{
                  transitionDelay: `${index * 200 + 300}ms`,
                }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg group hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white mb-8">
                  {!imagesLoaded.has(item.id) && (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse rounded-2xl flex items-center justify-center z-10">
                      <div className="text-gray-400">Loading...</div>
                    </div>
                  )}
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={400}
                    height={320}
                    className="w-full h-80 object-cover"
                    onLoad={() => handleImageLoad(item.id)}
                    priority={index < 2}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop Layout - Horizontal Carousel */}
        <div className="hidden lg:block relative group">
          <div
            ref={scrollRef}
            className="flex gap-6 xl:gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {loopedImages.map((item, index) => (
              <Link
                href={item.link || ""}
                key={`${item.id}-${index}`}
                className={`flex-shrink-0 relative w-72 h-96 xl:w-80 transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: `${
                    (index % imageItems.length) * 150 + 300
                  }ms`,
                }}
              >
                <div className="relative overflow-hidden shadow-lg group hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:rotate-1 bg-white">
                  {!imagesLoaded.has(`${item.id}-${index}`) && (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse rounded-2xl flex items-center justify-center z-10">
                      <div className="text-gray-400">Loading...</div>
                    </div>
                  )}
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={320}
                    height={384}
                    className="w-full h-full object-cover"
                    onLoad={() => handleImageLoad(`${item.id}-${index}`)}
                    priority={index < 4}
                  />
                  {/* Hover overlay */}
                </div>
              </Link>
            ))}
          </div>

          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#FAF1E8] to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#FAF1E8] to-transparent pointer-events-none"></div>
        </div>

        {/* Bottom Quote */}
        <div
          className={`text-center mt-12 sm:mt-16 lg:mt-20 transition-all duration-1000 delay-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-4 hover:text-gray-900 transition-colors duration-300">
            &ldquo;A memecoin inspired by the destination of life.&rdquo;
          </p>
          <p className="text-lg sm:text-xl lg:text-2xl">
            Join the{" "}
            <span className="font-bold text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent hover:from-orange-600 hover:to-orange-700 transition-all duration-300">
              $DREAMHOUSE
            </span>{" "}
            revolution!
          </p>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};
