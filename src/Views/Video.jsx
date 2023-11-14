import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import QuizAccordion from "../components/Quiz/QuizAccordion";
import "../styles/Video.css";
export default function Video() {
  const { listId, videoId } = useParams();
  const { id } = useParams();
  const { index } = useParams();
  const currentIndex = parseInt(index, 10); //next

  return (
    <div className="video">
      <div className="video-wrap">
        <div>
          <YouTube
            key={id}
            videoId={id} //동영상 주소
            opts={{
              width: "100%",
              height: "500px",
              playerVars: {
                autoplay: 1, //자동 재생 여부
                modestbranding: 1, //컨트롤 바에 유튜브 로고 표시 여부
                loop: 1, //반복 재생
              },
            }}
            onReady={(e) => {
              e.target.mute(); //소리 끔
            }}
          />
          <span>next</span>
        </div>
        <div className="video-accordion">
          <QuizAccordion videoId={videoId} />
        </div>
      </div>
    </div>
  );
}
