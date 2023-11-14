import Accordion from "react-bootstrap/Accordion";
import Badge from "react-bootstrap/Badge";
import QuizGet from "./QuizGet";
import React, { useEffect, useState } from "react";
import "../Quiz/Quiz.css";
import "../../api";
import { BASEURL } from "../../api";
export default function QuizAccordion(props) {
  const videoId = props.videoId;
  const [isQuizList, setIsQuizList] = useState([]);
  const [isQuizState, setIsQuizState] = useState(null); // 퀴즈 색
  console.log("isquizState", isQuizState);
  const userId = "1";
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const handleQuizStateChange = (newQuizState) => {
    // Update the parent component's state with the new value
    setIsQuizList(newQuizState);
  };

  const api = BASEURL + "/user/" + userId + "/video/" + videoId + "/quiz";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api);
        const result = await response.json();
        setIsQuizList(result.data.userTodoQuizDTOS);
        console.log("동영상별 퀴즈 가져오기", result.data);
      } catch (error) {}
    };
    fetchData();
  }, [videoId]);
  console.log("isQuizList", isQuizList);
  const handleAccordionSelect = (index) => {
    // Accordion 아이템 선택 시 현재 퀴즈의 인덱스를 업데이트
    setCurrentQuizIndex(index);
  };
  const handleBadge = () => {};
  return (
    <div className="quiz">
      <Accordion
        activeKey={currentQuizIndex}
        onSelect={handleAccordionSelect}
        alwaysOpen
      >
        {isQuizList.map((quiz, index) => (
          <Accordion.Item key={index} eventKey={index.toString()}>
            <Accordion.Header>
              <Badge bg="secondary">
                <span style={{ height: "50px" }}>{`QUIZ #${index + 1}`}</span>
              </Badge>
            </Accordion.Header>
            <Accordion.Body>
              <QuizGet
                // QuizId={QuizId}
                s3Url={quiz.s3Url}
                question={quiz.question}
                quizId={quiz.quizId}
                // answer={quiz.answer}
              />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}
