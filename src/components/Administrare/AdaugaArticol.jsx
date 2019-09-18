import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Button, Form, InputGroup } from "react-bootstrap";
import FetchData from "../../context/FetchData";
import { uri } from "../../context/ActionFunctions";

const AdaugaArticol = () => {
  const [categories, setCategories] = useState(null);
  const selectedCategory = useRef("");
  const article_img_src = useRef("");
  useEffect(() => {
    FetchData(
      {
        action: "GetCategoriesList"
      },
      uri
    ).then(data => {
      // console.log(data.payload);
      setCategories(data.payload);
    });
    return () => {};
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(selectedCategory.current.value);
    console.log("up file:", article_img_src.current.files[0]);
  }

  return (
    <Container fluid className="p-3">
      <Row className="d-flex justify-content-center">
        <Form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          method="POST"
          data-netlify="true"
        >
          <Form.Group controlId="titluArticol">
            <Form.Label>Titlu Articol</Form.Label>
            <Form.Control
              autoComplete="off"
              type="text"
              placeholder="Titlu Articol"
              required
            />
          </Form.Group>
          <Form.Group controlId="descriereArticol">
            <Form.Label>Descriere Articol</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descriere Articol"
              required
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group controlId="pretArticol">
            <Form.Label>Pret Articol</Form.Label>
            <Form.Control
              type="number"
              step="0.1"
              placeholder="Pret Articol"
              required
            />
          </Form.Group>
          <Form.Group controlId="cantitatePeStocArticol">
            <Form.Label>Cantitate Pe Stoc</Form.Label>
            <Form.Control
              type="number"
              placeholder="Cantitate Pe Stoc"
              required
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group controlId="categorieArticol">
            <Form.Label>Categorie Articol</Form.Label>
            <Form.Control required as="select" ref={selectedCategory}>
              {categories !== null &&
                categories.map((cat, key) => {
                  return (
                    <option key={key} value={cat._id}>
                      {cat.category_name}
                    </option>
                  );
                })}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ cursor: "pointer" }} htmlFor="fileUpload">
              Alege Poza
            </Form.Label>
            <InputGroup>
              <Form.Control
                type="file"
                required
                ref={article_img_src}
                id="fileUpload"
              />
            </InputGroup>
          </Form.Group>
          <Button type="submit">Adauga Articol</Button>
        </Form>
      </Row>
    </Container>
  );
};

export default AdaugaArticol;
