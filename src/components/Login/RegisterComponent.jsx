import React from "react";
import styled from "styled-components";

const RegisterComponent = props => {
  const Wrapper = styled.div``;
  const { handleFormSubbmit } = props;
  return (
    <Wrapper>
      <h4 className="text-center pb-4 ">
        Registrare &nbsp;
        <i className="fas fa-shield-alt" />
      </h4>
      <form onSubmit={handleFormSubbmit}>
        <div className="form-group">
          <label htmlFor="username">Alege Utilizator</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Utilizator"
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Alege Email</label>
          <input
            type="email"
            className="form-control"
            id="username"
            autoComplete="off"
            placeholder="Utilizator"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password1">Alege Parola</label>
          <input
            type="password1"
            className="form-control"
            autoComplete="off"
            id="password"
            placeholder="Parola"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Confirma Parola</label>
          <input
            type="password2"
            className="form-control"
            autoComplete="off"
            id="password2"
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
        </div>
      </form>
    </Wrapper>
  );
};

export default RegisterComponent;
