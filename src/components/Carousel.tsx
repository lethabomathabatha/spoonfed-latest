// import { useState } from 'react';
import '../App.css';
import spoonfedLogo from '../assets/images/spoonfed-logo.png';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function QuickFinds() {

  return (
    <>
        {/* carousel */}
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                <img src={spoonfedLogo} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                <img src={spoonfedLogo} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                <img src={spoonfedLogo} className="d-block w-100" alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    </>
  );
}
