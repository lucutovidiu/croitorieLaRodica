import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Col, Container, Row } from "react-bootstrap";
import PostsCard from "./PostsCard";
import { Spinner } from "react-bootstrap";
import { Context, DispatchContext } from "../../context/Context";
import { GetPostsData } from "../../context/ActionFunctions";
// import { imgArr } from "../../DummyData";

const PostsComponent = () => {
  const state = useContext(Context);
  const dispatch = useContext(DispatchContext);
  useEffect(() => {
    if (typeof state.Posts !== "undefined" && !state.Posts.requestedData){
      dispatch(GetPostsData({ count: 10, allPosts: false }));
    }
  }, [dispatch, state]);
  const Wrapper = styled.div`
    width: 100%;
  `;
  return (
    <Wrapper>
      <Container className="d-flex justify-content-center">
        <Row>
          <Col>
            {typeof state !== "undefined" &&
            typeof state.Posts !== "undefined" &&
            state.Posts.loading ? (
              <Col
                style={{ height: "300px" }}
                className="d-flex justify-content-center align-items-center"
              >
                <Spinner animation="border" variant="primary" />
              </Col>
            ) : (
              typeof state.Posts !== "undefined" && typeof state.Posts.postsData !== "undefined" &&
              state.Posts.postsData.map((item, index) => (
                <PostsCard key={index} state={state} props={item} />
              ))
            )}
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default PostsComponent;
