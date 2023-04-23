import React, { useRef, useState, useContext } from "react";
import { useMutation } from "react-query";
import Card from "../../shared/components/card/Card";
import Input from "../../shared/components/input/Input";
import Button from "../../shared/components/button/Button";
import { signUpUser, loginUser } from "../api/users";
import { AuthContext } from "../../shared/context/auth-context";
import "./Authenticate.css";

const Authenticate = (props) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isLoginMode, setLoginMode] = useState(true);
  const [validLogin, setValidLogin] = useState(undefined);
  const [passwordValid, setPasswordValid] = useState(undefined);
  const [emailValid, setEmailValid] = useState(undefined);

  const auth = useContext(AuthContext);

  const switchModeHanlder = () => {
    setLoginMode((prevMode) => !prevMode);
    setValidLogin(undefined);
    setPasswordValid(undefined);
    setEmailValid(undefined);
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  const signUpUserMutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      console.log(data);
      if (data.message === "Could not create user, user exists") {
        setEmailValid(false);
        setPasswordValid(true);
      }
      auth.login(data.id, data.token);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const loginUserMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log(data);
      if (data.message === "No user found - Check your credentials") {
        setValidLogin(false);
      }
      auth.login(data.id, data.token);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (isLoginMode) {
      loginUserMutation.mutate({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    } else if (passwordRef.current.value.length > 4) {
      signUpUserMutation.mutate({
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    } else {
      setPasswordValid(false);
    }
  };

  return (
    <Card className="authentication">
      <h2>{isLoginMode ? "Login" : "Sign Up"}</h2>
      <form onSubmit={onSubmitHandler}>
        {!isLoginMode && (
          <Input id="name" ref={nameRef} type="text" label="Name" />
        )}
        <Input id="email" ref={emailRef} type="text" label="Email" />
        {emailValid !== undefined && !emailValid && (
          <p>Email already in use!</p>
        )}
        <Input
          id="password"
          ref={passwordRef}
          type="password"
          label="Password"
        />
        {validLogin !== undefined && !validLogin && (
          <p>Invalid email or password!</p>
        )}
        {passwordValid !== undefined && !passwordValid && (
          <p>Password too short, minimum 5 characters</p>
        )}
        <div className="resetPassword">
          <a href="/forgotpassword">Forgot password?</a>
        </div>
        <Button type="submit" disable={signUpUserMutation.isLoading}>
          {isLoginMode ? "LOGIN" : "SIGNUP"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHanlder}>
        {isLoginMode ? "SignUp" : "Login"} instead?
      </Button>
    </Card>
  );
};

export default Authenticate;
