import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

/**
 * Navbar component for the application.
 * It includes a logo, cart icon, and user profile dropdown.
 * The cart icon shows the number of items in the cart.
 * The user profile dropdown allows the user to view their profile or log out.
 * @returns {JSX.Element} The rendered Navbar component.
 */
const Navbar = () => {
  const { cartItems } = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Function to handle user logout
  const handleLogout = async () => {
    await signOut(auth);
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    // Navbar container
    <nav style={styles.navbar}>
      <Link to="/" style={styles.logo}>
        🎟️ Ticket App
      </Link>
      {/* Right section of the navbar */}
      <div style={styles.rightSection}>
        <Link to="/cart" style={styles.iconBtn}>
          🛒
          {cartItems.length > 0 && (
            <span style={styles.cartCount}>{cartItems.length}</span>
          )}
        </Link>

        {/* Profile dropdown */}
        <div style={styles.profileWrapper}>
          <button
            style={styles.iconBtn}
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            👤
          </button>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div style={styles.dropdown}>
              <Link
                to="/profile"
                style={styles.dropdownItem}
                onClick={() => setDropdownOpen(false)}
              >
                View Profile
              </Link>
              <button style={styles.dropdownItem} onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 24px",
    backgroundColor: "#2196F3",
    color: "#fff",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  logo: {
    fontSize: "20px",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    position: "relative",
  },
  iconBtn: {
    fontSize: "20px",
    background: "none",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    position: "relative",
    textDecoration: "none",
  },
  cartCount: {
    position: "absolute",
    top: "-4px",
    right: "-10px",
    backgroundColor: "red",
    borderRadius: "50%",
    padding: "2px 6px",
    fontSize: "12px",
  },
  profileWrapper: {
    position: "relative",
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    right: 0,
    backgroundColor: "#fff",
    color: "#000",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    borderRadius: "6px",
    overflow: "hidden",
    marginTop: "6px",
    zIndex: 10,
  },
  dropdownItem: {
    display: "block",
    padding: "10px 16px",
    textDecoration: "none",
    color: "#000",
    cursor: "pointer",
    textAlign: "left",
    border: "none",
    background: "none",
    width: "100%",
  },
};

export default Navbar;
