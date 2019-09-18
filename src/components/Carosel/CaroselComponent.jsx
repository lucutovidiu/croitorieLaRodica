import React, { useState, useContext, useEffect, useCallback } from "react";
import { Container, Row, Carousel, Col } from "react-bootstrap";
import styled from "styled-components";
import CaroselImage from "./CaroselImage";
import { Spinner } from "react-bootstrap";
import { Context, DispatchContext } from "../../context/Context";
import { GetHomeCaroselData } from "../../context/ActionFunctions";

function useFetch(context, dispatch) {
  // console.log(context);
  const [state, setState] = useState({
    loading: true,
    data: null,
    tries: 1
  });

  const fn = useCallback(() => {
    if (
      typeof context !== "undefined" &&
      typeof context.HomeCarosel !== "undefined" &&
      typeof context.HomeCarosel.caroselData === "undefined"
    ) {
      setState({ loading: true, data: null, tries: state.tries + 1 });
      if (context.HomeCarosel.requestedData === false) {
        dispatch(GetHomeCaroselData());
      }
    } else {
      // console.log("here im rendering");
      // console.log("usestate =", state);
      if (state.data === null)
        setState({
          loading: false,
          data: context.HomeCarosel.caroselData,
          tries: state.tries
        });
    }
  }, [context, dispatch, state]);

  useEffect(() => {
    fn();
  });

  return state;
}

const CaroselComponent = props => {
  const state = useContext(Context);
  const dispatch = useContext(DispatchContext);
  const { loading, data, tries } = useFetch(state, dispatch);
  // console.log(loading, "-", data, "-", tries, "-rd", state.HomeCarosel);
  const [index, setIndex] = useState(0);
  const [direction, setDrection] = useState(0);

  const Wrapper = styled.div`
    padding: 0;
    box-shadow: 0px 2px 5px #888888;
    & .custom-height {
      width: 100%;
      height: 300px;
    }
  `;

  function handleSelect(selectedIndex, e) {
    setIndex(selectedIndex);
    setDrection(e.direction);
  }
  // console.log("state....", state.HomeCarosel.caroselData);
  try {
    return (
        <Container fluid className="">
          <Row>
            <Col className="p-0">
              <Wrapper>
                <Carousel
                    activeIndex={index}
                    direction={direction}
                    onSelect={handleSelect}
                >
                  {loading ? (
                      tries < 150 ? (
                          <Col
                              style={{ height: "300px" }}
                              className="d-flex justify-content-center align-items-center"
                          >
                            <Spinner animation="border" variant="primary" />
                          </Col>
                      ) : (
                          <Col
                              style={{ height: "300px" }}
                              className="d-flex justify-content-center align-items-center"
                          >
                            <p className="lead">Server Loading Problem ...</p>
                          </Col>
                      )
                  ) : (
                      data.map(item => (
                          <Carousel.Item key={item._id}>
                            <CaroselImage imgArr={item.src} />
                            <Carousel.Caption>
                              <h3>{item.title}</h3>
                              <p>{item.description}</p>
                            </Carousel.Caption>
                          </Carousel.Item>
                      ))
                  )}
                </Carousel>
              </Wrapper>
            </Col>
          </Row>
        </Container>
    );
  } catch {
    return (
      <Container fluid className="">
        <Row>
          <Col className="p-0">
            <Wrapper />
          </Col>
        </Row>
      </Container>
    );
  }
};

export default CaroselComponent;
