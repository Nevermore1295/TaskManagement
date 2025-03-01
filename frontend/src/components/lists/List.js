"use client";
import { useEffect, useState } from "react";
import Card from "@/components/cards/Card";

const List = ({ list }) => {
  const [cards, setCards] = useState([]);

  // Gọi API lấy Cards theo ListId
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch(`/api/lists/${list.id}/cards`);
        const data = await res.json();
        if (data.success) setCards(data.cards);
      } catch (error) {
        console.error("Lỗi khi lấy Cards:", error);
      }
    };
    fetchCards();
  }, [list.id]);

  return (
    <div className="list">
      <h3>{list.name}</h3>
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
      <button className="add-card-btn">+ Thêm thẻ</button>
    </div>
  );
};

export default List;
