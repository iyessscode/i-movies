import * as React from "react";

export const useScrollVisible = () => {
  const [isVisible, setIsVisible] = React.useState(true);
  const [prevScrollY, setPrevScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < prevScrollY || currentScrollY <= 0) {
        setIsVisible(true);
      } else if (currentScrollY > prevScrollY && currentScrollY > 50) {
        setIsVisible(false);
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  return { isVisible };
};
