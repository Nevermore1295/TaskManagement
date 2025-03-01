import { useState } from "react";
import { createList } from "@/libs/api";

const CreateList = ({ boardId, onListCreated }) => {
  const [newListTitle, setNewListTitle] = useState("");

  const handleCreateList = async () => {
    if (!newListTitle.trim()) return;
    const response = await createList(boardId, { title: newListTitle });

    if (response.success) {
      onListCreated(response.data); // Cập nhật danh sách List ở parent
      setNewListTitle(""); // Reset input
    }
  };

  return (
    <div className="bg-gray-200 p-4 rounded w-64">
      <input
        type="text"
        value={newListTitle}
        onChange={(e) => setNewListTitle(e.target.value)}
        placeholder="Nhập tiêu đề danh sách..."
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={handleCreateList}
        className="w-full bg-blue-500 text-white py-1 rounded"
      >
        + Tạo danh sách
      </button>
    </div>
  );
};

export default CreateList;
