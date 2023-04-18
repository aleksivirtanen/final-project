import React, { useRef } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Input from "../../shared/components/input/Input";
import "./KeywordFilter.css";

const KeywordFilter = (props) => {
  const keywordRef = useRef();

  const clickHandler = (event) => {
    event.preventDefault();
    if (keywordRef.current.value.length < 20) {
      props.searchHandler(keywordRef.current.value);
    }
    keywordRef.current.value = "";
  };

  return (
    <div className="search-bar">
      <Input id="search" ref={keywordRef} />
      <IconButton type="button" onClick={clickHandler}>
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default KeywordFilter;
