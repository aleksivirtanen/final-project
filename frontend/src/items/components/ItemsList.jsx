import React from "react";
import Item from "./Item";
import "./ItemsList.css";

const ItemsList = ({ items, showUserName, refetchHandler }) => {
  if (items.length === 0) {
    return (
      <div>
        <h2>No items found.</h2>
      </div>
    );
  }
  return (
    <ul className="items-list">
      {items.map((item) => (
        <Item
          key={item.id}
          id={item.id}
          userId={item.userId}
          userName={item.name}
          itemName={item.itemName}
          description={item.description}
          category={item.category}
          price={item.price}
          image={item.image}
          showUserName={showUserName}
          refetchHandler={refetchHandler}
        />
      ))}
    </ul>
  );
};

export default ItemsList;
