import { useEffect, useState } from "react";
import "../Quiz/Quiz.css";
import { solvequiz } from "../../api";
import axios from "axios";

export default function QuizGet(props) {
  const [isQuizId, setIsQuizId] = useState();
  const [isAnswer, setIsAnswer] = useState(0);
  const [isQuizState, setIsQuizState] = useState(null);
  const quizId = props.quizId;
  const quizSuccess = solvequiz + "/" + quizId + "/1";
  const quizFalse = solvequiz + "/" + quizId + "/0";

  // const handlerAnswerO = async () => {
  //   console.log("success");
  //   const response = await fetch("/" + solvequiz + "/" + isAnswer);
  // };

  const handlerAnswerO = async () => {
    try {
      const response = await axios.post(quizSuccess);
      const responseData = response.data;
      console.log(responseData);
      setIsQuizState(responseData.data.message);
      //부모로 전달
      setIsQuizState(responseData.data.message);
      // 업데이트된 isQuizState를 부모로 전달
      props.onQuizStateChange(responseData.data.message);
    } catch (error) {
      console.error("Error while making the POST request:", error);
    }
  };
  // console.log("quiz 맞으면 ", isQuizState);
  //
  // console.log("quizId 왔냐?!", props.quizId);
  const handlerAnswerX = async () => {
    try {
      const response = await axios.post(quizFalse);
      const responseData = response.data;
      // 업데이트된 isQuizState를 부모로 전달
      props.onQuizStateChange(responseData.data.message);
    } catch (error) {
      console.error("Error while making the POST request:", error);
    }
  };
  return (
    <>
      <div className="quiz-accordion-item">
        <div>
          <img alt="question" className="quiz-img" src={props.s3Url} />
        </div>
        <div className="quiz-question">
          <h3>
            <b>QUESTION</b>
          </h3>
          <span>{props.question}</span>
          <div className="quiz-question-btn">
            <div className="quiz-question-btn-o" onClick={handlerAnswerO}>
              O
            </div>
            <div className="quiz-question-btn-x" onClick={handlerAnswerX}>
              X
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
