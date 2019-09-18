import React from "react";

const LoginComponent = props => {
  const { handleFormSubbmit, user_password, loggedInUser } = props;
  const { msgColor, msgText } = props.msg;
  // console.log(msgColor);
  // console.log(msgText);
  return (
    <div className="register-custom">
      <div className="d-flex flex-column">
        <h4 className="text-center pb-4 ">
          Login &nbsp;
          <i className="fas fa-key" />
        </h4>
        <form onSubmit={handleFormSubbmit}>
          <div className="form-group">
            <label htmlFor="username">Nume Utilizator</label>
            <input
              type="text"
              className="form-control"
              ref={loggedInUser}
              id="username"
              placeholder="Nume Utilizator"
              autoFocus
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Parola</label>
            <input
              type="password"
              autoComplete="off"
              ref={user_password}
              className="form-control"
              id="password"
              placeholder="Parola"
            />
          </div>
          <div className="form-group">
            <button
              value="login"
              onClick={e => handleFormSubbmit(e)}
              type="submit"
              className="btn btn-primary mt-2"
            >
              Login
            </button>
            <button
              value="register"
              onClick={e => handleFormSubbmit(e)}
              className="btn btn-primary mt-2 ml-3"
            >
              Registrare
            </button>
            <p
              className="pt-2"
              style={{
                textTransform: "uppercase",
                fontSize: "1rem",
                color: `${msgColor}`
              }}
            >
              {msgText}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
