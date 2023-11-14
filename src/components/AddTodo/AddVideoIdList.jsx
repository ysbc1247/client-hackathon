import React, { useState, useEffect } from "react";
import AddVideo from "./AddVideo";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function AddVideoIdList(props) {
  const [isVideo, setVideo] = useState([]);

  useEffect(() => {
    setVideo(props.todoVideos);
  }, [props.todoVideos]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  return (
    <>
      {isVideo.map((item, index) => (
        <AddVideo key={index} id={item} />
      ))}
    </>
  );
}
