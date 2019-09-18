import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import sitedefaults from "../../siteDefaults/sitedefaults";

const Footer = () => {
  const FooterWrapper = styled.div`
    background-color: ${sitedefaults.Footer.footerBgColor};
    text-transform: uppercase;
    padding: 2rem 2rem;
    // margin: 1rem 0 0 0;
    text-align: left;
    & a,
    & a:visited,
    & a:active {
      text-decoration: none;
      padding: 0 1rem;
      font-weight: bold;
      color: ${sitedefaults.Footer.mainActiveLinkColor};
    }
    & a:hover {
      color: ${sitedefaults.Footer.mainVisitedLinkColor};
    }
    .title {
      font-size: 1rem;
      color: ${sitedefaults.Footer.footerHeadings};
    }
    & p {
      font-size: 0.7rem;
      font-weight: bold;
    }
    & .footer-copyright {
      font-size: 0.6rem;
    }
    @media all and (max-width: 768px) {
      & .footer-copyright {
        margin-top: 1rem;
      }
    }
    & list-unstyled {
    }
    & .fa-facebook-square {
      color: #2980b9;
    }
    & .fa-facebook-square:hover {
      color: #3498db;
    }
    & .fab-text {
      text-align: left;
      display: inline-block;
      font-size: 1rem;
      // position: absolute;
      // top: 0.25rem;
      text-transform: capitalize;
    }
  `;
  return (
    <>
      <FooterWrapper>
        <Container>
          <Row>
            <Col md="4" xs="12" sm="12">
              <h5 className="title">Croitorie La Rodica</h5>
              <p>Croitorie, Rochii, Fuste, Baticuri ...</p>
            </Col>
            <Col md="4" xs="12" sm="12" className="">
              {/* <h5 className="title">Ma puteti gasii si pe</h5> */}
              <a
                href="https://www.facebook.com/rodicalucut"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fab fa-facebook-square">
                  &nbsp;<span className="fab-text">Facebook</span>
                </i>
              </a>
            </Col>
          </Row>
        </Container>
        <Container className="">
          <div className="footer-copyright">
            <span>
              &copy; {new Date().getFullYear()} Copyright:
              <span href="#!">DesignLaRodica.com </span>
            </span>
          </div>
        </Container>
      </FooterWrapper>
    </>
  );
};

export default Footer;
