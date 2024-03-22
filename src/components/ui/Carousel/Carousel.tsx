import React, { useRef, Children } from "react";

interface CarouselProps {
  children: React.ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= carouselRef.current.offsetWidth;
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += carouselRef.current.offsetWidth;
    }
  };

  return (
    <div className="relative">
      <div
        ref={carouselRef}
        className="grid grid-rows-1 grid-flow-col auto-cols-2 md:auto-cols-3 lg:auto-cols-5 gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide snap-start scroll-smooth pb-4"
      >
        {Children.map(children, (child, index) => (
          <div key={index} className="relative">
            {child}
          </div>
        ))}
      </div>

      <button
        onClick={scrollLeft}
        className="-left-6 absolute top-1/2 transform -translate-y-[300%] z-10 w-4 h-4 flex items-center justify-center"
      >
        <svg
          className="w-4 h-4 text-silver-400/50 hover:text-silver-400 transition duration-200 ease-in-out"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
        <span className="sr-only">Previous</span>
      </button>
      <button
        onClick={scrollRight}
        className="-right-6 absolute top-1/2 transform -translate-y-[300%] z-10 w-4 h-4 flex items-center justify-center"
      >
        <svg
          className="w-4 h-4 text-silver-400/50 hover:text-silver-400 transition duration-200 ease-in-out"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
        <span className="sr-only">Next</span>
      </button>
    </div>
  );
};

interface CarouselItemProps {
  children: React.ReactNode;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ children }) => {
  return <>{children}</>;
};

export { Carousel, CarouselItem };
