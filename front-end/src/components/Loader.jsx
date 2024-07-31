import React from 'react';
import '../styles/Loader.css'; 

const Loader = () => {
  return (
    <div className="loader">
      <div className="spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default Loader;
