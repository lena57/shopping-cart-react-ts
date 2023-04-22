import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";

export function Navbar() {
  const { openCart, cartQuantity } = useShoppingCart();

  return (
    <NavbarBs sticky="top" className="bg-light shadow-lg mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to="/about" as={NavLink}>
            About
          </Nav.Link>
          <Nav.Link to="/store" as={NavLink}>
            Store
          </Nav.Link>
        </Nav>

        {cartQuantity > 0 && (
          <Button
            onClick={openCart}
            style={{ width: "3rem", height: "3rem", position: "relative" }}
            variant="outline-primary"
            className="rounded-circle"
          >
            <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
              <rect fill="none" height="256" width="256" />
              <path
                d="M184,184H69.8L41.9,30.6A8,8,0,0,0,34.1,24H16"
                fill="none"
                stroke="#000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="8"
              />
              <circle
                cx="80"
                cy="204"
                fill="none"
                r="20"
                stroke="#000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="8"
              />
              <circle
                cx="184"
                cy="204"
                fill="none"
                r="20"
                stroke="#000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="8"
              />
              <path
                d="M62.5,144H188.1a15.9,15.9,0,0,0,15.7-13.1L216,64H48"
                fill="none"
                stroke="#000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="8"
              />
            </svg>
            <div
              className="rounded-circle bg-danger d-flex 
          justify-content-center align-items-center"
              style={{
                color: "white",
                width: "1.5rem",
                height: "1.5rem",
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: "translate(25%, 25%)",
              }}
            >
              {cartQuantity}
            </div>
          </Button>
        )}
      </Container>
    </NavbarBs>
  );
}
