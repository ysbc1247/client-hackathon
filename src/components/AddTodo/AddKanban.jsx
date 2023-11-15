import React, { useState } from "react";
import AddVideoIdList from "./AddVideoIdList";
import "../AddTodo/AddTodo.css";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASEURL } from "../../api";
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
  const handleNewTodoList = async (listId) => {
    
    try {
      const token = localStorage.getItem('accessToken');
      console.log(token);
      const response = await axios.post(`${BASEURL}/user/list/${listId+1}`,{},{
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token}`
        }
      });
      
      console.log(response.data); 
    } catch (error) {
      console.error("Error creating new todo list:", error);
    }
  };
  return (
    <div className="video-container">
      {isTodoVideos.map((item, index) => (
        <div key={index} className="video-container-wrap">
          <div className="video-container-category">
            <Badge bg="info" className="video-container-category-badge">
              <span className="video-container-category-font">{item.name}</span>
            </Badge>
            <button onClick={() => handleNewTodoList(item.id)} className="new-todo-list-button">
              Add New List
            </button>
          </div>
          <div className="video-container-calousel">
            <AddVideoIdList key={index} todoVideos={item.todoVideos} />
          </div>
        </div>
      ))}
    </div>
  );
}
