import React from "react";
import "../css/HeaderFooter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div className="footer text-center">
      <div className="footer-name">
        <p>PUBLIC CALL</p>
      </div>
      <div className="footer-copyright">
        <p>
          Copyright <FontAwesomeIcon icon={faCopyright} size="1x" /> 2021{" "}
          <span>by</span> Tijana
        </p>
      </div>
    </div>
  );
};

export default Footer;
