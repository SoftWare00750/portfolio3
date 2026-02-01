import React from "react";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="about">
          <h2 className="section-title">About</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>I'm a Web Developer experienced in building responsive interfaces and backends for websites and web applications.</p>
              <p className="about2">I create modern web and mobile interfaces and Backends, I'm passionate about clean code, performance, and delivering reliable, user-focused solutions.</p>
              <p>Web Interfaces with <span className="skills1">Html</span>, <span className="skills1">CSS</span>, <span className="skills1">Tailwind CSS</span>, <span className="skills1">Javascript</span>, <span className="skills1">React</span>, <span className="skills1">Angular</span> and <span className="skills1">Vue</span> frameworks.</p>
              <p>Backends with <span className="skills1">Express</span>, <span className="skills1">Django</span>, <span className="skills1">Spring</span>, <span className="skills1">.Net</span>, <span className="skills1">Laravel</span> frameworks.</p>
              <p>Database with <span className="skills1">MySQL</span>, <span className="skills1">PostgreSql</span>, <span className="skills1">MongoDB</span>, <span className="skills1">Redis</span>, <span className="skills1">Cassandra</span> </p>
            </div>
             <img src="/assets/about1.png" alt="about" className="about-image" />
          </div>
        </div>
      </div>
    </section>
  );
}