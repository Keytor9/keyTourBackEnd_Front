import React from "react";
import "../Assets/Css/Web.css";
import { Link } from "react-router-dom";

function Partner() {
  return (
    <>
      <div className="partner">
        <div className="container">
          <div className="partner-layout">
            <h2>Become a partner</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur. Turpis tempus velit tortor
              lacinia. Nullam vitae habitasse pretium eget feugiat in. Aenean ut
              lectus nullam amet ultrices. Viverra in urnVulputate enim sed
              facilisi adipiscing vulputate.
            </p>
            <Link to="/RegisterVendor" className="join">
              join us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Partner;
