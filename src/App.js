import React, { useContext, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Spinner, Container, Row, Col } from "react-bootstrap";
import MenuBar from "./components/MenuBar/MenuBar";
import Footer from "./components/Footer/Footer";
import styled from "styled-components";
import reducer from "./context/reducer";
import { Context, DispatchContext } from "./context/Context";
import thunk from "redux-thunk";
import useMiddleware from "react-usemiddleware";
const Home = React.lazy(() => import("./components/Home/Home"));
const Articole = React.lazy(() => import("./components/Articole/Articole"));
const Contact = React.lazy(() => import("./components/Contact/Contact"));
const Login = React.lazy(() => import("./components/Login/Login"));
const Administrare = React.lazy(() =>
  import("./components/Administrare/Administrare")
);

function Spin() {
  return (
    <Container>
      <Row>
        <Col
          style={{ height: "80vh" }}
          className="d-flex justify-content-center align-items-center"
        >
          <Spinner animation="border" variant="primary" />
        </Col>
      </Row>
    </Container>
  );
}

function ContextProvider(props) {
  const initState = useContext(Context);

  const [state, dispatch] = useMiddleware(reducer, initState, [thunk]);
  const fn = useCallback(() => {
    return (
      <Context.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          {props.children}
        </DispatchContext.Provider>
      </Context.Provider>
    );
  }, [state, dispatch, props.children]);

  return fn();
}

function App() {
  const Wrapper = styled.div`
    // border: 1px solid black;
    height: calc(100vh - 63.33px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & .main-content {
      width: 100%;
      align-self: flex-start;
    }
    & .footer-component {
      width: 100%;
      // border: 3px solid green;
    }
  `;

  return (
    <>
      <BrowserRouter>
        {/* <Redirect to="/Home" /> */}
        <Switch>
          <React.Suspense
            fallback={<Spinner animation="border" variant="primary" />}
          >
            <ContextProvider>
              <MenuBar />
              <Wrapper>
                <div className="main-content">
                  <React.Suspense fallback={<Spin />}>
                    <Route exact path="/" component={Home} />
                  </React.Suspense>
                  <React.Suspense fallback={<Spin />}>
                    <Route path="/Articole" component={Articole} />
                    <Route path="/Articol/:id" component={Articole} />
                  </React.Suspense>
                  <React.Suspense fallback={<Spin />}>
                    <Route path="/Contact" component={Contact} />
                  </React.Suspense>
                  <React.Suspense fallback={<Spin />}>
                    <Route path="/Login" component={Login} />
                  </React.Suspense>
                  <React.Suspense fallback={<Spin />}>
                    <Route path="/Admin" component={Administrare} />
                  </React.Suspense>
                </div>
                <div className="footer-component">
                  <Footer />
                </div>
              </Wrapper>
            </ContextProvider>
          </React.Suspense>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;

//
//   <Switch>
//     <React.Suspense
//       fallback={<Spinner animation="border" variant="primary" />}
//     >
//       <MenuBar />
//       {/* <Wrapper> */}
//       <div className="main-content">
//         <Route exact path="/" component={App} />
//         <Route path="/Home" component={Home} />
//         <Route path="/Articole" component={App} />
//         <Route path="/Contact" component={App} />
//       </div>
//       {/* <Footer className="footer-component" /> */}
//       {/* </Wrapper> */}
//     </React.Suspense>
//   </Switch>
// </BrowserRouter>
