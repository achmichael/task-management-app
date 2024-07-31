import React from "react";
import "../styles/footer.css";
import { ListItem } from "./ListItem.jsx";

function AboutSection({ title, content }) {
  return (
    <div className="footer-section">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}

function LinksSection({ title }) {
  return (
    <div className="footer-section">
      <h3>{title}</h3>
      <ul>
        <ListItem className={"list-item-footer"} href="/about" label={"Home"} />
        <ListItem className={"list-item-footer"} href="/team" label={"Features"} />
        <ListItem className={"list-item-footer"} href="/careers" label={"Pricing"} />
        <ListItem className={"list-item-footer"} href="/blog" label={"Contact Us"} />
      </ul>
    </div>
  );
}

function ContactSection() {
  return (
    <div className="footer-section">
      <h3>Contact Us</h3>
      <p>achmadmichael@gmail.com</p>
      <p>082139503931</p>
      <p>Jln. Gajayana, Kota Malang</p>
    </div>
  );
}

function SocialLinksSection() {
  return (
    <div className="footer-section">
      <h3>Follow Us</h3>
      <div className="social-links">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <i data-feather="facebook"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <i data-feather="twitter"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <i data-feather="instagram"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <i data-feather="linkedin"></i>
        </a>
      </div>
    </div>
  );
}

function FooterBottom() {
  return (
    <div className="footer-bottom">
      <p>&copy; 2024 Task Management App. All rights reserved.</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-sections">
          <AboutSection
            title="About Us"
            content="Task Management App helps you organize and manage your tasks efficiently. Stay productive and keep track of your work with ease."
          />
          <LinksSection title="Quick Links" />
          <ContactSection />
          <SocialLinksSection />
        </div>
        <FooterBottom />
      </div>
      {/* <i data-feather="x-circle"></i> */}
    </footer>
  );
}

export default Footer;
