import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import items from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};
export function CartItem({ id, quantity }: CartItemProps) {
  const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } =
    useShoppingCart();

  const item = items.find((item) => item.id === id);
  if (!item) return null;

  return (
    <Stack
      direction="horizontal"
      gap={2}
      className="d-flex align-items-center "
    >
      <img
        src={item.imgUrl}
        alt={item.name}
        style={{ width: "75px", height: "60px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>{item.name}</div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          price: {formatCurrency(item.price)}
          {/* </div> */}
          {/* <div style={{ fontSize: ".75rem" }} d-flex align-items-start> */}
          <span className="d-flex align-items-center ">
            <Button
              onClick={() => increaseCartQuantity(id)}
              variant="outline-primary"
            >
              +
            </Button>
            qty: {quantity}
            <Button
              onClick={() => decreaseCartQuantity(id)}
              variant="outline-primary"
            >
              -
            </Button>
          </span>
        </div>
      </div>
      <div>{formatCurrency(item.price * quantity)}</div>
      <div>
        <Button onClick={() => removeFromCart(id)} variant="outline-danger">
          <svg
            height="24"
            id="svg8"
            version="1.1"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs id="defs2" />
            <g id="g1977" transform="translate(0,-290.6502)">
              <path
                d="m 3,295.65001 c -0.55228,0 -1,0.44772 -1,1 0,0.55228 0.44772,1 1,1 h 1 v 11 c 0,2.1987 1.8013,4 4,4 h 8 c 2.1987,0 4,-1.8013 4,-4 v -11 h 1 c 0.55228,0 1,-0.44772 1,-1 0,-0.55228 -0.44772,-1 -1,-1 -6,0 -12,0 -18,0 z m 3,2 h 12 v 11 c 0,1.1253 -0.8747,2 -2,2 H 8 c -1.1253,0 -2,-0.8747 -2,-2 z"
                id="rect1963"
              />
              <path
                d="m 10,292.65039 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 4 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z"
                id="path1972"
              />
            </g>
          </svg>
        </Button>
      </div>
    </Stack>
  );
}
