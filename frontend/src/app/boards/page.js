"use client";
import { useEffect, useState } from "react";
import { getBoards, createBoard } from "@/libs/api";
import Sidebar from "@/components/boards/Sidebar";
import BoardList from "@/components/boards/BoardList";
import CreateBoardForm from "@/components/boards/CreateBoardForm";


const BoardsPage = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      const response = await getBoards();

      if (response.success && response.data && Array.isArray(response.data.boards)) {
        setBoards(response.data.boards); 
      } else {
        setBoards([]); // Nếu API lỗi hoặc không có dữ liệu, đặt state rỗng
      }
    };
    fetchBoards();
  }, []);
  

  const handleCreateBoard = async (title) => {
    if (!title.trim()) return;
    const response = await createBoard({ title });
    if (response.success) {
      setBoards((prev) => [...prev, response.data]);
    }
  };

  return (
    <div className="boards-container">
      <Sidebar boardsData={{ boards }} />
      <main className="boards-content">
        <BoardList boards={boards} />
        <CreateBoardForm onCreate={handleCreateBoard} />
      </main>
    </div>
  );
};

export default BoardsPage;
