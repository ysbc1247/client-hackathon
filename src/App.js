import React, { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Views/Home";
import Sidebar from "./components/Sidebar/Sidebar";
import Button from "react-bootstrap/Button";
import Video from "./Views/Video";
import Task from "./Views/Task";
import { getTask } from "./api";
import Add from "./Views/Add";
import { FaBeer } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import "./App.css"; // 새로운 CSS 파일을 import

function App() {
  const location = useLocation();
  const [isSidebar, setIsSidebar] = useState(false);

  const handlerSidebar = () => {
    setIsSidebar(!isSidebar);
  };

  return (
    <div className={`App ${isSidebar ? "sidebar-open" : "sidebar-closed"}`}>
      <div>
        <Navbar isSidebar={isSidebar} />
        {isSidebar ? (
          <>
            {/*{memoizedSidebar}*/}
            <Sidebar />
            <Button
              variant="warning"
              className="isSide-btn-close"
              onClick={handlerSidebar}
            >
              <IoCloseSharp />
            </Button>
          </>
        ) : (
          <Button
            variant="warning"
            className="isSide-btn-open"
            onClick={handlerSidebar}
          >
            <GiHamburgerMenu />
          </Button>
        )}
      </div>
      <div className="App-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/:listId" element={<Home />} />
          <Route
            path="/:listId/:videoId/video/:id/:index"
            element={<Video />}
          />
          <Route path="/task/:id" element={<Task />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
