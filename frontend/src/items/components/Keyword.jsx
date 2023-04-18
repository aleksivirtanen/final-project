import React from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import IconButton from "@mui/material/IconButton";
import "./Keyword.css";

const Keyword = (props) => {
  const clickHandler = () => {
    props.removeKeywordHandler(props.keyword);
  };

  return (
    <li className="keyword">
      <IconButton type="button" onClick={clickHandler}>
        <HighlightOffIcon />
      </IconButton>
      <h3>{props.keyword}</h3>
    </li>
  );
};

export default Keyword;
