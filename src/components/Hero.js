import React from "react";
import RoleCycle from "./RoleCycle";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-inner">
        <div className="hero-text">
          <div className="hero-text1">
            <h1 className="hero-name">
              <span className="first-name">Steph :/</span>
              <span className="last-name">Otunla</span>
            </h1>
            <span className="hero-sub">
              <p className="hero-sub-right-fixed">
                <RoleCycle />
              </p>
              <p className="hero-sub-right2">
                <span>I handle the development, deployment</span>
                <br />
                <span>and maintenance of your Website, start to finish.</span>
              </p>
            </span>
          </div>
        </div>
        <img
          src="/assets/coder.png"
          alt="coder"
          className="hero-image"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </div>
    </section>
  );
}