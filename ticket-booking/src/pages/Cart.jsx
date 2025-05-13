import React, { useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, collection, addDoc, Timestamp, setDoc } from "firebase/firestore";

// Cart component to display and manage the user's cart
const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, total, getCartItems } =
    useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Load saved cart once when user is ready
  useEffect(() => {
    if (user?.uid) {
      getCartItems();
    }
  }, [user?.uid, getCartItems]);

  // Handle changes in quantity input
  const handleChange = (id, value) => {
    const quantity = parseInt(value, 10);
    if (!isNaN(quantity) && quantity > 0) {
      updateQuantity(id, quantity);
    }
  };

  // Handle removal of items from the cart
  const handleRemove = (id) => {
    removeFromCart(id);
  };

  // Handle checkout process
  const handleCheckout = async () => {
    if (!user) {
      alert("You must be logged in to check out.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      const userBookingsRef = collection(db, "users", user.uid, "bookings");

      // Create a new booking document in Firestore
      await addDoc(userBookingsRef, {
        items: cartItems.map((item) => ({
          id: item.id,
          title: item.title,
          quantity: item.quantity,
          price: item.price,
        })),
        total: total,
        createdAt: Timestamp.now(),
      });

      for (let item of cartItems) {
        removeFromCart(item.id);
      }

      // Clear the cart in Firestore
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, { cart: [] }, { merge: true });

      navigate("/success");
    } catch (error) {
      console.error("Error saving booking:", error);
      alert("Failed to complete checkout.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>
          Your cart is empty. <a href="/">Go to Events</a>
        </p>
      ) : (
        <>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Event</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={styles.input}
                    />
                  </td>
                  <td>${item.price}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => handleRemove(item.id)}
                      style={styles.removeBtn}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={styles.total}>Total: ${total.toFixed(2)}</h3>
          <button onClick={handleCheckout} style={styles.checkoutBtn}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  input: {
    width: "60px",
    padding: "6px",
  },
  removeBtn: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "4px 8px",
    cursor: "pointer",
  },
  total: {
    textAlign: "right",
  },
  checkoutBtn: {
    display: "inline-block",
    padding: "10px 16px",
    backgroundColor: "#2196F3",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Cart;
