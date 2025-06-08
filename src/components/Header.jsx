import React from 'react';
import { Link } from "react-router-dom";

const Header = () => (
  <header style={{ background: "#1976d2", color: "#fff", padding: "16px 0", marginBottom: 24 }}>
    <nav style={{ display: "flex", justifyContent: "center", gap: 24 }}>
      <Link to="/Home" style={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}>Home</Link>
      <Link to="/AboutUs" style={{ color: "#fff", textDecoration: "none" }}>About Us</Link>
      <Link to="/ContactUs" style={{ color: "#fff", textDecoration: "none" }}>Contact Us</Link>
      <Link to="/Feedback" style={{ color: "#fff", textDecoration: "none" }}>Feedback</Link>
      <Link to="/Login" style={{ color: "#fff", textDecoration: "none" }}>Login</Link>
    </nav>
  </header>
);

export default Header;