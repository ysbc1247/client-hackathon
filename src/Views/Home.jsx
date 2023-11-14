import "../styles/Home.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { videoList } from "../api";
import Youtube from "../components/Youtube/Youtube";

export default function Home() {
  const { listId } = useParams();
  const [videoListData, setVideoListData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${videoList}/${listId}`).then(
          (response) => response.json(),
        );
        setVideoListData(response.data.userTodoVideos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [listId]);

  return (
    <div className="home">
      <div className="home-wrap">
        <div className="card-wrap">
          {videoListData.map((video, index) => (
            <div key={index}>
              <Youtube
                key={index}
                videoId={videoListData[index].videoId}
                listId={listId}
                isdex={index}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
