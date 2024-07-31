import React from "react";
import { useNavigate } from "react-router-dom";
export function Section() {

  const navigate = useNavigate();

  const startedButton = () => {
    navigate('/auth/login');
  }
  return (
    <div className="section">
      <FirstSection startedButton={startedButton}/>
      <SecondSection />
    </div>
  );
}

function FirstSection( {startedButton} ) {
  return (
    <div className="first-section">
      <Hero startedButton={startedButton} />
    </div>
  );
}

function SecondSection() {
  return (
    <div className="second-section">
      <Features />  
    </div>
  );
}
function Hero( {startedButton} ) {
  return (
    <div className="hero">
      <h2>Task Management App</h2>
      <p>Manage your tasks efficiently and effectively</p>
      <GetStarted startedButton={startedButton}/>
    </div>
  );
}
function GetStarted( {startedButton} ){
  return (
    <div className="get-started">
      <button onClick={startedButton}>Let's Get Started</button>
    </div>
  )
}
export function Features() {
  return (
    <div className="features">
      <Feature
        title="Task Scheduling"
        description="Plan your tasks and set deadlines."
      />
      <Feature
        title="Team Collaboration"
        description="Work with your team and share tasks."
      />
      <Feature
        title="Progress Tracking"
        description="Track the progress of your tasks in real-time."
      />
    </div>
  );
}

function Feature({ title, description }) {
  return (
    <div className="feature">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

