"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentDesktopIndex, setCurrentDesktopIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const isAutoScrolling = useRef(false);

  // Array of image items từ thư mục /ins
  const imageItems: ImageItem[] = [
    {
      id: "1",
      src: "/ins/1.png",
      alt: "Dream House Vision 1",
      link: "https://www.instagram.com/reel/DGjC0TJyr5e/",
    },
    {
      id: "2",
      src: "/ins/2.png",
      alt: "Dream House Vision 2",
      link: "https://www.instagram.com/p/DLfhydlNjOi/",
    },
    {
      id: "3",
      src: "/ins/3.png",
      alt: "Dream House Vision 3",
      link: "https://www.instagram.com/reel/DIxAJa6zEtX/",
    },
    {
      id: "4",
      src: "/ins/4.png",
      alt: "Dream House Vision 4",
      link: "https://www.instagram.com/p/DLIR6tJNu68/",
    },
    {
      id: "5",
      src: "/ins/5.png",
      alt: "Dream House Vision 5",
      link: "https://www.instagram.com/reel/DIRjI4DN_YF/",
    },
    {
      id: "6",
      src: "/ins/6.png",
      alt: "Dream House Vision 6",
      link: "https://www.instagram.com/p/DKumbWxte4H/",
    },
    {
      id: "7",
      src: "/ins/7.png",
      alt: "Dream House Vision 7",
      link: "https://www.instagram.com/reel/DEoOPlqPMcv/",
    },
  ];

  const loopedImages = [...imageItems, ...imageItems, ...imageItems]; // Triple for smooth infinite scroll

  // Handle image load
  const handleImageLoad = (id: string) => {
    setImagesLoaded((prev) => new Set([...prev, id]));
  };

  // Clear any existing intervals
  const clearAutoScroll = useCallback(() => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  }, []);

  // Auto scroll function for desktop
  const startAutoScroll = useCallback(() => {
    clearAutoScroll();

    autoScrollRef.current = setInterval(() => {
      if (!isPaused && scrollRef.current && !isAutoScrolling.current) {
        isAutoScrolling.current = true;
        const scrollEl = scrollRef.current;
        const itemWidth = 320 + 32; // w-80 = 320px + gap-8 = 32px

        setCurrentDesktopIndex((prevIndex) => {
          let nextIndex = prevIndex + 1;
          let shouldReset = false;

          // Nếu đã tới cuối danh sách, quay lại đầu
          if (nextIndex >= imageItems.length) {
            nextIndex = 0;
            shouldReset = true;
          }

          const targetScrollLeft = (imageItems.length + nextIndex) * itemWidth;

          // Scroll tới vị trí mới
          scrollEl.scrollTo({
            left: targetScrollLeft,
            behavior: "smooth",
          });

          // Sau khi scroll xong, nếu cần reset, thực hiện ngay sau một chút
          setTimeout(() => {
            isAutoScrolling.current = false;

            if (shouldReset && scrollRef.current) {
              const resetPosition = imageItems.length * itemWidth;
              scrollRef.current.scrollLeft = resetPosition;
            }
          }, 850); // nên để cao hơn duration của `behavior: smooth`

          return nextIndex;
        });
      }
    }, 3000); // mỗi 3 giây
  }, [isPaused, imageItems.length, clearAutoScroll]);

  // Auto slide function for mobile
  const startAutoSlide = useCallback(() => {
    clearAutoScroll();

    autoScrollRef.current = setInterval(() => {
      if (!isPaused) {
        setCurrentSlide((prev) => (prev + 1) % imageItems.length);
      }
    }, 3000); // 3 seconds interval
  }, [isPaused, imageItems.length, clearAutoScroll]);

  // Handle infinite loop for manual scroll
  const handleInfiniteLoop = useCallback(() => {
    if (!scrollRef.current || isAutoScrolling.current) return;

    const scrollEl = scrollRef.current;
    const itemWidth = 320 + 32;
    const sectionWidth = imageItems.length * itemWidth;
    const currentScroll = scrollEl.scrollLeft;

    // If we're at the end (third section), jump to middle section
    if (currentScroll >= sectionWidth * 2.5) {
      const equivalentPosition = currentScroll - sectionWidth;
      scrollEl.scrollLeft = equivalentPosition;
    }
    // If we're at the beginning (first section), jump to middle section
    else if (currentScroll <= sectionWidth * 0.5) {
      const equivalentPosition = currentScroll + sectionWidth;
      scrollEl.scrollLeft = equivalentPosition;
    }
  }, [imageItems.length]);
  const goToPrevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + imageItems.length) % imageItems.length
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % imageItems.length);
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
      clearAutoScroll();
    };
  }, [clearAutoScroll]);

  // Start auto scroll when component is visible and mounted
  useEffect(() => {
    if (isVisible && isMounted) {
      const startAutoScrolling = () => {
        if (window.innerWidth >= 1024) {
          // Desktop: scroll to middle section initially
          if (scrollRef.current) {
            const itemWidth = 320 + 32;
            const initialPosition = imageItems.length * itemWidth; // Start at middle section
            scrollRef.current.scrollLeft = initialPosition;
          }
          startAutoScroll();
        } else {
          // Mobile
          startAutoSlide();
        }
      };

      // Small delay to ensure DOM is ready
      const timer = setTimeout(startAutoScrolling, 100);

      return () => {
        clearTimeout(timer);
        clearAutoScroll();
      };
    }
  }, [
    isVisible,
    isMounted,
    startAutoScroll,
    startAutoSlide,
    imageItems.length,
    clearAutoScroll,
  ]);

  // Handle manual scroll for infinite loop (desktop)
  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const handleScroll = () => {
      // Use debounce to avoid too many calls
      setTimeout(handleInfiniteLoop, 100);
    };

    scrollEl.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollEl.removeEventListener("scroll", handleScroll);
  }, [handleInfiniteLoop]);

  // Handle mouse enter/leave for pause functionality
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Handle window resize to switch between desktop and mobile auto-scroll
  useEffect(() => {
    const handleResize = () => {
      clearAutoScroll();

      if (isVisible) {
        if (window.innerWidth >= 1024) {
          startAutoScroll();
        } else {
          startAutoSlide();
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearAutoScroll();
    };
  }, [isVisible, startAutoScroll, startAutoSlide, clearAutoScroll]);

  // Restart auto-scroll when pause state changes
  useEffect(() => {
    if (isVisible && isMounted) {
      clearAutoScroll();

      if (!isPaused) {
        const timer = setTimeout(() => {
          if (window.innerWidth >= 1024) {
            startAutoScroll();
          } else {
            startAutoSlide();
          }
        }, 100);

        return () => clearTimeout(timer);
      }
    }
  }, [
    isPaused,
    isVisible,
    isMounted,
    startAutoScroll,
    startAutoSlide,
    clearAutoScroll,
  ]);

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
              {imageItems.slice(0, imageItems.length).map((item) => (
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

        {/* Mobile Layout - Single Slide with Auto-advance */}
        <div
          className="relative max-w-lg mx-auto lg:hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white w-80 h-110">
            {imageItems.map((item, index) => (
              <Link
                href={item.link || ""}
                key={item.id}
                target="_blank"
                rel="noopener noreferrer"
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                  index === currentSlide
                    ? "opacity-100 translate-x-0 z-10"
                    : "opacity-0 translate-x-full z-0"
                }`}
              >
                {!imagesLoaded.has(item.id) && (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse rounded-2xl flex items-center justify-center z-20">
                    <div className="text-gray-400">Loading...</div>
                  </div>
                )}
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={500}
                  height={384}
                  className="w-full h-full object-cover rounded-2xl"
                  onLoad={() => handleImageLoad(item.id)}
                  priority={index < 2}
                />
              </Link>
            ))}

            {/* Điều hướng trái/phải */}
            <button
              onClick={goToPrevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-md"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={goToNextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-md"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Slide indicators */}
          <div className="flex justify-center mt-6 space-x-3">
            {imageItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-orange-500 scale-125 shadow-lg"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Layout - Horizontal Auto-scroll Carousel */}
        <div className="hidden lg:block relative group w-full">
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide pb-6"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              scrollBehavior: "smooth",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {loopedImages.map((item, index) => (
              <Link
                href={item.link || ""}
                key={`${item.id}-${index}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-shrink-0 relative w-80 h-96 transition-all duration-700 ${
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
                <div className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-1 bg-white">
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
                    className="w-full h-auto object-cover rounded-2xl"
                    onLoad={() => handleImageLoad(`${item.id}-${index}`)}
                    priority={index < 6}
                  />
                </div>
              </Link>
            ))}
          </div>

          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#FAF1E8] to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#FAF1E8] to-transparent pointer-events-none z-10"></div>

          {/* Current item indicator */}
          <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 bg-white bg-opacity-95 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
            {currentDesktopIndex + 1} / {imageItems.length}
          </div>
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
