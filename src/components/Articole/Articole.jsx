import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import DisplayArticole from "./DisplayArticole";
import { Context, DispatchContext } from "../../context/Context";
import { GetPostsData } from "../../context/ActionFunctions";

function useFetch(context, dispatch) {
  // console.log("context =", context);
  const [state, setState] = useState({
    loading: true,
    data: null,
    tries: 1,
    refetchData: false
  });
  // console.log(context);

  useEffect(() => {
    // console.log("useEffect");
    if (
      typeof context !== "undefined" &&
      typeof context.Posts !== "undefined" &&
      typeof context.Posts.postsData === "undefined"
    ) {
      if (!context.Posts.requestedData) {
        // console.log("fetch " + context.Posts.requestedData);
        setState({
          loading: true,
          data: null,
          tries: state.tries + 1,
          refetchData: true
        });
        dispatch(GetPostsData({ count: 0, allPosts: true }));
      }
    } else {
      if (context.Posts.postsData.length <= 10 && state.refetchData === false) {
        // console.log("refectahcand" + state.refetchData);
        dispatch(GetPostsData({ count: 0, allPosts: true }));
        setState({
          loading: true,
          data: null,
          tries: state.tries + 1,
          refetchData: true
        });
      } else {
        setState({
          loading: false,
          postsData: context.Posts.postsData,
          tries: 0,
          refetchData: true
        });
      }
    }
    return () => {
      // console.log("unmountes");
    };
  }, [
    context.Posts.postsData,
    state.refetchData,
    dispatch,
    state.tries,
    context
  ]);

  return state;
}

