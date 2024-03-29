import { useState } from "react";
import "./ImageSlider.css";
import { SliderData } from "./SliderData";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";

const ImageSlider = () => {
  // Set the initial image index to 0
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next image
  function nextImage() {
    setCurrentIndex((currentIndex + 1) % SliderData.length);
  }

  // Function to go to the previous image
  function previousImage() {
    setCurrentIndex((currentIndex - 1 + SliderData.length) % SliderData.length);
  }

  // Function to go to a specific image by its index
  function goToImage(index) {
    setCurrentIndex(index);
  }

  return (
    <div className="slider-container">
      <div className="slider">
        <div className="slider-inner">
          <img
            className="slider-image"
            src={SliderData[currentIndex]}
            alt="Slider"
          />
        </div>
        <button onClick={previousImage} className="slider-previous-btn">
          <NavigateBefore style={{ fontSize: "40px" }} />
        </button>
        <button onClick={nextImage} className="slider-next-btn">
          <NavigateNext style={{ fontSize: "40px" }} />
        </button>
      </div>
      <div className="thumbnail-container">
        <div className="thumbnail-background-box">
          <div className="thumbnail-picture-container">
            {SliderData.map((image, index, key) => (
              <img
                key={key}
                src={image}
                alt="Thumbnail"
                onClick={() => goToImage(index)}
                className={
                  index === currentIndex ? "thumbnail active" : "thumbnail"
                }
              />
            ))}
          </div>
          <span className="thumbnail-text">Click to show the images</span>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
