import React from "react";
import UsersList from "../components/UsersList";
import { getUsers } from "../api/users";
import { useQuery } from "react-query";
import LoadingSpinner from "../../shared/components/loadingspinner/LoadingSpinner";

const Users = () => {
  const { isLoading, error, data } = useQuery("usersData", () => getUsers());

  if (isLoading)
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );

  if (error) return "An error has occured: " + error.message;

  return <UsersList items={data} />;
};

export default Users;
