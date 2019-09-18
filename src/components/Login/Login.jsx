import React, { useState, useRef, useContext, useEffect } from "react";
import styled from "styled-components";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";
import { Context, DispatchContext } from "../../context/Context";
import { LOGIN } from "../../context/ActionFunctions";

const Login = props => {
  const state = useContext(Context);
  const dispatch = useContext(DispatchContext);
  const [login, setLogin] = useState(true);
  const loggedInUser = useRef("");
  const user_password = useRef("");
  const [msg, setMsg] = useState({ msgColor: "", msgText: " " });

  useEffect(() => {
    // console.log(state);
    if (typeof state !== "undefined") {
      if (
        typeof state.user_data !== "undefined" &&
        typeof state.user_data.login_msg !== "undefined"
      ) {
        if (state.user_data.login_msg.type === "LOGIN") {
          const { msgColor, msgText, success } = state.user_data.login_msg;
          if (success) props.history.push("/");
          else setMsg({ msgColor, msgText });
        }
      }
    }
    return () => {};
  }, [state, props.history]);
  const Wrapper = styled.div`
    position: absolute;
    font-family: "Delius", cursive;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(52, 73, 94, 0.6);
    z-index: 100;
    .loginWrapper {
      @media all and (max-width: 684px) {
        width: 65%;
      }
      @media all and (max-width: 525px) {
        width: 80%;
      }
      @media all and (max-width: 428px) {
        width: 95%;
        padding: 2rem 2rem;
      }

      & h4 i {
        color: rgba(52, 152, 219, 1);
        font-weight: bold;
      }
      & label {
        font-weight: bold;
      }
      padding: 2rem 5rem;
      border-radius: 10px;
      background-color: rgba(189, 195, 199, 1);
      position: absolute;
      z-index: 101;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .closeBtn {
      color: purple;
      position: absolute;
      right: 0.4rem;
      top: 0.4rem;
    }
  `;
  function handleFormClose() {
    props.history.push("/");
  }
  function handleFormSubbmit(e) {
    e.preventDefault();
    if (e.target.value === "register") {
      setLogin(false);
    }
    if (e.target.value === "login") {
      if (login) {
        dispatch(
          LOGIN({
            action: "LOGIN",
            payload: {
              loggedInUser: loggedInUser.current.value,
              user_password: user_password.current.value
            }
          })
        );
      } else {
        setLogin(true);
      }
    }
  }
  return (
    <Wrapper>
      <div className="loginWrapper">
        <div onClick={handleFormClose} className="closeBtn btn btn-primary">
          X
        </div>
        {login ? (
          <LoginComponent
            handleFormSubbmit={handleFormSubbmit}
            loggedInUser={loggedInUser}
            user_password={user_password}
            msg={msg}
          />
        ) : (
          <RegisterComponent handleFormSubbmit={handleFormSubbmit} />
        )}
      </div>
    </Wrapper>
  );
};

export default Login;
