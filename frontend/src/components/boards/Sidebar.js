import Link from "next/link";
import styles from "@/styles/sidebar.module.css";

const Sidebar = ({ boardsData }) => {
    const boards = Array.isArray(boardsData?.boards) ? boardsData.boards : [];

    return (
      <aside className={styles.sidebar}>
        <h2>Your Boards</h2>
        <ul>
          {boards.length > 0 ? (
            boards.map((board) => (
              <li key={board.id}>
                <Link href={`/boards/${board.id}`} className={styles.sidebarLink}>
                  {board.name}
                </Link>
              </li>
            ))
          ) : (
            <p>No boards found.</p>
          )}
        </ul>
      </aside>
    );
};

export default Sidebar;
