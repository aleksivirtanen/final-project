import React, { useContext } from "react";
import UsersList from "../components/UsersList";
import { getUsers } from "../api/users";
import { useQuery } from "react-query";
import LoadingSpinner from "../../shared/components/loadingspinner/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";

const Users = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, data } = useQuery("usersData", () =>
    getUsers(auth.token)
  );

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
