import React, { useState } from "react";
import styled from "styled-components";
import ModalComponent from "../Posts/ModalComponent";
import { Card } from "react-bootstrap";

const DisplayArticole = ({ props, state }) => {
  // console.log(state.selectedActiveModalPost);
  // console.log(props._id);

  const [shoModal, setShowModal] = useState(
    state.selectedActiveModalPost._id !== null &&
      state.selectedActiveModalPost._id === props._id
      ? true
      : false
  );

  const Wrapper = styled.div`
    padding-bottom: 1rem;
    // box-shadow: 0px 1px 1px #888888;
    .container-custom {
      display: flex;
      flex-wrap: wrap;
      // height: 100%;
    }
    //shopping cart
    .custom-price {
      font-weight: bold;
      font-size: 0.8rem;
    }
    .stok-cart-container {
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
    //shipping cart end
    .card-custom {
      width: 13rem;
      height: 410px;
      box-shadow: 1px 1px 6px #888888;
      @media all and (max-width: 571px) {
        width: 20rem;
      }
    }
    .image-height {
      height: 70%;
    }
  `;

  const {
    article_img_src,
    article_tile,
    article_description
    // user_img,
    // user_name,
    // date_posted
  } = props.posted_article;
  return (
    <Wrapper>
      <div className="pt-3 m-0 p-0 container-custom">
        <Card className="card-custom">
          <div
            onClick={() => {
              setShowModal(true);
            }}
            style={{
              backgroundImage: `url(${article_img_src})`,
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat"
            }}
            className="image-height image-custom"
          />
          <Card.Body className="flex-grow-1 align-self-center">
            <Card.Title
              style={{ fontSize: "1rem", textTransform: "uppercase" }}
            >
              <div className="">{article_tile}</div>
              <span className="small">{article_description}</span>
            </Card.Title>
            {/* <Card.Text style={{ textTransform: "" }}>
              
            </Card.Text> */}
            <div className="stok-cart-container">
              <div className="price-stock-container">
                <div className="custom-price">
                  Pret: {props.posted_article.price} lei
                </div>
                <div className="custom-stock">
                  Stock ramas: {props.posted_article.quantity_left_on_stock}{" "}
                  {props.posted_article.pret_unitate_masura.unitate_masura}
                </div>
              </div>
              <div className="cart ">
                <i className="fas fa-cart-arrow-down" />
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
      {shoModal && (
        <ModalComponent
          isShown={shoModal}
          setIsShown={setShowModal}
          state={state}
          props={props}
          comesfrom="/Articole"
        />
      )}
    </Wrapper>
  );
};

export default DisplayArticole;
