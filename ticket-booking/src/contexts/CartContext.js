import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();

  // Get cart from Firestore manually
  const getCartItems = useCallback(async () => {
    if (user) {
      const cartRef = doc(db, "users", user.uid);
      const snap = await getDoc(cartRef);
      if (snap.exists() && snap.data().cart) {
        setCartItems(snap.data().cart);
      }
    }
  }, [user]);

  // Load cart when user logs in
  useEffect(() => {
    if (user) getCartItems();
    else setCartItems([]);
  }, [user, getCartItems]);

  // Save cart to Firestore only on manual cart changes
  const persistCart = async (newCartItems) => {
    if (user) {
      const cartRef = doc(db, "users", user.uid);
      await setDoc(cartRef, { cart: newCartItems }, { merge: true });
    }
  };

  const addToCart = (event, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === event.id);
      let updated;
      if (existing) {
        updated = prev.map((item) =>
          item.id === event.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updated = [...prev, { ...event, quantity }];
      }
      persistCart(updated);
      return updated;
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      persistCart(updated);
      return updated;
    });
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      persistCart(updated);
      return updated;
    });
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        total,
        setCartItems,
        getCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