const Articole = props => {
  const state = useContext(Context);
  const dispatch = useContext(DispatchContext);
  const { loading, postsData } = useFetch(state, dispatch);
  // console.log(loading, "-", postsData, "-", tries);
  const Wrapper = styled.div`
    background-color: #fbf2e9;
  `;
  const [posts, setPosts] = useState(null);
  const [postsCategories, setPostsCategories] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("default");
  const [propsLocation, setPropsLocation] = useState({
    searchString: "",
    resolved: false
  });
  const searchString = useRef("");

  useEffect(() => {
    if (
      !propsLocation.resolved ||
      propsLocation.searchString !== props.location.searchString
    )
      if (typeof props.location.searchString !== "undefined") {
        if (!loading) {
          const searchText = props.location.searchString.toUpperCase();
          const post = postsData.filter(post => {
            return (
              String(post.posted_article.article_description)
                .toUpperCase()
                .includes(searchText) ||
              String(post.posted_article.article_tile)
                .toUpperCase()
                .includes(searchText)
            );
          });
          // console.log(post);
          let newArr = [];
          postsData.forEach(categ => {
            if (
              !newArr.includes(categ.posted_article.cathegory.category_name)
            ) {
              newArr.push(categ.posted_article.cathegory.category_name);
            }
          });
          setPropsLocation({
            searchString: props.location.searchString,
            resolved: true
          });
          setPosts(post);
          setPostsCategories(newArr);
          // setSelectedCategory("default");
        }
      } else {
        if (posts === null) {
          if (!loading) {
            // console.log("posts");
            let newArr = [];
            postsData.forEach(categ => {
              if (
                !newArr.includes(categ.posted_article.cathegory.category_name)
              ) {
                newArr.push(categ.posted_article.cathegory.category_name);
              }
            });
            setPostsCategories(newArr);
            setPosts(postsData);
          }
        }
      }
  }, [loading, props.location, propsLocation, posts, postsData]);

  function handleSearchString(e) {
    e.preventDefault();
    let searchText = searchString.current.value.toUpperCase();
    // console.log(posts.posted_article.article_description);
    // console.log(posts.posted_article.title);
    if (!loading) {
      const post = postsData.filter(post => {
        return (
          String(post.posted_article.article_description)
            .toUpperCase()
            .includes(searchText) ||
          String(post.posted_article.article_tile)
            .toUpperCase()
            .includes(searchText)
        );
      });
      let newArr = [];
      postsData.forEach(categ => {
        if (!newArr.includes(categ.posted_article.cathegory.category_name)) {
          newArr.push(categ.posted_article.cathegory.category_name);
        }
      });
      setPostsCategories(newArr);
      setSelectedCategory("default");
      setPosts(() => {
        return post;
      });
    }
  }
  function onChangeCathegory(e) {
    // console.log(e.target.value);
    if (e.target.value === "default") {
      console.log("default");
      setPosts(postsData);
      setSelectedCategory("e.target.value");
      // props.history.push("/Articole");
    } else {
      const post = postsData.filter(
        post => post.posted_article.cathegory.category_name === e.target.value
      );
      setPosts(() => {
        return post;
      });
      // console.log(e.target.value);
      setSelectedCategory(e.target.value);
    }
  }
  // typeof posts !== "undefined" && console.log(posts);
  return (
    <>
      {/* {typeof props.match.params.id !== "undefined" ? (
        imgArr.filter(pic => pic.id === parseInt(props.match.params.id))
      ) : ( */}
      <Wrapper>
        <Container className="pt-3">
          <Form onSubmit={handleSearchString} className="w-100">
            <Row className="d-flex justify-content-center">
              <Col sm={5} xs={8} md={4} lg={4}>
                <div className="input-group mb-3">
                  <select
                    className="custom-select"
                    value={selectedCategory}
                    onChange={onChangeCathegory}
                  >
                    <option value="default">Alege Categoria</option>
                    {!loading &&
                      postsCategories !== "default" &&
                      postsCategories.map((categ, key) => {
                        return (
                          <option key={key} value={categ}>
                            {categ}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </Col>
              <Col
                xs={8}
                sm={5}
                md={4}
                lg={4}
                className="d-flex justify-content-start"
              >
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Control
                    ref={searchString}
                    type="text"
                    placeholder="Cauta Articol ..."
                    autoComplete="off"
                  />
                </Form.Group>
                <Button
                  style={{ height: "38px", marginLeft: "0.6rem" }}
                  type="submit"
                >
                  Cauta
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
        <Container>
          <Row>
            <Col className="d-flex flex-wrap justify-content-around">
              {posts !== null &&
              typeof props.match.params.id !== "undefined" ? (
                posts
                  .filter(post => {
                    // console.log(post._id, "-", props.match.params.id);
                    // console.log(post._id === props.match.params.id);
                    return post._id === props.match.params.id;
                  })
                  .map((item, key) => {
                    // console.log(item);
                    props.match.params.id = undefined;
                    //window.history.pushState("", "", `/Articole`);
                    return (
                      <DisplayArticole key={key} state={state} props={item} />
                    );
                  })
              ) : !loading && posts !== null ? (
                posts.map((item, key) => (
                  <DisplayArticole
                    key={key}
                    state={state}
                    props={item}
                    dispatch={dispatch}
                  />
                ))
              ) : (
                <Spinner animation="border" variant="primary" />
              )}
            </Col>
          </Row>
        </Container>
      </Wrapper>
    </>
  );
};

export default Articole;

// if (pictureCathegory !== "default") {
//   const catPic = imgArr.filter(pic => pic.cathegory === pictureCathegory);
//   const newSearch = catPic.filter(
//     pic =>
//       pic.title
//         .toUpperCase()
//         .includes(searchString.current.value.trim().toUpperCase()) ||
//       pic.description
//         .toUpperCase()
//         .includes(searchString.current.value.trim().toUpperCase())
//   );
//   setPictures(newSearch);
//   searchString.current.focus();
// } else {
//   if (searchString.current.value.trim() === "") {
//     setPictures(imgArr);
//     searchString.current.focus();
//   } else {
//     const newSearch = imgArr.filter(
//       pic =>
//         pic.title
//           .toUpperCase()
//           .includes(searchString.current.value.trim().toUpperCase()) ||
//         pic.description
//           .toUpperCase()
//           .includes(searchString.current.value.trim().toUpperCase())
//     );
//     setPictures(newSearch);
//     searchString.current.focus();
//   }
// }

// if (typeof state.Posts === "undefined") {
//   console.log("no posts");
//   dispatch(GetPostsData({ count: 0, allPosts: true }));
// } else if (typeof state.Posts.postsData === "undefined") {
//   if (!state.Posts.requestedData) {
//     dispatch(GetPostsData({ count: 0, allPosts: true }));
//   }
// } else if (
//   !state.Posts.requestedData ||
//   state.Posts.postsRequestedCount === -1 ||
//   state.Posts.postsRequestedCount === 10
// ) {
//   console.log("aici prima data", state.Posts);
//   dispatch(GetPostsData({ count: 0, allPosts: true }));
// } else {
//   let newArr = [];
//   state.Posts.postsData.forEach(categ => {
//     if (!newArr.includes(categ.posted_article.cathegory.category_name)) {
//       newArr.push(categ.posted_article.cathegory.category_name);
//     }
//   });
//   setPostsCategories(newArr);
//   setPosts(state.Posts.postsData);
//   if (typeof props.location.searchString !== "undefined") {
//     const { searchString } = props.location;
//     // console.log(searchString);
//     if (searchString.trim() === "") {
//       setPosts(state.Posts.postsData);
//     } else {
//       // const newSearch = imgArr.filter(
//       //   pic =>
//       //     pic.title
//       //       .toUpperCase()
//       //       .includes(searchString.trim().toUpperCase()) ||
//       //     pic.description
//       //       .toUpperCase()
//       //       .includes(searchString.trim().toUpperCase())
//       // );
//       // setPosts(newSearch);
//     }
//   }
// }
// return () => {};
