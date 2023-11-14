import React, { useState, useEffect } from 'react';
import Board from "@asseinfo/react-kanban";
import "@asseinfo/react-kanban/dist/styles.css";
import axios from 'axios';
const handleCardMove = async (lss, cardTitle, dest) => {
  try {
    const todoListUpdateDTO = {
      id: cardTitle, // Assuming cardData has an 'id' field
      arrival: dest, // Replace 'newPosition' with the actual property that represents the new position of the card
    };

    const response = await axios.put(`http://localhost:8080/list/${lss}`, todoListUpdateDTO, {
  headers: {
    'Content-Type': 'application/json'
  }
});
    console.log("Update successful:", response.data);
    
  } catch (error) {
    console.error("Error updating todo list:", error);
  }
};

export default function Kanban({ boardData,lstId }) {
  const [isCard, setIsCard] = useState();
  const [internalBoardData, setInternalBoardData] = useState(boardData);

  useEffect(() => {
    setInternalBoardData(boardData);
  }, [boardData]);

  return (
    <div>
      <Board
        key={JSON.stringify(internalBoardData)}
        initialBoard={internalBoardData}
        allowRemoveCard
        allowAddCard={{ on: "top" }}
        onCardRemove={(updatedBoard, removedCard) => {
          console.log("삭제된 카드:", removedCard);
          console.log("업데이트된 보드:", updatedBoard);
        }}
        onCardDragEnd={(updatedBoard, card, source, destination) => {
          console.log("Card moved:", card);
          console.log("From:", source, "To:", destination);
          const lss = lstId;
          // Extract userId and listId based on your application logic
          
          const cardTitle = card.title;
          console.log(cardTitle);
          const dest = destination.toColumnId; // or other logic based on your needs
          console.log(dest);
          handleCardMove(lss, cardTitle, dest);
        }}
        onNewCardConfirm={(draftCard) => ({
          id: new Date().getTime(),
          ...draftCard,
        })}
        onCardNew={(updatedBoard, newCard) => {
          // 새로운 카드와 업데이트된 보드를 처리하는 로직을 추가합니다.
          console.log("새로운 카드:", newCard);
          console.log("업데이트된 보드:", updatedBoard);

          // 여기에서 새로운 카드를 서버로 보낼 수 있습니다.
          setIsCard(newCard);
        }}
        disableColumnDrag
      >
      </Board>
    </div>
  );
}