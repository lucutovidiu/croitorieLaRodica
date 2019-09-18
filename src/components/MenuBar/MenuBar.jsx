import React, { useRef, useState, useEffect, useContext } from "react";
import {
  Container,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Row
} from "react-bootstrap";
import { Context, DispatchContext } from "../../context/Context";
import { NavLink, Link, Redirect } from "react-router-dom";
import siteDefaults from "../../siteDefaults/sitedefaults";
import styled from "styled-components";

const MenuBar = () => {
  const state = useContext(Context);
  const dispatch = useContext(DispatchContext);
  // console.log(state);
  const searchString = useRef("");
  const Logo = process.env.PUBLIC_URL + "/img/Logo/Logo-dark-2-crop.png"; //window.location.origin + "/img/Logo/logo.png";
  const NavbarLogo = (
    <img
      alt="La Rodica Logo"
      style={{ width: "80px" }}
      src={Logo}
      className="img-responsive"
    />
  );

  const Wrapper = styled.div`
    .navbar-custom {
      color: aliceblue;
    }
    input::placeholder {
      font-size: 0.9rem;
    }
    @media all and (max-width: 767px) {
      .custom-form {
        margin-bottom: 15px;
        margin-top: 10px;
      }
    }
    @media all and (min-width: 992px) {
      .nav-link-custom a {
        padding: 0 1rem;
      }
    }

    & .nav-link-custom a {
      text-decoration: none;
      /* padding: 0 1rem; */
      color: ${siteDefaults.NavBar.navBarActiveLinkColor};
      font-weight: bold;
    }
    & .nav-link-custom a:hover {
      color: ${siteDefaults.NavBar.navBarVisitedLinkColor};
    }

    & .nav-link-custom .active {
      color: ${siteDefaults.NavBar.navBarVisitedLinkColor};
    }
    .nav-link-custom a:last-of-type {
      padding: 0;
    }
  `;
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    setRedirect(false);
    return () => {};
  }, [redirect]);

  function handleSearchString(e) {
    e.preventDefault();
    // console.log(searchString.current.value);
    setRedirect(true);
  }

  function handleLogOut() {
    dispatch({ action: "LOGOUT" });
  }

  // console.log(state);
  return (
    <Wrapper>
      <Container fluid className="p-0 text-uppercase navbar-custom">
        <Navbar
          collapseOnSelect
          expand="lg"
          style={{ backgroundColor: siteDefaults.NavBar.navbarColor }}
          variant="light"
        >
          <Navbar.Brand className="ml-auto mr-auto p-0 d-md-none">
            <NavLink to="/">{NavbarLogo}</NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav order-md-6">
            <Navbar.Brand className="ml-auto mr-auto p-0 d-none d-md-block order-md-1">
              <Link to="/">{NavbarLogo}</Link>
            </Navbar.Brand>
            <Nav className="mr-auto nav-link-custom">
              <NavLink exact className="link btn-menu" to="/">
                Home
              </NavLink>
              <NavLink to="/Articole">Articole</NavLink>
              <NavLink to="/Contact">Contact</NavLink>

              {typeof state !== "undefined" &&
              typeof state.user_data !== "undefined" &&
              state.user_data.account_type === "Admin" ? (
                <NavLink to="/Admin">Administrare</NavLink>
              ) : null}
              {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
            </Nav>
            <Form
              inline
              className="ml-auto order-md-3"
              onSubmit={handleSearchString}
            >
              <Row>
                <FormControl
                  className="mr-1 col-sm-10 col-md-4 col-lg-5 ml-3 custom-form"
                  type="text"
                  ref={searchString}
                  placeholder="Cauta Articole"
                  autoComplete="off"
                />
                <Button
                  onClick={handleSearchString}
                  style={{ maxHeight: "38px" }}
                  variant="dark"
                  className="ml-2"
                >
                  Cauta
                </Button>
                {typeof state !== "undefined" &&
                typeof state.user_data !== "undefined" &&
                typeof state.user_data.login_msg !== "undefined" &&
                state.user_data.login_msg.success ? (
                  <>
                    <Button
                      style={{ maxHeight: "38px" }}
                      className="btn btn-light ml-2"
                      onClick={handleLogOut}
                    >
                      Logout
                    </Button>
                    <div
                      style={{
                        display: "inline-block",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: " center center",
                        backgroundSize: "cover",
                        backgroundImage: `url(${state.user_data.user_img_src})`,
                        backgroundColor: "#cccccc",
                        textAlign: "center",
                        lineHeight: "38px",
                        fontWeight: "bold",
                        color: "black",
                        fontSize: "1.3rem",
                        marginLeft: "10px",
                        textTransform: "uppercase"
                      }}
                    >
                      {state.user_data.first_name.substring(0, 1)}
                      {state.user_data.last_name.substring(0, 1)}
                    </div>
                  </>
                ) : (
                  <NavLink
                    style={{ maxHeight: "38px" }}
                    className="btn btn-light ml-2"
                    to="/Login"
                  >
                    Login
                  </NavLink>
                )}
              </Row>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </Container>
      {redirect ? (
        <Redirect
          to={{
            pathname: "/Articole",
            searchString: searchString.current.value
          }}
        />
      ) : null}
    </Wrapper>
  );
};

export default MenuBar;
