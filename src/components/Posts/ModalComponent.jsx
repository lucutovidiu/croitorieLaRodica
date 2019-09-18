import React, { useEffect, useContext, useState, useRef } from "react";
import { Modal, Button, Row, Col, Badge, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import LeftComments from "./LeftComments";
import moment from "moment";
import { Context, DispatchContext } from "../../context/Context";
import { uri } from "../../context/ActionFunctions";
import FetchData from "../../context/FetchData";

const LikeAPost = likeObj =>
  new Promise(resolve => {
    FetchData(
      {
        action: "LikeAPost",
        payload: {
          likeObj
        }
      },
      uri
    ).then(data => {
      resolve(data);
    });
  });

const ModalComponent = props => {
  const state = useContext(Context);
  const dispatch = useContext(DispatchContext);
  // console.log("stateof modal ", props);
  const commentTextField = useRef("");
  const [liksDataToSendToStore, setLiksDataToSendToStore] = useState({
    anyLikesData: false,
    likeData: {
      payload: { likes: props.props.likes }
    }
  });
  const [commentsDataToSendToStore, setCommentsDataToSendToStore] = useState({
    anyComments: false,
    commentsData: props.state.comments.commentsData
  });
  const { setIsShown, isShown } = props;
  const _id = props.props._id;
  // console.log(dataToSendToStore.commentsData);
  // console.log(props.state.user_data._id);
  const {
    article_tile,
    article_img_src,
    article_description
  } = props.props.posted_article;
  const { user_img_src } = props.props.post_user_name;
  const fullName =
    props.props.post_user_name.first_name +
    " " +
    props.props.post_user_name.last_name;
  const post_date = moment(props.props.post_date).format("DD-MM-YYYY HH:mm:ss");
  // console.log(state);

  useEffect(() => {
    window.history.pushState("", "", `/Articol/${_id}`);
    if (
      commentsDataToSendToStore.anyComments &&
      liksDataToSendToStore.anyLikesData
    ) {
      let allposts = state.Posts.postsData.filter(
        post => post._id !== liksDataToSendToStore.likeData.payload._id
      );
      let PostObj = {
        ...state.Posts,
        postsData: [...allposts, liksDataToSendToStore.likeData.payload]
      };
      let newState = {
        ...state,
        Posts: { ...PostObj },
        comments: { commentsData: commentsDataToSendToStore.commentsData },
        selectedActiveModalPost: { _id: _id }
      };
      // console.log(newState);
      dispatch({
        action: "LikeAndCommentUpdate",
        payload: newState
      });
    } else if (commentsDataToSendToStore.anyComments) {
      // console.log("dataToSendToStore Comm");
      let newState = {
        ...state,
        comments: { commentsData: commentsDataToSendToStore.commentsData },
        selectedActiveModalPost: { _id: _id }
      };
      // console.log(newState);
      dispatch({
        action: "LikeAndCommentUpdate",
        payload: newState
      });
    } else if (liksDataToSendToStore.anyLikesData) {
      ////////////////////////////////////////////////////////////
      let allposts = state.Posts.postsData.filter(
        post => post._id !== liksDataToSendToStore.likeData.payload._id
      );
      let PostObj = {
        ...state.Posts,
        postsData: [...allposts, liksDataToSendToStore.likeData.payload]
      };
      let newState = {
        ...state,
        Posts: { ...PostObj },
        selectedActiveModalPost: { _id: _id }
      };
      // console.log(newState);
      dispatch({
        action: "LikeAndCommentUpdate",
        payload: newState
      });
    }
    return () => {
      ///////////////////////////////////////////////////
      window.history.pushState("", "", `${props.comesfrom}`);
      // console.log("dataToSendToStore ", commentsDataToSendToStore);

      //
    };
  }, [
    liksDataToSendToStore,
    commentsDataToSendToStore,
    commentsDataToSendToStore.commentsData,
    dispatch,
    state,
    liksDataToSendToStore.likeData.payload,
    _id,
    props.comesfrom
  ]);

  // useEffect(() => {
  //   return () => {
  //     console.log("unmounted post" + _id);
  //     dispatch({
  //       action: "CloseSelectedActivePost"
  //     });
  //   };
  // }, []);

  function handleCommentBtn(e) {
    e.preventDefault();
    if (String(commentTextField.current.value).trim() !== "") {
      // WriteACommentToCurrentPost
      const currentPost = {
        post_id: props.props._id,
        user_id: props.state.user_data._id,
        comment_text: String(commentTextField.current.value).trim()
      };
      FetchData(
        {
          action: "WriteACommentToCurrentPost",
          payload: {
            ...currentPost
          }
        },
        uri
      ).then(data => {
        setCommentsDataToSendToStore({
          ...commentsDataToSendToStore,
          anyComments: true,
          commentsData: [
            ...commentsDataToSendToStore.commentsData,
            data.payload
          ]
        });
        // console.log(data);
      });
      // console.log("comment text : ", currentPost);
    }
  }

  function handleLikeBtn(e) {
    e.preventDefault();
    let currentUser = props.state.user_data._id;
    let did_user_already_liked_this = props.props.users_who_liked_this_post.find(
      i => i._id === currentUser
    );
    // console.log(did_user_already_liked_this);
    if (typeof did_user_already_liked_this === "undefined")
      if (!liksDataToSendToStore.anyLikesData) {
        let userWhoClicked = props.state.user_data._id;
        let thisPostId = props.props._id;
        let likeObj = {
          post_id: thisPostId,
          users_who_liked_this_post: userWhoClicked
        };
        LikeAPost(likeObj).then(d => {
          // console.log(d);
          if (d.payload !== null)
            setLiksDataToSendToStore({
              ...liksDataToSendToStore,
              anyLikesData: true,
              likeData: { payload: d.payload }
            });
        });
      } else {
        // console.log(props.props);
      }
  }
  const Distribuie = styled.div`
    text-transform: uppercase;
    text-align: center;
    font-size: 0.8rem;
    padding: 1rem 0 0 0rem;
    a {
      text-decoration: none;
      color: gray;
    }
  `;
  const WrapperModal = styled.div`
    .user-img {
      display: inline-block;
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .margin-auto {
      margin: 0 auto;
    }
    .clear-fix {
      display: table;
      clear: both;
    }
  `;
  const BackgroundImage = styled.div`
    // border: 3px solid green;

    display: inline-block;
    // background-position: top center;
    // width: 100%;
    // min-height: 140vh;
    // @media all and (min-width: 1200px) {
    //   background-size: 85%;
    // }
    // @media all and (min-width: 991px) and (max-width: 1200px) {
    //   background-size: 55%;
    // }
    // @media all and (min-width: 576px) and (max-width: 991px) {
    //   background-size: 90%;
    // }
    // @media all and (min-width: 501px) and (max-width: 576px) {
    //   background-size: 90%;
    // }
    // @media all and (max-width: 501px) {
    //   background-size: cover;
    // }
    img {
      width: 100%;
      max-width: 400px;
      height: auto;
      object-position: 80% 50%;
      @media all and (min-width: 1200px) {
        height: 85%;
        object-position: 80% 50%;
        object-fit: cover;
      }
      @media all and (min-width: 991px) and (max-width: 1200px) {
        height: 500px;
        object-position: 80% 50%;
        object-fit: cover;
      }
      @media all and (min-width: 576px) and (max-width: 991px) {
        height: 400px;
        object-position: 80% 40%;
        object-fit: cover;
      }
      @media all and (min-width: 501px) and (max-width: 576px) {
        height: 500px;
        object-position: 80% 50%;
        object-fit: cover;
      }
      @media all and (max-width: 501px) {
        height: 450px;
        object-fit: cover;
        object-position: 50% 60%;
      }
    }
  `;
  const FirstImageSize = styled.div`
    @media all and (max-width: 1200px) {
      height: 65vh;
    }
  `;

  const UserImg = {
    display: "inline-block",
    width: "50px",
    height: "50px",
    borderRadius: "50%"
  };
  const UserImgForComment = {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    float: "left"
  };

  const CommentInputBox = styled.div`
    & .user-comment-input-field {
      padding: 0 0 0.5rem 0;
      border: none;
      outline: none;
      border-bottom: 2px solid #2980b9;
    }
    @media all and (max-width: 351px) {
      & .user-comment-input-field {
        padding: 0 0 0.5rem 0;
        border: none;
        outline: none;
        border-bottom: 2px solid #2980b9;
        width: 150px;
      }
      & .user-comment-input-field::placeholder {
        font-size: 0.65rem;
      }
    }
  `;

  return (
    <WrapperModal>
      <Modal
        className="mt-sm-n3"
        show={isShown}
        onHide={() => {
          setIsShown(!isShown);
        }}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Row
          noGutters
          style={{
            minHeight: "100vh",
            backgroundColor: "#353b48",
            border: "2px solid #353b48",
            display: "flex"
          }}
        >
          {/* left col */}
          <Col
            md="12"
            xl="8"
            className="d-flex flex-column"
            style={{ textAlign: "center" }}
          >
            {/* Background image Big Image */}
            <FirstImageSize>
              <BackgroundImage>
                <picture>
                  <img srcSet={article_img_src} alt="poze articole" />
                </picture>
              </BackgroundImage>
            </FirstImageSize>
          </Col>
          {/* right col */}
          <Col
            md="12"
            xl="4"
            style={{
              backgroundColor: "white",
              padding: "1rem",
              position: "relative"
            }}
          >
            <Button
              style={{
                display: "inline-block",
                position: "absolute",
                right: "0.3rem",
                top: "0.3rem"
              }}
              onClick={() => {
                setIsShown(false);
              }}
            >
              X
            </Button>

            <Row
              className="p-3 align-items-center text-center"
              style={{
                height: "100%",
                display: "block"
              }}
            >
              <Col className="p-0 " style={{ position: "relative" }}>
                <div style={{ position: "relative", float: "left" }}>
                  <img style={UserImg} src={user_img_src} alt="user" />
                </div>
                <div
                  className="pl-3"
                  style={{ position: "relative", float: "left" }}
                >
                  <div className="h6 p-0 m-0">{fullName}</div>
                  <span
                    className="p-0 m-0"
                    style={{
                      fontSize: "0.7rem",
                      color: "gray"
                    }}
                  >
                    {post_date}
                  </span>
                </div>
              </Col>
              <Col
                className="m-0 p-0"
                style={{
                  display: "table",
                  clear: "both"
                }}
              >
                {typeof props.state.user_data !== "undefined" &&
                  Object.entries(props.state.user_data).length !== 0 &&
                  props.state.user_data.constructor === Object && (
                    <Distribuie>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={handleLikeBtn}
                      >
                        Like{" "}
                        <Badge variant="light">
                          {" "}
                          <i className="far fa-thumbs-up" />
                          {liksDataToSendToStore.likeData.payload.likes}
                        </Badge>
                        <span className="sr-only">Like</span>
                      </Button>
                    </Distribuie>
                  )}
              </Col>
              <Container>
                <Row>
                  <Col>
                    <div className="text-center">
                      <h6 className="ml-2 mt-3 text-uppercase d-block margin-auto">
                        <center>{article_tile}</center>
                        <small>
                          <center>{article_description}</center>
                        </small>
                      </h6>
                    </div>
                  </Col>
                </Row>
              </Container>

              <div
                style={{
                  display: "block"
                }}
              >
                {typeof props.state.user_data !== "undefined" &&
                  Object.entries(props.state.user_data).length !== 0 &&
                  props.state.user_data.constructor === Object && (
                    <div
                      className=""
                      style={{
                        textAlign: "center",
                        display: "block"
                      }}
                    >
                      <div
                        className="mt-3"
                        style={{
                          display: "inline-block",
                          width: "270px"
                        }}
                      >
                        <img
                          className="user-comment-img img-fluid mt-1"
                          src={props.state.user_data.user_img_src}
                          alt="user"
                          style={UserImgForComment}
                        />

                        <div>
                          <CommentInputBox style={{ float: "left" }}>
                            <input
                              className="user-comment-input-field ml-3"
                              type="text"
                              placeholder="Scrie un comentariu..."
                              ref={commentTextField}
                            />
                          </CommentInputBox>

                          <Button
                            style={{ float: "left" }}
                            variant="outline-primary"
                            className="ml-1"
                            size="sm"
                            onClick={handleCommentBtn}
                          >
                            <i className="fas fa-paper-plane" />
                          </Button>
                        </div>
                        <div style={{ display: "table", clear: "both" }} />
                      </div>
                    </div>
                  )}
                <div
                  style={{
                    textAlign: "center"
                  }}
                >
                  {typeof props.state !== "undefined" &&
                    typeof commentsDataToSendToStore.commentsData !==
                      "undefined" &&
                    commentsDataToSendToStore.commentsData
                      .filter(i => {
                        if (i.post_id == null) console.log(i);
                        return i.post_id !== null;
                      })
                      .filter(t => {
                        // console.log(t);
                        return t.post_id._id === _id;
                      })
                      .map((img_src, key) => {
                        if (img_src.post_id == null) console.log(img_src);
                        return (
                          <div key={key}>
                            <LeftComments img_src={img_src} />
                          </div>
                        );
                      })}
                </div>
              </div>
            </Row>
          </Col>
        </Row>
        {/* </Container> */}
        {/* </Modal.Body> */}
      </Modal>
    </WrapperModal>
  );
};

export default withRouter(ModalComponent);
