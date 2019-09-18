import React from "react";
import styled from "styled-components";

const CaroselImage = ({ imgArr }) => {
  const Wrapper = styled.div`
    width: 100%;
    .custom-carosel-img {
      background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url(${imgArr}) no-repeat;
      background-position: top;
      background-size: cover;
      width: 100%;
      height: 300px;
      // left: 50%;
      // top: 50%;
      //
    }
  `;
  return (
    <Wrapper>
      <div className="custom-carosel-img" />
    </Wrapper>
  );
};

export default CaroselImage;
