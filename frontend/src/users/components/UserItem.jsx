//UserItem.jsx

import React from "react";

import Avatar from "../../shared/components/avatar/Avatar";
import Card from "../../shared/components/card/Card";

import "./UserItem.css";

const UserItem = (props) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <div className="user-item__image">
          <Avatar
            image={props.image}
            alt={props.name}
            width="75px"
            height="75px"
          />
        </div>
        <div className="user-item__info">
          <h2>{props.name}</h2>
          <h3>{props.email}</h3>
        </div>
      </Card>
    </li>
  );
};

export default UserItem;
