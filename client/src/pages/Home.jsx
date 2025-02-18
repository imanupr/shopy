import  { useEffect, useState } from "react";
import axios from "../axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import '../../src/css/Homestyle.css';

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/products")
      .then((res) => {
        // Ensure the response has products as an array
        setProducts(res.data || []);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <Container className="mt-4">
      <h2>Products</h2>
      <Row>
        {products.map((product) => (
          <Col md={4} key={product._id} className="mb-4">
            <Card className="h-100">
              <Card.Img 
                variant="top" 
                src={`http://localhost:5005/uploads/${product.image}`} 
                alt={product.name} 
                style={{ height: '200px', objectFit: 'cover' }} 
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                <Button variant="primary" onClick={() => addToCart(product._id)}>Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
