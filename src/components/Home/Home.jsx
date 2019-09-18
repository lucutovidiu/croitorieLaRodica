import React from "react";
import CaroselComponent from "../Carosel/CaroselComponent";
import PostsComponent from "../Posts/PostsComponent";
import { Col, Row, Container } from "react-bootstrap";
import styled from "styled-components";

const Home = () => {
  const UltimeleAdaugari = styled.p`
    font-family: "Permanent Marker", cursive;
    font-size: 1.5rem;
  `;
  const DespreMine = styled.div`
    // font-family: "Gochi Hand", cursive;
    font-family: "Delius", cursive;
    font-size: 1.5rem;
    margin-top: 4rem;
  `;

  // console.log(data);
  return (
    <>
      <CaroselComponent />
      {/* <CaroselComponent loading={loading} data={data} /> */}

      <Container fluid style={{ backgroundColor: "#FBF2E9" }}>
        <Row>
          {/* LeftColumn */}
          <Col
            xs={{ span: 12, order: 2 }}
            sm={{ span: 12, order: 4 }}
            md={{ span: 9, order: 6 }}
            xl={{ span: 9, order: 8 }}
            style={{ position: "relative" }}
          >
            <DespreMine className="lead p-5">
              <h3>
                „Pentru ca acesta este stilul tau…”. De ce Atelier LaRodica?
              </h3>
              Pentru ca noi putem face totul dupa masura ta, dupa modelul pe
              care ti-l doresti, noi putem sa-ti oferim produsul la care visezi.
              LaRodica inseamna arta si dedicare pentru noi, cu siguranta si
              pentru tine acest nume va fi unul care o sa iti ofere experiente
              memorabile! Din dorinta de a-ti veni in ajutor atunci cand vrei sa
              porti haina pe care o visezi, ne-am gandit sa iti oferim solutiile
              noastre de croitorie. Prin experienta, profesionalism si
              capacitatea de a empatiza, echipa noastra se adapteaza
              personalitatii fiecarui client.
            </DespreMine>
          </Col>

          {/* Right Column */}
          <Col
            className="text-center mt-4 p-0"
            xs={{ span: 12, order: 1 }}
            sm={{ span: 12, order: 3 }}
            md={{ span: 12, order: 5 }}
            xl={{ span: 12, order: 7 }}
          >
            <UltimeleAdaugari className="text-uppercase">
              Ultimele Postari
            </UltimeleAdaugari>
            <PostsComponent className="m-0 p-0" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
