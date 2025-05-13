import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

/// Signup component for user registration
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  // Function to check if the password is strong
  const isStrongPassword = (pw) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/.test(pw);

  const getStrength = (pw) => {
    let strength = 0;
    if (pw.length >= 8) strength++;
    if (/[a-z]/.test(pw)) strength++;
    if (/[A-Z]/.test(pw)) strength++;
    if (/\d/.test(pw)) strength++;
    if (/[^\w\s]/.test(pw)) strength++;
    return strength;
  };

  // Function to handle user signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    if (password !== confirmPassword) {
      alert("❌ Passwords do not match.");
      return;
    }

    if (!isStrongPassword(password)) {
      alert(
        "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character."
      );
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      setSuccessMessage("✅ Account created successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Signup Error:", error.code, error.message);

      let message = "Signup failed. Please try again.";
      if (error.code === "auth/email-already-in-use") {
        message = "An account with this email already exists.";
      } else if (error.code === "auth/invalid-email") {
        message = "Please enter a valid email address.";
      } else if (error.code === "auth/weak-password") {
        message = "Password is too weak.";
      } else {
        message = error.message;
      }

      alert(message);
    }
  };

  const strength = getStrength(password);
  const strengthColor = [
    "#ccc",
    "red",
    "orange",
    "yellow",
    "lightgreen",
    "green",
  ][strength];
  const passwordsMatch = password === confirmPassword;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Sign Up</h2>
      <form onSubmit={handleSignup} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          style={{
            ...styles.input,
            borderColor:
              confirmPassword.length > 0 && !passwordsMatch ? "red" : "#ccc",
          }}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={styles.toggle}
        >
          {showPassword ? "🙈 Hide Passwords" : "👁️ Show Passwords"}
        </button>

        {password.length > 0 && (
          <div style={styles.strengthBarContainer}>
            <div
              style={{
                ...styles.strengthBar,
                backgroundColor: strengthColor,
                width: `${(strength / 5) * 100}%`,
              }}
            />
          </div>
        )}

        {confirmPassword.length > 0 && (
          <p
            style={{
              color: passwordsMatch ? "green" : "red",
              fontSize: "12px",
            }}
          >
            {passwordsMatch
              ? "✅ Passwords match"
              : "❌ Passwords do not match"}
          </p>
        )}

        <button type="submit" style={styles.button}>
          Sign Up
        </button>

        {successMessage && <p style={styles.success}>{successMessage}</p>}

        <p style={styles.link}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "60px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  toggle: {
    background: "none",
    border: "none",
    color: "#2196F3",
    cursor: "pointer",
    fontSize: "14px",
    textAlign: "right",
  },
  strengthBarContainer: {
    height: "6px",
    width: "100%",
    backgroundColor: "#eee",
    borderRadius: "4px",
  },
  strengthBar: {
    height: "100%",
    borderRadius: "4px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#2196F3",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  success: {
    color: "green",
    marginTop: "10px",
  },
  link: {
    fontSize: "14px",
    marginTop: "10px",
  },
};
