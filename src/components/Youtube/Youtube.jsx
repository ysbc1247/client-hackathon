import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { videoInfo } from "../../api";
import { Link } from "react-router-dom";
import "../Youtube/Youtube.css";
export default function Youtube(props) {
  const index = props.isdex;
  const listId = props.listId;
  const videoId = props.videoId;
  const stage = props.stage;
  const [isStage, setIsStage] = useState(false);
  const [isId, setIsId] = useState();
  const [isTitle, setIsTitle] = useState();
  const [isCreator, setIsCreator] = useState();
  const src = " https://img.youtube.com/vi/" + isId + "/0.jpg ";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${videoInfo}/${videoId}`);
        const result = await response.json();
        setIsId(result.data.link);
        setIsTitle(result.data.title);
        setIsCreator(result.data.creator);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [videoId]);

  const truncateTitle = (title, maxLength) => {
    if (title && title.length > maxLength) {
      return title.substring(0, maxLength) + "...";
    } else {
      return title;
    }
  };
  const setIsStageValue = () => {
    const newValue = isStage === 4;
    if (stage === 4) {
      setIsStage(true);
    } else {
      setIsStage(false);
    }
  };
  useEffect(() => {
    setIsStageValue();
  }, []); // empty dependency array ensures it runs only once when the component mounts

  return (
    <div>
      <div className="v-card">
        <Link to={`/${listId}/${videoId}/video/${isId}/${index}`}>
          <div className="video-card">
            <div className="video-card-wrap">
              <div>
                <img className="video-card-wrap-img" src={src} />
              </div>
              {/*<div className="video-card-wrap-detail">*/}
              <div className="video-card-wrap-detail">
                {console.log("스테이지로그", isStage)}
                <span
                  className={
                    isStage ? "green-text" : "video-card-wrap-detail-text"
                  }
                >
                  {truncateTitle(isTitle, 30)}
                </span>
                <div>{isCreator}</div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
