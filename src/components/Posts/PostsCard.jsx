import React, { useState } from "react";
import styled from "styled-components";
import ModalComponent from "./ModalComponent";
import moment from "moment";
// import { Button, Badge } from "react-bootstrap";

const PostsCard = props => {
  // console.log(props);
  const [shoModal, setShowModal] = useState(
    props.state.selectedActiveModalPost._id !== null &&
      props.state.selectedActiveModalPost._id === props.props._id
      ? true
      : false
  );
  const { article_img_src, article_description } = props.props.posted_article;
  const { user_img_src } = props.props.post_user_name;
  const fullName =
    props.props.post_user_name.first_name +
    " " +
    props.props.post_user_name.last_name;
  const post_date = moment(props.props.post_date).format("DD-MM-YYYY HH:mm:ss");
  // console.log(props.props);

  const Wrapper = styled.div`
    margin-bottom: 1rem;
    padding: 0;
    width: 100%;
    max-width: 430px;
    max-height: auto;
    border: 0.5px solid #bdc3c7;
    border-radius: 3px;
    box-shadow: 1px 1px 6px #888888;
    background-color: #fbf2e9;

    .header {
      display: block;
      text-transform: capitalize;
      & .header-img {
        padding: 1rem;
        float: left;
      }
      .user-img {
        display: inline-block;
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .post-date {
        font-size: 0.6rem;
        color: gray;
        font-weight: bold;
      }
      & .header-details {
        float: left;
        padding: 1.3rem 0;
        text-align: left;
        h6 {
          margin: 0;
        }
      }
    }

    .title {
      clear: both;
      display: block;
      text-transform: uppercase;
      font-size: 1.1rem;
      text-align: center;
      padding-bottom: 0.5rem;
    }

    .body {
      padding: 0;
      margin: 0;
      text-align: center;

      .post-img {
        display: inline-block;
        width: 99%;
        max-height: 430px;
        // box-shadow: 1px 3px 4px black;
        object-fit: cover;
      }
      .post-description {
        clear: left;
        // float: left;
        text-transform: uppercase;
        text-align: center;
        font-size: 0.8rem;
        padding: 1rem 0 0 0rem;
        a {
          text-decoration: none;
          color: gray;
        }
      }
    }

    .body-separator {
      width: 80%;
      text-align: center;
      .body-separator-line {
        position: relative;
        left: 10%;
      }
    }

    .footer {
      padding: 0.8rem;

      .user-comment-img {
        margin-top: -0.3rem;
        float: left;
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }

      .footer-wrapper {
        float: left;
        display: inline-block;
        position: relative;
        margin-top: -0.5rem;
        input {
          width: 190px;
          background-color: inherit;
        }
        .user-comment-input-field {
          margin: 0rem 0.6rem 0rem 0.9rem;
        }
        .user-comment-button {
          display: inline-block;
          position: absolute;
          top: 0.3rem;
          background-color: #3498db;
          border-radius: 3px;
          padding: 0.1rem 0.5rem;
          border: 0;
          //   margin-top: 0.5rem;
          // float: left;
        }
      }
    }
    //shopping cart
    .custom-price {
      font-weight: bold;
      font-size: 0.8rem;
    }
    .stok-cart-container {
      margin: 0 auto;
      padding: 1.5rem 0 0 0;
      display: flex;
      width: 150px;
      justify-content: space-between;
    }
    .cart {
      font-size: 1.6rem;
      margin-top: -0.4rem;
      color: #1abc9c;
    }
    .custom-stock {
      font-weight: bold;
      font-size: 0.6rem;
      color: gray;
    }
    // --- shopping cart end
    .clear-fix {
      clear: both;
      display: table;
    }
  `;
  try {
    return (
      <>
        <Wrapper>
          <div className="header">
            <div className="header-img">
              <img className="user-img" src={user_img_src} alt="user" />
            </div>
            <div className="header-details">
              <h6>{fullName}</h6>
              <span className="post-date">Postat {post_date}</span>
            </div>
          </div>

          <div className="title">
            <h6>{article_description}</h6>
          </div>

          <div className="body">
            <img
              onClick={() => {
                setShowModal(true);
              }}
              className="post-img"
              src={article_img_src}
              alt="body-img"
            />
            <div className="post-description">
              {typeof props.state.user_data !== "undefined" &&
                Object.entries(props.state.user_data).length !== 0 &&
                props.state.user_data.constructor === Object && (
                  <span
                    style={{
                      backgroundColor: "#bdc3c7",
                      padding: ".5rem"
                    }}
                  >
                    Liked {props.props.likes}{" "}
                    {props.props.likes > 1 ? "TIMES" : "TIME"}
                    <span className="sr-only">Liked {props.props.likes}</span>
                  </span>
                )}
              <a className="ml-3" href="#!">
                <i className="fas fa-share" /> &nbsp;Distribuie
              </a>
            </div>
            <div className="stok-cart-container">
              <div className="price-stock-container">
                <div className="custom-price">
                  Pret: {props.props.posted_article.price} lei
                </div>
                <div className="custom-stock">
                  Stock ramas:{" "}
                  {props.props.posted_article.quantity_left_on_stock}{" "}
                  {
                    props.props.posted_article.pret_unitate_masura
                      .unitate_masura
                  }
                </div>
              </div>
              <div className="cart ">
                <i className="fas fa-cart-arrow-down" />
              </div>
            </div>
          </div>
          <div className="body-separator">
            <hr className="body-separator-line" />
          </div>
          {typeof props.state.user_data !== "undefined" &&
            Object.entries(props.state.user_data).length !== 0 &&
            props.state.user_data.constructor === Object && (
              <div className="footer">
                <div>
                  <img
                    className="user-comment-img"
                    src={props.state.user_data.user_img_src}
                    alt="user"
                  />
                </div>
                <div className="footer-wrapper">
                  <input
                    className="user-comment-input-field"
                    type="text"
                    placeholder="Scrie un comentariu..."
                  />
                  <button className="user-comment-button">
                    <i className="fas fa-paper-plane" />
                  </button>
                </div>
                <div className="clear-fix" />
              </div>
            )}
          {shoModal && (
            <ModalComponent
              isShown={shoModal}
              setIsShown={setShowModal}
              props={props.props}
              state={props.state}
              comesfrom="/"
            />
          )}
        </Wrapper>
      </>
    );
  } catch(err) {
    console.log(err)
  }
};

export default PostsCard;
