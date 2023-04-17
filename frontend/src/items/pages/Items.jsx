import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getItems } from "../api/items";
import ItemsList from "../components/ItemsList";
import CategoryFilter from "../components/CategoryFilter";
import LoadingSpinner from "../../shared/components/loadingspinner/LoadingSpinner";
import "../../index.css";

const Items = () => {
  const [items, setItems] = useState([]);
  const [checkboxStatus, setCheckboxStatus] = useState([]);
  const { isLoading, error, data, refetch } = useQuery("itemsData", getItems, {
    onSuccess: setItems,
  });

  const refetchHandler = () => {
    refetch();
  };

  const checkboxHandler = (state) => {
    setCheckboxStatus(state);
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
    setItems(itemHolder);
  }, [checkboxStatus]);

  console.log(items);
  const showUserName = true;
  const props = { items, showUserName, refetchHandler };

  if (isLoading)
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );

  if (error) return "An error has occured: " + error.message;

  return (
    <>
      <CategoryFilter checkboxHandler={checkboxHandler} />
      <ItemsList {...props} />
    </>
  );
};

export default Items;
