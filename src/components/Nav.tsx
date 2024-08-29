// import React from 'react';
import '../App.css';
import spoonfedLogo from '../assets/images/spoonfed-logo.png';
// import Badge from 'react-bootstrap/Badge';
// import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function NavBar() {
  return (
    <nav className="navbar navbar-light bg-white border-bottom px-5 py-4 w-100 position-fixed fixed-top z-100">
      <div className="container-fluid d-flex justify-content-center">
        <div className="d-flex align-items-center w-75" style={{ maxWidth: '1200px' }}>
          <img src={spoonfedLogo} alt="Spoonfed logo" width={90} />
        </div>
        <div className="d-flex align-items-center ms-auto">
          <i className="bi bi-heart-fill" style={{ fontSize: '24px', color: 'black' }}></i>
          <span className="ms-2" style={{ fontSize: '18px', color: 'black' }}>0</span>
        </div>
      </div>
      <div className='pb-3' style={{ borderBottom: '2px solid orange', width: '100%' }}></div>
    </nav>
  );
}
