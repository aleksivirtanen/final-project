import React from "react";
import Keyword from "./Keyword";

const KeywordList = (props) => {
  return (
    <ul>
      {props.keywords.map((keyword, i) => (
        <Keyword
          key={i}
          keyword={keyword}
          removeKeywordHandler={props.removeKeywordHandler}
        />
      ))}
    </ul>
  );
};

export default KeywordList;
