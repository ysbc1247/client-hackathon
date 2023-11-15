import { useEffect, useState } from "react";
import "../Quiz/Quiz.css";
import { solvequiz } from "../../api";
import axios from "axios";

export default function QuizGet(props) {
  const [isQuizId, setIsQuizId] = useState();
  const [isAnswer, setIsAnswer] = useState(0);
  const [isQuizState, setIsQuizState] = useState();
  const quizId = props.quizId;
  const quizSuccess = solvequiz + "/" + quizId + "/1";
  const quizFalse = solvequiz + "/" + quizId + "/2";
  const token = localStorage.getItem('accessToken');
  console.log(token);
  const handlerAnswerO = async () => {
    try {
      const response = await axios.post(quizSuccess,{},{
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token}`
        }
      });
      const responseData = response.data;
      console.log(responseData);
      setIsQuizState(responseData.data.message);
      props.setData(isQuizState);
    } catch (error) {
      console.error("Error while making the POST request:", error);
    }
  };
  const handlerAnswerX = async () => {
    try {
      const response = await axios.post(quizFalse,{},{
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token}`
        }
      });
      const responseData = response.data;
      console.log(responseData);
      setIsQuizState(responseData.data.message);
    } catch (error) {
      console.error("Error while making the POST request:", error);
    }
  };
  useEffect(() => {
    const howQuiz = () => {
      if (isQuizState !== null) {
        if (isQuizState === true) {
          alert("Success");
        } else if (isQuizState === false) {
          alert("Fail");
        }
      }
    };
    howQuiz();
  }, [isQuizState]);

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
          <span className="quiz-question-text">{props.question}</span>
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
