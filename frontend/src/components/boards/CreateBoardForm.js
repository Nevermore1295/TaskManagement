import { useState } from "react";
import "@/styles/boards.module.css";

const CreateBoardForm = ({ onCreate }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (title.trim()) {
      onCreate(title);
      setTitle("");
    }
  };

  return (
    <div className="create-board">
      <input
        type="text"
        placeholder="New Board"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleSubmit}>Create</button>
    </div>
  );
};

export default CreateBoardForm;
