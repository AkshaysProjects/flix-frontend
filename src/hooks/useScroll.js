import { useState, useEffect, useCallback } from "react";

const useScroll = (containerRef) => {
  // State to check if the container can be scrolled left or right
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Function to check the overflow status of the container
  const checkOverflowStatus = useCallback(() => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  }, [containerRef]);

  // Function to scroll the container content
  const scrollContent = useCallback(
    (direction) => {
      if (containerRef.current) {
        const amount = 500;
        const newScrollPosition =
          direction === "left"
            ? containerRef.current.scrollLeft - amount
            : containerRef.current.scrollLeft + amount;
        containerRef.current.scrollTo({
          left: newScrollPosition,
          behavior: "smooth",
        });
      }
      checkOverflowStatus();
    },
    [containerRef, checkOverflowStatus]
  );

  // Check the overflow status on mount and whenever the container ref changes
  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      // Initially check the overflow status
      checkOverflowStatus();

      // Add event listener for scroll event
      container.addEventListener("scroll", checkOverflowStatus);
    }

    // Perform an initial check in case the content is already loaded
    checkOverflowStatus();

    return () => {
      if (container) {
        container.removeEventListener("scroll", checkOverflowStatus);
      }
    };
  }, [containerRef, checkOverflowStatus]);

  return { canScrollLeft, canScrollRight, scrollContent };
};

export default useScroll;
