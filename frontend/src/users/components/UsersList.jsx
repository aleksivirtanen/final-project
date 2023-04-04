//UsersList.jsx
import React from "react";
import UserItem from "./UserItem";

import "./UsersList.css";

const UsersList = (props) => {
  return (
    <ul className="users-list">
      {props.items.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          name={user.name}
          email={user.email}
          image={"https://static.thenounproject.com/png/4035892-200.png"}
        />
      ))}
    </ul>
  );
};

export default UsersList;
