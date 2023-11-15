import React, { useState, useEffect } from "react";
import Board from "@asseinfo/react-kanban";
import "../KanbanBoard/kanban.css";
import "@asseinfo/react-kanban/dist/styles.css";
import axios from "axios";
import { BASEURL } from "../../api";
const handleCardMove = async (lss, cardTitle, dest) => {
  try {
    const formData = new FormData();
    formData.append('id', cardTitle);
    formData.append('arrival', dest);
    console.log(cardTitle);
    console.log(dest);
    const token = localStorage.getItem('accessToken');
    console.log(token);
    const response = await axios.put(
      `${BASEURL}/list/${lss}`,
      formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token}`
        }
      }
    );
    console.log("Update successful:", response.data);
  } catch (error) {
    console.error("Error updating todo list:", error);
  }
};


export default function Kanban({ boardData, lstId }) {
  const [isCard, setIsCard] = useState();
  const [internalBoardData, setInternalBoardData] = useState(boardData);

  useEffect(() => {
    setInternalBoardData(boardData);
  }, [boardData]);

  return (
    <div className="kanban-wrap">
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
          const dest = destination.toColumnId; // or other logic based on your needs
        
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
      ></Board>
    </div>
  );
}

// import Board from "@asseinfo/react-kanban";
// import "@asseinfo/react-kanban/dist/styles.css";
// import { board } from "../../const";
// import "../KanbanBoard/kanban.css";
// import React, { useEffect, useState } from "react";
// import { BASEURL } from "../../api";
//
// export default function Kanban(props) {
//   const listId = props.listId;
//   const [isCard, setIsCard] = useState();
//   const [isBoard, setIsBoard] = useState();
//   const [isStage, setIsStage] = useState();
//   const GetBoard = BASEURL + "/" + "list/" + listId + "/" + isStage;
//
//   return (
//     <div>
//       <h1>KANBAN_BOARD</h1>
//       <div className="kanban">
//         <Board
//           initialBoard={board}
//           allowRemoveCard
//           allowAddCard={{ on: "top" }}
//           onCardRemove={(updatedBoard, removedCard) => {
//             // 삭제된 카드와 업데이트된 보드를 처리하는 로직을 추가합니다.
//
//             console.log("삭제된 카드:", removedCard);
//             console.log("업데이트된 보드:", updatedBoard);
//           }}
//           onCardDragEnd={(updatedBoard, card, source, destination) => {
//             // 카드가 다른 컬럼으로 이동될 때 실행되는 로직을 추가합니다.
//             console.log("업데이트된 보드:", updatedBoard);
//             console.log("이동된 카드:", card);
//             console.log("출발지:", source);
//             console.log("도착지:", destination);
//           }}
//           onNewCardConfirm={(draftCard) => ({
//             id: new Date().getTime(),
//             ...draftCard,
//           })}
//           onCardNew={(updatedBoard, newCard) => {
//             // 새로운 카드와 업데이트된 보드를 처리하는 로직을 추가합니다.
//             console.log("새로운 카드:", newCard);
//             console.log("업데이트된 보드:", updatedBoard);
//
//             // 여기에서 새로운 카드를 서버로 보낼 수 있습니다.
//             setIsCard(newCard);
//           }}
//           disableColumnDrag
//         />
//       </div>
//     </div>
//   );
// }
// // import styled from "styled-components";
// // import Board from "@asseinfo/react-kanban";
// // import "@asseinfo/react-kanban/dist/styles.css";
// // import { board } from "../../const";
// // import React, { useState } from "react";
// //
// // const StyledBoard = styled(Board)`
// //   width: 100%;
// //   height: 100vh;
// //   display: flex;
// //   overflow-x: auto;
// //
// //   .react-kanban-board {
// //     margin: 0;
// //     padding: 0;
// //     flex: 1;
// //   }
// //
// //   .react-kanban-column {
// //     width: 300px; // 원하는 열의 너비를 설정하세요.
// //     margin-right: 16px; // 열 사이의 간격을 조절하세요.
// //     box-sizing: border-box;
// //   }
// //
// //   .react-kanban-card {
// //     background-color: #ffffff;
// //     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// //     margin-bottom: 8px;
// //     border-radius: 4px;
// //   }
// //
// //   .react-kanban-card__title,
// //   .react-kanban-card__description {
// //     padding: 8px;
// //   }
// //
// //   .react-kanban-column-header {
// //     background-color: #f1f1f1;
// //     padding: 8px;
// //     font-weight: bold;
// //     border-bottom: 1px solid #ddd;
// //   }
// // `;
// //
// // export default function Kanban() {
// //   const [isCard, setIsCard] = useState();
// //
// //   return (
// //     <StyledBoard
// //       initialBoard={board}
// //       allowRemoveCard
// //       allowAddCard={{ on: "top" }}
// //       onCardRemove={(updatedBoard, removedCard) => {
// //         console.log("삭제된 카드:", removedCard);
// //         console.log("업데이트된 보드:", updatedBoard);
// //       }}
// //       onCardDragEnd={(updatedBoard, card, source, destination) => {
// //         console.log("업데이트된 보드:", updatedBoard);
// //         console.log("이동된 카드:", card);
// //         console.log("출발지:", source);
// //         console.log("도착지:", destination);
// //       }}
// //       onNewCardConfirm={(draftCard) => ({
// //         id: new Date().getTime(),
// //         ...draftCard,
// //       })}
// //       onCardNew={(updatedBoard, newCard) => {
// //         console.log("새로운 카드:", newCard);
// //         console.log("업데이트된 보드:", updatedBoard);
// //         setIsCard(newCard);
// //       }}
// //       disableColumnDrag
// //     ></StyledBoard>
// //   );
// // }
