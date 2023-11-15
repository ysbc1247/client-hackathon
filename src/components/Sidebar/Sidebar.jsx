import "../Sidebar/Sidebar.css";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { howProgress } from "../export";
import { getTask } from "../../api";
import { CgAdd, CgAddR } from "react-icons/cg";

export default function Sidebar() {
  const [isTask, setIsTask] = useState([]);
  // const [isTaskid, setIsTaskid] = useState();
  // const [isTitle, setIsTitle] = useState("");
  // const [isProgress, setIsProgress] = useState();
  // const [isDetail, setIsDetail] = useState("");
  const [isAdding, setIsAdding] = useState(false); // Track if user is adding a new task
  const [newTask, setNewTask] = useState({
    name: "",
    progress: 0,
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        console.log(token);
        const response = await fetch(getTask, {
          headers: {
            'Authorization': `${token}`
          }
        }).then(response => response.json());
        setIsTask(response.data);
        console.log();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  console.log(isTask);
  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleCancelClick = () => {
    setIsAdding(false);
    setNewTask({
      name: "",
      progress: 0,
      description: "",
    });
  };

  const handleConfirmClick = () => {
    setIsTask([...isTask, newTask]);
    setIsAdding(false);
    setNewTask({
      name: "",
      progress: 0,
      description: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };
  // const deleteTask = async (taskId) => {
  //   try {
  //     await axios.delete(`http://localhost:4000/task/${taskId}`);
  //     const updatedTasks = isTask.filter((task) => task.id !== taskId);
  //     console.log("됬냐?");
  //   } catch (error) {
  //     console.error("Error deleting task:", error);
  //   }
  // };

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-header">
          <Link to="/add">
            <span className="sidebar-add-btn" onClick={handleAddClick}>
              <Button variant="success" className="sidebar-add-btn-btn">
                <span className="sidebar-add-btn-btn-plus">+</span>
              </Button>
            </span>
          </Link>
        </div>
        <ListGroup as="ol" numbered>
          {isTask.map((a, i) => (
            <Link to={"/" + isTask[i].listId}>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold sidebar-name">{isTask[i].name}</div>
                  <div>
                    <ProgressBar
                      className="sidebar-progress"
                      variant={howProgress(isTask[i].progress)}
                      now={isTask[i].progress}
                      label={`${isTask[i].progress}%`}
                    />
                  </div>
                  <div className="sidebar-description">
                    {isTask[i].description}
                  </div>
                </div>
                <Badge bg="danger">x</Badge>
              </ListGroup.Item>
            </Link>
          ))}
        </ListGroup>
      </div>
    </>
  );
}
