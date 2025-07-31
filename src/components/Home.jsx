import React from "react";
import BannerBackground from "../Assets/home-banner-background-end.png";
import BannerImage from "../assets/rutina3.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import Contact from "./Contact";


const Home = ({showAbout , prueba}) => {
  return (
    <div className="home-container">
      <Navbar />
      {prueba ?  <Contact /> :
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
           🌸En Maranatha          
          </h1>
          <p className="primary-text">
           Nos encargamos de darte un mejor servicio, para que usted solo se relaje y disfrute.💆‍♀️💅
          </p>
          <button className="secondary-button" onClick={showAbout}>
            Cita ahora 🌸<FiArrowRight />{" "}
          </button>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
      
      }
    </div>
  );
};

export default Home;