import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { useQuery } from "react-query";
import Card from "../../shared/components/card/Card";
import Input from "../../shared/components/input/Input";
import Button from "../../shared/components/button/Button";
import LoadingSpinner from "../../shared/components/loadingspinner/LoadingSpinner";
import { updatePassword, verifyLink } from "../api/users";
import { useHistory, useParams } from "react-router-dom";
import "./Authenticate.css";

const ResetPassword = (props) => {
  let { id, token } = useParams();
  const { isLoading, error, data, status, refetch } = useQuery(
    "verification",
    () => verifyLink(id, token)
  );
  const passwordRef = useRef();
  const passwordVerifyRef = useRef();
  const history = useHistory();
  const [passwordValid, setPasswordValid] = useState(undefined);
  const [passwordSame, setPasswordSame] = useState(undefined);
  const [verified, setVerified] = useState(undefined);

  console.log(data);
  useEffect(() => {
    if (status === "success" && data.message === "Verified") {
      setVerified(true);
    } else setVerified(false);
  }, [data, status]);

  const newPasswordMutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: (data) => {
      console.log(data);
      if (data.message === "Password updated") {
        setPasswordSame(true);
        setPasswordValid(true);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (passwordRef.current.value !== passwordVerifyRef.current.value) {
      setPasswordSame(false);
      return;
    }
    if (passwordRef.current.value.length < 5) {
      setPasswordSame(true);
      setPasswordValid(false);
      return;
    }
    await refetch();
    if (data.message === "Verified") {
      setVerified(true);
      newPasswordMutation.mutate({
        password: passwordRef.current.value,
        id: id,
        token: token,
      });
    } else setVerified(false);
  };

  const backToLoginHandler = (event) => {
    event.preventDefault();
    history.push("/auth");
  };

  if (isLoading)
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );

  if (error) return "An error has occured: " + error.message;

  if (!verified) {
    return (
      <div>
        <h2>Link expired!</h2>
      </div>
    );
  }

  return (
    <Card className="authentication">
      <h2>Password Reset</h2>
      <form onSubmit={onSubmitHandler}>
        <Input
          id="password"
          ref={passwordRef}
          type="password"
          label="New Password"
        />
        <Input
          id="passwordVerify"
          ref={passwordVerifyRef}
          type="password"
          label="Verify New Password"
        />
        {passwordSame !== undefined && !passwordSame && (
          <p>Passwords do not match!</p>
        )}
        {passwordValid !== undefined && !passwordValid && (
          <p>Password too short, minimum 5 characters</p>
        )}
        {passwordSame !== undefined &&
          passwordValid !== undefined &&
          passwordSame &&
          passwordValid && <p style={{ color: "green" }}>New password set!</p>}
        <Button type="submit" disable={newPasswordMutation.isLoading}>
          Set New Password
        </Button>
      </form>
      <Button inverse onClick={backToLoginHandler}>
        Back to Login?
      </Button>
    </Card>
  );
};

export default ResetPassword;
