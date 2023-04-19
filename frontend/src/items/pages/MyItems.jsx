import React, { useEffect, useContext } from "react";
import { useQuery } from "react-query";
import { getMyItems } from "../api/items";
import ItemsList from "../components/ItemsList";
import LoadingSpinner from "../../shared/components/loadingspinner/LoadingSpinner";
import "../../index.css";
import { AuthContext } from "../../shared/context/auth-context";

const MyItems = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, data, refetch } = useQuery("itemsData", () =>
    getMyItems(auth.token)
  );

  const refetchHandler = () => {
    refetch();
  };

  if (isLoading)
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );

  if (error) return "An error has occured: " + error.message;
  if (!data) return <div>You have no listings!</div>;

  const authRequired = true;
  const items = data;
  const props = { items, authRequired, refetchHandler };

  return <ItemsList {...props} />;
};

export default MyItems;
