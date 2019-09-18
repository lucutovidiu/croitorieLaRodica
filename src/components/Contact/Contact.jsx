import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import FetchData from "../../context/FetchData";
import { uri } from "../../context/ActionFunctions";

const SendAnEmail = payload =>
  new Promise(resolve => {
    FetchData(
      {
        action: "sendMail",
        payload
      },
      uri
    ).then(data => {
      resolve(data);
    });
  });

const Contact = ({ img_src }) => {
  const name = React.useRef(null);
  const email = React.useRef(null);
  const subject = React.useRef(null);
  const mainMsg = React.useRef(null);
  const [loadingSendBtn, setLoadingSendBtn] = React.useState(false);

  const Wrapper = styled.div`
    height: 80vh;
    .custom-width {
      width: 90%;
    }
    @media all and (min-width: 571px) {
      .custom-width {
        width: 60%;
      }
    }
    // background-color: #f0ebd5;
    background-color: #fbf2e9;
    .contactTitle {
      color: white;
      font-family: "Delius", cursive;
    }
    .form-row-custom {
      border-radius: 10px;
      height: 100%;
      background-color: #6db3f2;
      background: linear-gradient(
          rgba(0, 0, 0, 0.5) 50%,
          rgba(0, 0, 0, 0.7) 100%
        ),
        url(img/form-img/4.jpg);
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
    input,
    textarea {
      border-radius: 10px;
      background-color: #ecf0f1;
      font-family: "Delius", cursive;
    }
    input::placeholder,
    textarea::placeholder {
      font-family: "Delius", cursive;
    }
    .btn-custom {
      background-color: rgba(189, 195, 199, 0.8);
    }
  `;
  function handleContactSubmit(e) {
    e.preventDefault();
    let htmlEmail = `
    <br/><br/>
    &nbsp;&nbsp;&nbsp;<h3>Ati primit email de la un client nou</h3>
    <br/><br/>
    <table width="auto" border="0" cellspacing="3" cellpadding="6" style="border:1px solid #ccc;">
       <tr ><th>Nume Client</th>
       <td style="border-bottom:1px solid #ccc;">${String(
         name.current.value
       ).toUpperCase()}</td>
       </tr>
       <tr ><th>Email Client</th>
       <td style="border-bottom:1px solid #ccc;">${email.current.value}</td>
       </tr>
       <tr><th>Subiect</th>
       <td style="border-bottom:1px solid #ccc;">${String(
         subject.current.value
       ).bold()}</td>
       </tr>
       <tr><th>Mesaj</th>
       <td style="border-bottom:1px solid #ccc;">${mainMsg.current.value}</td>
       </tr>
    </table>
    <br/> <br/>
    Cu respect,<br/>&nbsp;&nbsp;&nbsp;&nbsp;Croitorie La Rodica
        `;
    let payload = {
      emailToAddress: "lucut_ovidiu@yahoo.com",
      emailSubject: subject.current.value,
      emailMsg: htmlEmail
    };
    setLoadingSendBtn(true);
    SendAnEmail(payload)
      .then(d => {
        if (String(d.msesage).trim() === "Message sent") {
          email.current.value = "";
          name.current.value = "";
          subject.current.value = "";
          mainMsg.current.value = "";
          setLoadingSendBtn(false);
        }
      })
      .catch(e => {
        setLoadingSendBtn(false);
        email.current.value = "";
        name.current.value = "";
        subject.current.value = "";
        mainMsg.current.value = "";
      });
  }

  return (
    <>
      <Wrapper className="">
        <Container className="custom-width d-flex flex-column justify-content-center align-items-center form-row-custom">
          <Row className="d-flex flex-column p-3">
            <Col>
              <h4 className="contactTitle">
                Contacteaza-ma pentru oferte sau intrebari
              </h4>
            </Col>
            <Col>
              <form onSubmit={handleContactSubmit}>
                <input
                  className="form-control mt-3 mb-3"
                  type="text"
                  placeholder="Nume complet"
                  required
                  ref={name}
                />
                <input
                  className="form-control mt-3 mb-3"
                  type="email"
                  placeholder="Email-ul Dumneavoastra"
                  required
                  ref={email}
                />
                <input
                  className="form-control mt-3 mb-3"
                  type="text"
                  placeholder="Subiect"
                  required
                  ref={subject}
                />
                <textarea
                  className="form-control mt-3 mb-3"
                  type="text"
                  style={{ height: "9rem" }}
                  placeholder="Mesajul Dumneavoastra"
                  required
                  ref={mainMsg}
                />
                <button
                  disabled={loadingSendBtn}
                  type="submit"
                  className="btn btn-custom"
                >
                  Trimite Mesajul &nbsp;
                  <i className="fas fa-envelope-open" />
                  &nbsp;&nbsp;
                  <Spinner
                    style={{
                      display: loadingSendBtn ? "inline-block" : "none"
                    }}
                    // className={!loadingSendBtn ? "invisible" : "visible"}
                    size="sm"
                    animation="border"
                    variant="primary"
                  />
                </button>
              </form>
            </Col>
          </Row>
        </Container>
      </Wrapper>
    </>
  );
};

export default Contact;
