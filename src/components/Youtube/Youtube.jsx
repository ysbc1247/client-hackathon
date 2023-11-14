import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { videoInfo } from "../../api";
import { Link } from "react-router-dom";

export default function Youtube(props) {
  const index = props.isdex;
  const listId = props.listId;
  const videoId = props.videoId;
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
  // const truncateTitle = (title, maxLength) => {
  //   if (title.length > maxLength) {
  //     return title.substring(0, maxLength) + "...";
  //   } else {
  //     return title;
  //   }
  // };
  const truncateTitle = (title, maxLength) => {
    if (title && title.length > maxLength) {
      return title.substring(0, maxLength) + "...";
    } else {
      return title;
    }
  };
  // console.log("요거 인덱스", index);
  // // useEffect(() => {
  //   const CompleteVideo
  // }, []);

  // console.log("이미지", src);
  return (
    <div>
      <div>
        <Link to={`/${listId}/${videoId}/video/${isId}/${index}`}>
          <Card className="card">
            <Card.Img variant="top" src={src} />
            <Card.Body>
              <Card.Title>{truncateTitle(isTitle, 30)}</Card.Title>
              <Card.Text className="card-detail">{isCreator}</Card.Text>
            </Card.Body>
            <label className="check-watched">
              <input
                type="checkbox"
                // checked={isVideoList[i].}
              />
            </label>
          </Card>
        </Link>
      </div>
    </div>
  );
}
