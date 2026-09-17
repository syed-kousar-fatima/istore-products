import { useEffect, useRef, useState } from "react";

const useScrollAnimation = ({
  threshold = 0.15,
  rootMargin = "0px 0px -50px 0px",
  once = true,
  initialVisible = false,
} = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(initialVisible);

  useEffect(() => {
    const element = ref.current;

    if (!element || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return {
    ref,
    isVisible,
    animationClass: isVisible
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-8",
  };
};

export default useScrollAnimation;