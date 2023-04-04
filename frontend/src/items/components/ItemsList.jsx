import React from "react";
import Item from "./Item";
import "./ItemsList.css";

const ItemsList = (props) => {
  if (props.items.length === 0) {
    return (
      <div>
        <h2>No items found.</h2>
      </div>
    );
  }
  return (
    <ul className="items-list">
      {props.items.map((item) => (
        <Item
          key={item.id}
          id={item.id}
          itemName={item.itemName}
          description={item.description}
          category={item.category}
          price={item.price}
          image={item.image}
        />
      ))}
    </ul>
  );
};

export default ItemsList;
