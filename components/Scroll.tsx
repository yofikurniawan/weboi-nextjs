import { useEffect } from "react";

const Scroll = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTopButton = document.querySelector(
        ".xb-backtotop"
      ) as HTMLElement;
      if (window.scrollY > 500) {
        scrollTopButton?.classList.add("active");
      } else {
        scrollTopButton?.classList.remove("active");
      }

      const strickyMenu = document.querySelector(
        ".stricked-menu"
      ) as HTMLElement;
      if (strickyMenu) {
        const headerScrollPos = 100;
        if (window.scrollY > headerScrollPos) {
          strickyMenu?.classList.add("stricky-fixed");
        } else {
          strickyMenu?.classList.remove("stricky-fixed");
        }
      }
    };

    const handleClick = (e: Event) => {
      e.preventDefault();
      // Type assertion to MouseEvent to access mouse-specific properties
      const mouseEvent = e as MouseEvent;
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollButton = document.querySelector(".scroll");
    scrollButton?.addEventListener("click", handleClick);

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listeners when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
      scrollButton?.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="xb-backtotop">
      <a href="#" className="scroll">
        <i className="far fa-arrow-up" />
      </a>
    </div>
  );
};

export default Scroll;
