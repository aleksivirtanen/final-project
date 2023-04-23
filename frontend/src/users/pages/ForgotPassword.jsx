import React, { useRef, useState } from "react";
import { useMutation } from "react-query";
import Card from "../../shared/components/card/Card";
import Input from "../../shared/components/input/Input";
import Button from "../../shared/components/button/Button";
import { forgotPassword } from "../api/users";
import { useHistory } from "react-router-dom";
import "./Authenticate.css";
import LoadingSpinner from "../../shared/components/loadingspinner/LoadingSpinner";

const ForgotPassword = (props) => {
  const emailRef = useRef();
  const history = useHistory();
  const [emailValid, setEmailValid] = useState(undefined);

  const resetPasswordMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      console.log(data);
      if (data.message === "Link sent to Email") {
        setEmailValid(true);
      } else setEmailValid(false);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    resetPasswordMutation.mutate({
      email: emailRef.current.value,
    });
  };

  const backToLoginHandler = (event) => {
    event.preventDefault();
    history.push("/auth");
  };

  return (
    <Card className="authentication">
      <h2>Reset Password</h2>
      <form onSubmit={onSubmitHandler}>
        <Input id="email" ref={emailRef} type="text" label="Email" />
        {emailValid !== undefined && !emailValid && <p>Email not found!</p>}
        {emailValid !== undefined && emailValid && (
          <div>
            <p style={{ color: "green" }}>
              Password reset link sent to given Email.
            </p>
            <p style={{ color: "green" }}>It expires in 5 minutes.</p>
          </div>
        )}
        {resetPasswordMutation.isLoading && (
          <div>
            <LoadingSpinner />
          </div>
        )}
        <Button type="submit" disable={resetPasswordMutation.isLoading}>
          Reset
        </Button>
      </form>
      <Button inverse onClick={backToLoginHandler}>
        Back to Login?
      </Button>
    </Card>
  );
};

export default ForgotPassword;
