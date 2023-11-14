import React, { useState } from "react";
import AddVideoIdList from "./AddVideoIdList";
import "../AddTodo/AddTodo.css";

export default function AddKanban(props) {
  const [isTodoVideos, setIsTodoVideos] = useState([]);
  const handleSetIsTodoVideos = () => {
    setIsTodoVideos(
      props.isList.map((item, index) => ({
        id: index,
        name: item.name,
        todoVideos: item.todoVideos,
      })),
    );
  };
  React.useEffect(() => {
    handleSetIsTodoVideos();
  }, [props.isList]);

  return (
    <div className="video-container">
      {isTodoVideos.map((item, index) => (
        <div key={index}>
          <div>
            <span>카테고리: {item.name}</span>
          </div>
          <div className="video-container-calousel">
            <AddVideoIdList key={index} todoVideos={item.todoVideos} />
          </div>
        </div>
      ))}
    </div>
  );
}
