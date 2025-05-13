import React from "react";
import { Link } from "react-router-dom";

// This component displays a success message after a booking is confirmed.
const BookingSuccess = () => {
  return (
    <div style={styles.container}>
      <h2>🎉 Booking Confirmed!</h2>
      <p>
        Thank you for your purchase. Check your profile to view booking history.
      </p>
      <Link to="/" style={styles.link}>
        Back to Home
      </Link>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "80px auto",
    padding: "30px",
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  link: {
    display: "inline-block",
    marginTop: "20px",
    padding: "10px 16px",
    backgroundColor: "#2196F3",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "6px",
  },
};

export default BookingSuccess;
