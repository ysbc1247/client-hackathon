import "../styles/Home.css";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import { videoList } from "../api";
import Youtube from "../components/Youtube/Youtube";

export default function Home() {
  const { listId } = useParams();
  const [videoListData, setVideoListData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        console.log(token);
        const response = await fetch(`${videoList}/${listId}`,{
          headers: {
            'Authorization': `${token}`
          }
        }).then(
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
      <div>
        <Link to={"/task/" + listId}>
          <div className="navbar-to-kanban">
            <Button>KANBAN BOARD</Button>
          </div>
        </Link>
      </div>
      <div className="home-wrap">
        {videoListData.map((video, index) => (
          <div key={index}>
            <Youtube
              key={index}
              videoId={videoListData[index].videoId}
              listId={listId}
              isdex={index}
              stage={videoListData[index].stage}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
