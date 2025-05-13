import React from "react";

// BookingCard component to display individual booking details
// This component is used in the Profile page to show booking history
const BookingCard = ({ booking }) => {
  const date = new Date(booking.createdAt.seconds * 1000).toLocaleDateString();

  return (
    <div style={styles.card}>
      <h4 style={styles.date}>Booking Date: {date}</h4>
      <ul style={styles.itemList}>
        {booking.items.map((item, index) => (
          <li key={index}>
            {item.title} x{item.quantity} – ${item.price * item.quantity}
          </li>
        ))}
      </ul>
      <p style={styles.total}>Total: ${booking.total}</p>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  date: {
    marginBottom: "10px",
    fontWeight: "bold",
  },
  itemList: {
    listStyleType: "disc",
    paddingLeft: "20px",
    marginBottom: "10px",
  },
  total: {
    fontWeight: "bold",
    textAlign: "right",
  },
};

export default BookingCard;
