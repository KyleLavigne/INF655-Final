import React from "react";
import { Link } from "react-router-dom";

// This is the EventCard component that displays event details.
// It takes an event object as a prop and displays its thumbnail, title, date, location, and price.
const EventCard = ({ event }) => {
  return (
    <div style={styles.card}>
      <img src={event.thumbnail} alt={event.title} style={styles.image} />
      <div style={styles.details}>
        <h3>{event.title}</h3>
        <p>
          <strong>Date:</strong> {event.date}
        </p>
        <p>
          <strong>Location:</strong> {event.location}
        </p>
        <p>
          <strong>Price:</strong> ${event.price}
        </p>
        <Link to={`/event/${event.id}`} style={styles.button}>
          View Details
        </Link>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff",
    maxWidth: "320px", // Set a max width
    width: "100%", // Allow responsiveness
    margin: "0 auto", // Center inside grid cell
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    objectFit: "contain",
  },
  details: {
    padding: "15px",
  },
  button: {
    display: "inline-block",
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: "#2196F3",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "4px",
  },
};

export default EventCard;
