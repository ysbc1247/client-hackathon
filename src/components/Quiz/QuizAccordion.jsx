import Accordion from "react-bootstrap/Accordion";
import Badge from "react-bootstrap/Badge";
import QuizGet from "./QuizGet";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Quiz/Quiz.css";
import "../../api";
import { BASEURL } from "../../api";
export default function QuizAccordion(props) {
  const videoId = props.videoId;
  const [isQuizList, setIsQuizList] = useState([]);
  const [isQuizStatus, setIsQuizStatus] = useState(null); // 퀴즈 색
  console.log("isquizState", isQuizStatus);
  const token = localStorage.getItem('accessToken');
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const handleQuizStateChange = (newQuizState) => {
    setIsQuizList(newQuizState);
  };

  const api = BASEURL + "/user/video/" + videoId + "/quiz";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(api,{
          headers: {
            'Authorization': `${token}`
          }
        });
        console.log("동영상별 퀴즈 가져오기", result.data);
        console.log("message data ", result.data.message);
        console.log("isQuizlist 데이터 " , result.data.data.userTodoQuizDTOS);
        setIsQuizList(result.data.data.userTodoQuizDTOS);
      } catch (error) { console.error("Error fetching data: ", error);}
    };
    fetchData();
  }, [videoId]);
  console.log("isQuizList", isQuizList);
  const handleAccordionSelect = (index) => {
    setCurrentQuizIndex(index);
  };
  const handleBadgeColor = () => {
    if (isQuizStatus === null) {
      setIsQuizStatus("secondary");
    } else if (isQuizStatus === true) {
      setIsQuizStatus("success");
    } else {
      setIsQuizStatus("Danger");
    }
  };
  const handleBadge = () => {};
  return (
    <div className="quiz">
      <Accordion activeKey={currentQuizIndex} onSelect={handleAccordionSelect}>
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
                setData={setIsQuizStatus}
              />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}
