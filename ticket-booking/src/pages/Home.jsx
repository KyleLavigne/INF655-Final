import React, { useState } from "react";
import events from "../data/data";
import EventCard from "../components/EventCard";
import { useCart } from "../contexts/CartContext";

// Home component to display a list of events
const Home = () => {
  const { addToCart } = useCart();
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  // Filter then sort events based on search and sort selection
  const filteredEvents = events
    .filter((event) => {
      const q = query.toLowerCase();
      return (
        event.title.toLowerCase().includes(q) ||
        event.location.toLowerCase().includes(q) ||
        event.date.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "date-asc") return new Date(a.date) - new Date(b.date);
      if (sortBy === "date-desc") return new Date(b.date) - new Date(a.date);
      return 0;
    });

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Upcoming Events</h1>

      <input
        type="text"
        placeholder="Search by name, location, or date"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={styles.searchInput}
      />

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        style={styles.dropdown}
      >
        <option value="default">Sort By</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
        <option value="date-asc">Date: Soonest First</option>
        <option value="date-desc">Date: Latest First</option>
      </select>

      <div style={styles.grid}>
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onAddToCart={() => addToCart(event)}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  searchInput: {
    display: "block",
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto 20px auto",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  dropdown: {
    display: "block",
    width: "100%",
    maxWidth: "200px",
    margin: "0 auto 30px auto",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
};

export default Home;
