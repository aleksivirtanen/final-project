import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { getItems } from "../api/items";
import ItemsList from "../components/ItemsList";
import LoadingSpinner from "../../shared/components/loadingspinner/LoadingSpinner";
import "../../index.css";

const Items = () => {
  const { isLoading, error, data, refetch } = useQuery("itemsData", () =>
    getItems()
  );

  useEffect(() => {
    refetch();
  });

  if (isLoading)
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );

  if (error) return "An error has occured: " + error.message;

  return <ItemsList items={data} />;
};

export default Items;
