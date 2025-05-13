import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import BookingCard from "../components/BookingCard";

// Profile component to display user information and booking history
const Profile = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [name, setName] = useState(user?.displayName || "");
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  // Load user name and bookings when the component mounts or user changes
  useEffect(() => {
    const loadUserName = async () => {
      if (user?.uid) {
        const userDocRef = doc(db, "users", user.uid);
        const snap = await getDoc(userDocRef);
        if (snap.exists() && snap.data().displayName) {
          setName(snap.data().displayName);
        }
      }
    };

    // Load bookings from Firestore
    const loadBookings = async () => {
      if (!user?.uid) return;
      try {
        const bookingsRef = collection(db, "users", user.uid, "bookings");
        const snapshot = await getDocs(bookingsRef);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(data);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
      }
    };

    loadUserName();
    loadBookings();
  }, [user]);

  // Handle name save action
  const handleNameSave = async () => {
    if (!user?.uid || !name.trim()) return;
    setSaving(true);
    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, { displayName: name });
      setEditing(false);
      alert("Name updated successfully.");
    } catch (err) {
      console.error("Failed to update name", err);
      alert("Failed to update name.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.greeting}>Welcome, {name}!</h1>

      {!editing ? (
        <button onClick={() => setEditing(true)} style={styles.editBtn}>
          Edit Username
        </button>
      ) : (
        <div style={styles.profileField}>
          <label style={styles.label}>
            <strong>Edit Name:</strong>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
          <button
            onClick={handleNameSave}
            style={styles.saveBtn}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      )}

      <p>
        <strong>Email:</strong> {user?.email}
      </p>

      <h3 style={styles.header}>Booking History</h3>
      {bookings.length === 0 ? (
        <p>No past bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))
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
  greeting: {
    textAlign: "center",
    fontSize: "20px",
    marginBottom: "20px",
    color: "#333",
  },
  profileField: {
    marginBottom: "16px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
  },
  input: {
    padding: "8px",
    width: "100%",
    maxWidth: "400px",
    marginBottom: "10px",
    display: "block",
  },
  saveBtn: {
    padding: "8px 16px",
    backgroundColor: "#2196F3",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  editBtn: {
    marginBottom: "20px",
    padding: "8px 16px",
    backgroundColor: "#f0ad4e",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Profile;
