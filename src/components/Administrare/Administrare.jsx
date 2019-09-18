import React from "react";
import { Nav, Container, Row, Col, Tab } from "react-bootstrap";
import styled from "styled-components";
import AdaugaArticol from "./AdaugaArticol";
import StergeArticol from "./StergeArticol";

const Administrare = () => {
  const Wrapper = styled.div`
    padding: 1rem 0;
  `;
  return (
    <Wrapper>
      <Container fluid>
        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey="AdaugaArticol"
          styled
        >
          <Row className="d-flex flex-column">
            <Col>
              <Nav variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                  <Nav.Link eventKey="AdaugaArticol">Adauga Articol</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="StergeArticol">Sterge Articol</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col>
              <Tab.Content>
                <Tab.Pane eventKey="AdaugaArticol">
                  <AdaugaArticol />
                </Tab.Pane>
                <Tab.Pane eventKey="StergeArticol">
                  <StergeArticol />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </Wrapper>
  );
};

export default Administrare;
