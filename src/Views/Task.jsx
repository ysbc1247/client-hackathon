import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASEURL } from '../api';
import Kanban from "../components/KanbanBoard/Kanban";


export default function Task() {
  const { id } = useParams();
  const [boardData, setBoardData] = useState({
    columns: [
      { id: 1, title: "할 것들", cards: [] },
      { id: 2, title: "시작", cards: [] },
      { id: 3, title: "진행중", cards: [] },
      { id: 4, title: "끝", cards: [] },
    ]
  });

  useEffect(() => {
    const stages = [1, 2, 3, 4]; // Assuming these are your stage IDs

    stages.forEach(stage => {
      fetchDataForStage(stage);
    });
  }, [id]);

  async function fetchDataForStage(stage) {
    try {
      console.log("fetching with id", id, stage);
    
      const response = await axios.get(`${BASEURL}/list/${id}/${stage}`);
      
      console.log("response data", response.data);
      updateBoardWithStageData(stage, response.data);
    } catch (error) {
      console.error(`Error fetching data for stage ${stage}:`, error);
    }
  }
  

  const updateBoardWithStageData = (stage, apiData) => {
    console.log("Processing stage:", stage);
    
    const updatedCards = apiData.data.listByStageVideoDTOS.map(video => {
      // Log each video title
      console.log("Video title:", video.title);

      return {
        id: video.userTodoVideoId,
        title: video.title,
        description: video.description,
        link: video.link,
        creator: video.creator
      };
    });

    setBoardData(prevState => {
      const newColumns = prevState.columns.map(column => {
        if (column.id === stage) {
          console.log(updatedCards);
          return { ...column, cards: updatedCards };
        }
        return column;
      });
      console.log(newColumns);
      return { ...prevState, columns: newColumns };
    });
};


  console.log("sadfdasfsda",boardData);
  return (
    <div className="home kanban">
      <div className="home-wrap">
        
        <Kanban  boardData={boardData} lstId = {id} />
      </div>
    </div>
  );
}
