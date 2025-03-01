import Link from "next/link";
import styles from "@/styles/boardList.module.css"; // Import CSS Module

const BoardList = ({ boards }) => {
  return (
    <div className={styles.boardList}>
      {boards.map((board) => (
        <Link key={board.id} href={`/boards/${board.id}`} className={styles.boardCard}>
          <h3>{board.title}</h3>
        </Link>
      ))}
    </div>
  );
};

export default BoardList;
