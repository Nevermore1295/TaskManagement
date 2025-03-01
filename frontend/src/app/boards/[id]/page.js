"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/components/boards/Sidebar";
import List from "@/components/lists/List";
import { getBoardDetails, getListsByBoard } from "@/libs/api"; 
import "@/styles/boardDetail.module.css"

const BoardDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [board, setBoard] = useState(null);
  const [lists, setLists] = useState([]);

  // Gọi API lấy Board và Lists
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi API lấy thông tin Board
        const boardRes = await getBoardDetails(id);
        if (boardRes.success) setBoard(boardRes.data);

        // Gọi API lấy danh sách Lists thuộc Board
        const listsRes = await getListsByBoard(id);
        if (listsRes.success) setLists(listsRes.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!board) return <p>Loading...</p>;

  return (
    <div className="board-container">
      <Sidebar />
      <div className="board-content">
        <h1>{board.name}</h1>
        <div className="lists-container">
          {lists.map((list) => (
            <List key={list.id} list={list} />
          ))}
          <button className="add-list-btn">+ Thêm danh sách khác</button>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
