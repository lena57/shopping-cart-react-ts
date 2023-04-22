import { ReactNode, createContext, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

type CartItem = {
  id: number;
  quantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  console.log(cartItems);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function getItemQuantity(id: number) {
    return cartItems.find((el) => el.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number) {
    const currentItems = cartItems.find((el) => el.id === id);
    const newCartItems = currentItems?.quantity
      ? cartItems.map((el) =>
          el.id === id ? { ...el, quantity: el.quantity + 1 } : el
        )
      : [...cartItems, { id, quantity: 1 }];
    setCartItems(newCartItems);
  }

  function decreaseCartQuantity(id: number) {
    const currentItemsQuantity = cartItems.find((el) => el.id === id)?.quantity;
    const newCartItems =
      currentItemsQuantity === 1
        ? cartItems.filter((el) => el.id !== id)
        : cartItems.map((el) =>
            el.id === id ? { ...el, quantity: el.quantity - 1 } : el
          );
    setCartItems(newCartItems);
  }

  function removeFromCart(id: number) {
    const newCartItems = cartItems.filter((el) => el.id !== id);
    setCartItems(newCartItems);
  }

  const cartQuantity = cartItems.reduce((qty, item) => qty + item.quantity, 0);
  console.log("cartQuantity", cartQuantity);

  return (
    <ShoppingCartContext.Provider
      value={{
        openCart,
        closeCart,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
