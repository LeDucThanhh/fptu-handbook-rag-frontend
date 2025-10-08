import { useRef, useEffect, MouseEvent } from "react";

export const useGlareEffect = <T extends HTMLElement = HTMLDivElement>() => {
  const glareRef = useRef<T>(null);

  useEffect(() => {
    const element = glareRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent<T> | any) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate percentage position
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;

      // Update CSS variables for glare position
      element.style.setProperty("--mouse-x", `${xPercent}%`);
      element.style.setProperty("--mouse-y", `${yPercent}%`);
    };

    const handleMouseEnter = () => {
      element.style.setProperty("--glare-opacity", "1");
    };

    const handleMouseLeave = () => {
      element.style.setProperty("--glare-opacity", "0");
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return glareRef;
};
