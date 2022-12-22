import { useEffect, useRef, useState } from "react";
import "./ImageSlider.css";
import { SliderData } from "./SliderData";
import logo from "../../images/logo.png";

const ImageSlider = ({ slides }) => {
  const delay = 15000;

  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index, slides.length]);

  return (
    <div className="slideshow">
      <h1 className="sliderTextCentered">
        <img src={logo} alt="John Miko Resort Logo" />
      </h1>
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {SliderData.map((slide, index) => (
          <img src={slide.image} className="slide" alt="" key={index} />
        ))}
      </div>

      <div className="slideshowDots">
        {SliderData.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
