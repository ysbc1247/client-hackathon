import Youtube from "../Youtube/Youtube";
import { useEffect, useState } from "react";
import { videoInfo } from "../../api";
import Card from "react-bootstrap/Card";
import "../AddTodo/AddTodo.css";

export default function AddVideo(props) {
  console.log("왔냐?", props.id);
  const [isId, setIsId] = useState();
  const [isTitle, setIsTitle] = useState();
  const [isCreator, setIsCreator] = useState();
  const src = " https://img.youtube.com/vi/" + isId + "/0.jpg ";
  const truncateTitle = (title, maxLength) => {
    if (title && title.length > maxLength) {
      return title.substring(0, maxLength) + "...";
    } else {
      return title;
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${videoInfo}/${props.id}`);
        const result = await response.json();
        setIsId(result.data.link);
        setIsTitle(result.data.title);
        setIsCreator(result.data.creator);
        console.log("console", result.data.creator);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [props.id]);
  console.log("isCreator", isCreator);
  return (
    <div className="video-card">
      <div className="video-card-wrap">
        <div>
          <img className="video-card-wrap-img" src={src} />
        </div>
        <div className="video-card-wrap-detail">
          <span>{truncateTitle(isTitle, 30)}</span>
          <div>{isCreator}</div>
        </div>
      </div>
    </div>
  );
}
