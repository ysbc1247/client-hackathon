import React, { useState } from "react";
import style from "./Navbar.css";
import { Link } from "react-router-dom";
export default function Navbar(props) {
  const [isSidebar, setIsSidebar] = useState(true);
  const handlerSidebar = () => {
    setIsSidebar(!isSidebar);
  };
  return (
    <div className="navbar">
      <h1>
        <Link className="App-logo" to="/1">
          KHU-DEMY
        </Link>
      </h1>
      <div>
        {/*<input*/}
        {/*  type="checkbox"*/}
        {/*  className={style.checkbox}*/}
        {/*  id="checkbox"*/}
        {/*  style={{ transition: "all 200ms" }}*/}
        {/*  onChange={props.switchTheme}*/}
        {/*/>*/}
        {/*<label for="checkbox" class="label">*/}
        {/*  <i className="fas fa-moon fa-sm"></i>*/}
        {/*  <i className="fas fa-sun fa-sm"></i>*/}
        {/*  <div className="ball" />*/}
        {/*</label>*/}
      </div>
    </div>
  );
}
