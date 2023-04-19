import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getItems } from "../api/items";
import ItemsList from "../components/ItemsList";
import CategoryFilter from "../components/CategoryFilter";
import KeywordFilter from "../components/KeywordFilter";
import KeywordList from "../components/KeywordList";
import Card from "../../shared/components/card/Card";
import LoadingSpinner from "../../shared/components/loadingspinner/LoadingSpinner";
import "../../index.css";
import "./Items.css";

const Items = () => {
  const [items, setItems] = useState([]);
  const [checkboxStatus, setCheckboxStatus] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const { isLoading, error, data, refetch } = useQuery("itemsData", getItems, {
    onSuccess: setItems,
  });

  const refetchHandler = () => {
    refetch();
  };

  const checkboxHandler = (state) => {
    setCheckboxStatus(state);
  };

  const searchHandler = (keyword) => {
    if (keyword.length > 0) {
      if (keywords.includes(keyword)) return;
      setKeywords((keywords) => [...keywords, keyword]);
    } else setKeywords([]);
  };

  const removeKeywordHandler = (keyword) => {
    let keywordHolder = keywords;
    keywordHolder = keywordHolder.filter((word) => word !== keyword);
    setKeywords(keywordHolder);
  };

  useEffect(() => {
    let itemHolder = data;
    if (checkboxStatus.shelters === false) {
      itemHolder = itemHolder.filter((item) => item.category !== "Shelters");
    }
    if (checkboxStatus.sleepingbags === false) {
      itemHolder = itemHolder.filter(
        (item) => item.category !== "Sleeping Bags and Pads"
      );
    }
    if (checkboxStatus.firewarmth === false) {
      itemHolder = itemHolder.filter(
        (item) => item.category !== "Fire and Warmth"
      );
    }
    if (checkboxStatus.campcooking === false) {
      itemHolder = itemHolder.filter(
        (item) => item.category !== "Camp Cooking and Field Stoves"
      );
    }
    if (checkboxStatus.canteens === false) {
      itemHolder = itemHolder.filter(
        (item) => item.category !== "Canteens and Hydration Bladders"
      );
    }
    if (checkboxStatus.hygiene === false) {
      itemHolder = itemHolder.filter(
        (item) => item.category !== "Hygiene and Wash up"
      );
    }

    if (keywords.length > 0) {
      itemHolder = itemHolder.filter((item) => {
        return keywords.every((word) => {
          return (
            item.itemName.toUpperCase().includes(word.toUpperCase()) ||
            item.description.toUpperCase().includes(word.toUpperCase()) ||
            item.category.toUpperCase().includes(word.toUpperCase())
          );
        });
      });
    }

    setItems(itemHolder);
  }, [checkboxStatus, keywords]);

  const authRequired = false;
  const props = { items, authRequired, refetchHandler };

  if (isLoading)
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );

  if (error) return "An error has occured: " + error.message;

  return (
    <>
      <Card className="container">
        <div>
          <KeywordFilter searchHandler={searchHandler} />
          <KeywordList
            keywords={keywords}
            removeKeywordHandler={removeKeywordHandler}
          />
        </div>
        <CategoryFilter checkboxHandler={checkboxHandler} />
      </Card>
      <ItemsList {...props} />
    </>
  );
};

export default Items;
