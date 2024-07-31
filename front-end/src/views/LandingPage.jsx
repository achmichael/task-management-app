import { useEffect } from "react";
import RunningText from "../components/Marque.jsx";
import { Section } from "../components/Section.jsx";
import Footer from "../components/Footer.jsx";
import "../styles/landingpage.css";
import feather from 'feather-icons'; 

export function LandingPage() {

  useEffect(() => {
    feather.replace();
  }, []);
  return (
    <div className="App">
      <div className="content">
        <RunningText text="Welcome to Task Management App! Manage your tasks efficiently and effectively." />
        <Section />
      </div>
    </div>
  );
}
