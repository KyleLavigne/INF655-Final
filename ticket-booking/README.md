# 🎟️ Event Ticket Booking Website

A full-featured frontend web application for browsing, searching, and booking event tickets. Built with **ReactJS**, **Firebase**, and responsive design principles.

---

## 🚀 Features

- 🔐 **User Authentication** – Sign up, log in, log out using Firebase Auth
- 🏠 **Home Page** – Lists all events from a static `data.js` file
- 🔍 **Search & Sort** – Search events by title, location, or date; sort by price or date
- 📄 **Event Details Page** – Shows event info, Google Map, and add-to-cart functionality
- 🛒 **Cart Page** – View selected tickets, update quantity, remove items, and view total
- ✅ **Checkout Flow** – Booking saves to Firestore and redirects to a thank you page
- 👤 **Profile Page** – View/edit user name and booking history (with booking cards)
- 🔄 **Cart Sync** – Cart contents are saved and restored from Firestore across sessions
- 📱 **Responsive Design** – Optimized for both mobile and desktop users

---

## 🛠️ Tech Stack

- **ReactJS** (Create React App)
- **Firebase**: Auth & Firestore
- **React Router DOM** for navigation
- **Context API** for global state management
- **Custom Components** like `EventCard`, `BookingCard`, `Navbar`, etc.

---

## 🔧 Project Structure

```
src/
├── components/        # Reusable UI components
├── contexts/          # AuthContext & CartContext
├── data/              # Static event data (data.js)
├── pages/             # Page views (Home, Cart, Profile, etc.)
├── utils/             # Firebase config
└── App.js             # Main router setup
```

---

## ✅ Setup Instructions

1. **Clone this repo**

   ```bash
   git clone https://github.com/KyleLavigne/INF655-Final/tree/main
   cd event-ticket-booking
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env` file**  
   Add your Firebase config:

   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   REACT_APP_GOOGLE_MAPS_API_KEY=your_maps_key
   ```

4. **Run the development server**
   ```bash
   npm start
   ```

---

## 🧪 Testing Checklist

| Feature                           | Implemented |
| --------------------------------- | ----------- |
| Event listing with images         | ✅          |
| Search & Sort                     | ✅          |
| Cart update/remove & total price  | ✅          |
| Firebase auth                     | ✅          |
| Firestore booking persistence     | ✅          |
| Profile editing & booking history | ✅          |
| Responsive layout                 | ✅          |

---

## 📄 License

This project is for educational purposes. Attribution appreciated but not required.
