import React, { useEffect, useRef, useState, useCallback } from "react";
import { useGlareEffect } from "../hooks/useGlareEffect";

interface SlideItem {
  image: string;
  title: string;
  desc: string;
}

interface AutoSliderProps {
  items: SlideItem[];
}

// Slide Card Component with Glare Effect
const SlideCard: React.FC<{ item: SlideItem; index: number }> = ({
  item,
  index,
}) => {
  const glareRef = useGlareEffect();

  return (
    <div
      className="min-w-[280px] md:min-w-[320px] snap-start flex-shrink-0 opacity-0 animate-fadeInUp"
      style={{
        animationDelay: `${(index % 10) * 0.1}s`,
        animationFillMode: "forwards",
        scrollSnapAlign: "start",
      }}
    >
      <div
        ref={glareRef}
        className="glare-card bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out group border border-orange-100/50"
      >
        <div className="relative h-52 overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            onDragStart={(e) => e.preventDefault()}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-orange-900/80 group-hover:via-orange-800/30 transition-all duration-300 ease-out"></div>

          {/* Hover Icon */}
          <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-500">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
              <h3 className="font-bold text-xl mb-2 group-hover:text-orange-200 transition-colors duration-300 drop-shadow-lg">
                {item.title}
              </h3>
              <p className="text-sm text-gray-200 group-hover:text-orange-100 transition-colors duration-300 opacity-90 group-hover:opacity-100 leading-relaxed drop-shadow">
                {item.desc}
              </p>
            </div>
          </div>

          {/* Shine Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AutoSlider: React.FC<AutoSliderProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const userInteractionTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Create infinite loop by duplicating items
  const infiniteItems = [...items, ...items, ...items]; // Triple for smooth infinite scroll
  const cardWidth = 320 + 24; // card width + gap

  // Auto scroll function with infinite loop
  const autoScroll = useCallback(() => {
    if (!isPaused && !isUserInteracting && containerRef.current) {
      const container = containerRef.current;

      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;

        // If we're at the end of the second set, jump back to the start of second set
        if (nextIndex >= items.length * 2) {
          setTimeout(() => {
            container.scrollTo({
              left: items.length * cardWidth,
              behavior: "auto", // Instant jump
            });
          }, 500);
          return items.length;
        }

        container.scrollTo({
          left: nextIndex * cardWidth,
          behavior: "smooth",
        });

        return nextIndex;
      });
    }
  }, [items.length, isPaused, isUserInteracting, cardWidth]);

  // Initialize scroll position to the middle set
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: items.length * cardWidth,
        behavior: "auto",
      });
      setCurrentIndex(items.length);
    }
  }, [items.length, cardWidth]);

  // Setup auto-scroll interval with smooth timing
  useEffect(() => {
    // Start auto-scroll after 2 seconds delay
    const startDelay = setTimeout(() => {
      intervalRef.current = setInterval(autoScroll, 4000); // 4 seconds per slide
    }, 2000);

    return () => {
      clearTimeout(startDelay);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoScroll]);

  // Handle mouse enter/leave for pause
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Handle user scroll
  const handleScroll = () => {
    setIsUserInteracting(true);

    // Clear existing timeout
    if (userInteractionTimeoutRef.current) {
      clearTimeout(userInteractionTimeoutRef.current);
    }

    // Update current index based on scroll position with infinite loop handling
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollLeft = container.scrollLeft;
      const newIndex = Math.round(scrollLeft / cardWidth);

      // Handle infinite loop boundaries
      if (newIndex <= 0) {
        // Jumped to start, move to end of first set
        setTimeout(() => {
          container.scrollTo({
            left: items.length * cardWidth,
            behavior: "auto",
          });
          setCurrentIndex(items.length);
        }, 100);
      } else if (newIndex >= infiniteItems.length - 1) {
        // Jumped to end, move back to start of second set
        setTimeout(() => {
          container.scrollTo({
            left: items.length * cardWidth,
            behavior: "auto",
          });
          setCurrentIndex(items.length);
        }, 100);
      } else {
        setCurrentIndex(newIndex);
      }
    }

    // Resume auto-scroll after 4 seconds of no user interaction
    userInteractionTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 4000);
  };

  // Manual navigation via dots
  const goToSlide = (index: number) => {
    if (containerRef.current) {
      // Always go to the middle set + index for infinite loop
      const targetIndex = items.length + index;
      containerRef.current.scrollTo({
        left: targetIndex * cardWidth,
        behavior: "smooth",
      });
      setCurrentIndex(targetIndex);
      setIsUserInteracting(true);

      // Resume auto-scroll after 5 seconds
      if (userInteractionTimeoutRef.current) {
        clearTimeout(userInteractionTimeoutRef.current);
      }
      userInteractionTimeoutRef.current = setTimeout(() => {
        setIsUserInteracting(false);
      }, 5000);
    }
  };

  return (
    <div className="relative select-none">
      {/* Slider Container */}
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-scroll pb-4 scrollbar-hide cursor-grab active:cursor-grabbing"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onScroll={handleScroll}
        style={{
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {infiniteItems.map((item, index) => (
          <SlideCard key={index} item={item} index={index} />
        ))}
      </div>

      {/* Navigation Dots - Only show original items count */}
      <div className="flex justify-center gap-3 mt-8">
        {items.map((_, index) => {
          // Calculate which dot should be active based on currentIndex
          const normalizedIndex = currentIndex % items.length;
          const isActive = index === normalizedIndex;

          return (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative transition-all duration-300 ease-out ${
                isActive ? "w-8 h-3" : "w-3 h-3"
              }`}
            >
              <div
                className={`w-full h-full rounded-full transition-all duration-300 ease-out ${
                  isActive
                    ? "bg-orange-500 shadow-md"
                    : "bg-orange-200 hover:bg-orange-300"
                }`}
              ></div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AutoSlider;
