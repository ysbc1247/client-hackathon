import { useEffect, useState } from "react";
import AddKanban from "../components/AddTodo/AddKanban";
import { addKanban } from "../api";
import "../styles/Add.css";

export default function Add() {
  const [isList, setIsList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(addKanban);
        const result = await response.json();
        setIsList(result.data);
        console.log("카테고리", isList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  console.log("카테고리", isList[0]);
  return (
    <div>
      <div className="add">
        <AddKanban isList={isList} />
      </div>
    </div>
  );
}
