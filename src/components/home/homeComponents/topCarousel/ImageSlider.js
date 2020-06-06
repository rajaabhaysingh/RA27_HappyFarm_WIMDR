import React, { useState, useEffect, useRef } from "react";
import "./ImageSlider.css";
import SliderContent from "./SliderContent";
import Arrows from "./Arrows";
import Dots from "./Dots";

// Function to get width of screen
// Returns 1360 if width is greater than 1360 pixels
const getWidth = () => {
  const deviceWidth = window.innerWidth;

  if (deviceWidth > 1024) {
    return deviceWidth - 64;
  } else return deviceWidth;
};

// Main component fun() starts here
function ImageSlider(props) {
  // destructuring props so that it becomes easier to use
  const { slides } = props;

  // setting initial values of firstSlide, secondSlide and lastSlide
  const firstSlide = slides[0];
  const secondSlide = slides[1];
  const lastSlide = slides[slides.length - 1];

  // useState hook to define initial sliderState
  const [sliderState, setSliderState] = useState({
    activeIndex: 0,
    translate: getWidth(),
    transition: 0.25,
    _slides: [lastSlide, firstSlide, secondSlide],
  });

  // destructuring the states of sliderState
  const { translate, transition, activeIndex, _slides } = sliderState;

  // useRef for autoplay, transition, and smoothWindowResize
  const autoPlayRef = useRef();
  const transitionRef = useRef();
  const resizeRef = useRef();

  // Following useEffect calls nextSlide for autoPlay feature
  // Also smoothTransition (see fun def below)
  // And also smoooth resizing ref
  // In autoPlay we only need nextSlide to display in each render and not prevSlide
  useEffect(() => {
    autoPlayRef.current = nextSlide;
    transitionRef.current = smoothTransition;
    resizeRef.current = handleResize;
  });

  // Following useEffect handles autoPlay, transition conditions
  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    };

    // Calling smoothTransition function after listening transitionEnd
    const transit = (e) => {
      if (e.target.className.includes("slider_one")) {
        transitionRef.current();
      }
      if (e.target.className.includes("slider_two")) {
        transitionRef.current();
      }
    };

    const resize = () => {
      resizeRef.current();
    };

    let interval = null;

    // Adding transitionend event listener
    const transitionEnd = window.addEventListener("transitionend", transit);

    // Adding windowResize event listener
    const onResize = window.addEventListener("resize", resize);

    if (props.autoPlay) {
      interval = setInterval(play, props.autoPlay);
    }

    // cleanup for transition, autoPlay and windowResize to avoid memory leaks
    return () => {
      window.removeEventListener("transitionend", transitionEnd);
      window.removeEventListener("resize", onResize);

      if (props.autoPlay) {
        clearInterval(interval);
      }
    };
  }, [props.autoPlay]);

  // useEffect to set transition time back again
  useEffect(() => {
    if (transition === 0) {
      setSliderState({
        ...sliderState,
        transition: 0.25,
      });
    }
  }, [transition, sliderState]);

  // Function handleResize
  const handleResize = () => {
    setSliderState({
      ...sliderState,
      translate: getWidth(),
      transition: 0,
    });
  };

  // Func to set [prevSlide, currentSlide and nextSlide based on conditions]
  const smoothTransition = () => {
    let _slides = [];

    // if we're at last slide
    if (activeIndex === slides.length - 1) {
      _slides = [slides[slides.length - 2], lastSlide, firstSlide];
    }
    // if we're back on first, just start as it was initially
    else if (activeIndex === 0) {
      _slides = [lastSlide, firstSlide, secondSlide];
    }
    // create an array or prev slide and next two slides that follows it
    else {
      _slides = slides.slice(activeIndex - 1, activeIndex + 2);
    }

    // setState after every Smooth transition
    setSliderState({
      ...sliderState,
      _slides,
      transition: 0,
      translate: getWidth(),
    });
  };

  // next slide setState
  const nextSlide = () => {
    setSliderState({
      ...sliderState,
      activeIndex: activeIndex === slides.length - 1 ? 0 : activeIndex + 1,
      translate: translate + getWidth(),
    });
  };

  // prev slide setState
  const prevSlide = () => {
    setSliderState({
      ...sliderState,
      activeIndex: activeIndex === 0 ? slides.length - 1 : activeIndex - 1,
      translate: 0,
    });
  };

  // main return of this component
  return (
    <div style={props.borderRadius} className="top_image_slider">
      {/* using SliderContent component */}
      <SliderContent
        translate={translate}
        transition={transition}
        width={getWidth() * _slides.length}
        urls={_slides}
        sliderNum={props.sliderNum}
      />

      {/* using Arrow component */}
      {!props.autoPlay && (
        <>
          <Arrows direction="left" handleClick={prevSlide} />
          <Arrows direction="right" handleClick={nextSlide} />
        </>
      )}
      {/* using Dots component */}
      <Dots slides={slides} activeIndex={activeIndex} />
    </div>
  );
}

// setting default props value, in case if its not passed by parent component
ImageSlider.defaultProps = {
  urls: [],
  autoPlay: null,
};

export default ImageSlider;
