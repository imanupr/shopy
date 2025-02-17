import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import '../css/Cart.css'

const Cart = ({ cart, removeFromCart }) => {
  console.log("cart", cart);
  
  const totalPrice = cart?.items?.reduce((acc, item) => acc + item.productId.price * item.quantity, 0) || 0;

  return (
    <Container className="mt-4 cartpage">
      <h2>Your Cart</h2>
      
      {/* Conditional rendering for empty cart */}
      {!cart || !cart.items || cart.items.length === 0 ? (
        <p>Your cart is empty. <Link to="/">Shop now</Link></p>
      ) : (
        <>
          {/* Displaying cart items */}
          <Row>
            {cart?.items?.map((item) => (
              <Col md={4} key={item._id} className="mb-4">
                <Card className="h-100">
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col xs={4}>
                        <img 
                          src={`http://localhost:5005/uploads/${item.productId.image}`} 
                          alt={item.productId.name} 
                          style={{ width: "100%", height: "auto", borderRadius: "8px" }} 
                        />
                      </Col>
                      <Col xs={8}>
                        <h5>{item.productId.name}</h5>
                        <p>Price: ${item.productId.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <Button variant="danger" onClick={() => removeFromCart(item._id)}>
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Total Price */}
          <Row className="mt-4">
            <Col className="text-right">
              <h4>Total: ${totalPrice.toFixed(2)}</h4>
            </Col>
          </Row>

          {/* Checkout Button */}
          <Row className="mt-3">
            <Col className="text-right">
              <Link to="/checkout" className="btn btn-success">Proceed to Checkout</Link>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Cart;
