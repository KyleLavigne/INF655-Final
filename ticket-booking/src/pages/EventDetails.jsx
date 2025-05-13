import React from "react";
import { useParams } from "react-router-dom";
import events from "../data/data";
import { useCart } from "../contexts/CartContext";

// EventDetails component to display event details and add to cart functionality
const EventDetails = () => {
  const { eventId } = useParams();
  const event = events.find((e) => e.id === parseInt(eventId));
  const { addToCart } = useCart();
  const googleMapsKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  if (!event) return <p>Event not found.</p>;

  return (
    <div style={styles.container}>
      <img src={event.thumbnail} alt={event.title} style={styles.image} />
      <div style={styles.info}>
        <h2>{event.title}</h2>
        <p>{event.description}</p>
        <p>
          <strong>Date:</strong> {event.date}
        </p>
        <p>
          <strong>Location:</strong> {event.location}
        </p>
        <p>
          <strong>Price:</strong> ${event.price}
        </p>

        <div style={styles.mapWrapper}>
          <iframe
            title="map"
            style={styles.map}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=${googleMapsKey}&q=${encodeURIComponent(
              event.location
            )}`}
          ></iframe>
        </div>

        <button onClick={() => addToCart(event)} style={styles.button}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  image: {
    width: "100%",
    borderRadius: "8px",
    objectFit: "contain",
    maxHeight: "400px",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  mapWrapper: {
    marginTop: "20px",
  },
  map: {
    width: "100%",
    height: "300px",
    border: 0,
  },
  button: {
    padding: "12px",
    marginTop: "20px",
    backgroundColor: "#2196F3",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    width: "fit-content",
  },
};

export default EventDetails;
