import React, { useState, useEffect } from "react";

export default function Navbar({ loaded, theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Entrance animation state lives in React (not manipulated directly on
  // the DOM) so it survives re-renders triggered by scrolling. Previously
  // the "animate" class was added imperatively via document.querySelector,
  // which React wiped out on every re-render (e.g. when `scrolled` toggled),
  // making the navbar appear to slide back up as soon as the user scrolled.
  useEffect(() => {
    if (!loaded) return;
    const timer = setTimeout(() => setAnimated(true), 50);
    return () => clearTimeout(timer);
  }, [loaded]);

  const scrollToSection = (sectionId) => {
    setOpen(false);

    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setTimeout(() => {
        const navbarHeight = 90;
        const currentScroll = window.pageYOffset;
        window.scrollTo({
          top: currentScroll - navbarHeight,
          behavior: "smooth",
        });
      }, 100);
    }, 150);
  };

  const toggleMenu = () => setOpen((prev) => !prev);

  const themeToggleButton = (
    <button
      type="button"
      className="theme-toggle"
      data-active={theme}
      role="switch"
      aria-checked={theme === "dark"}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      onClick={toggleTheme}
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        ☀️
      </span>
      <span className="theme-toggle__icon" aria-hidden="true">
        🌙
      </span>
      <span className="theme-toggle__thumb" />
    </button>
  );

  return (
    <>
      {/* NAVBAR - Fixed at top */}
      <header
        className={`navbar ${scrolled ? "scrolled" : ""} ${
          animated ? "animate" : ""
        }`}
      >
        <div className="nav-inner">
          {/* Logo */}
          <div
            className="brand"
            onClick={() => scrollToSection("home")}
            style={{ cursor: "pointer" }}
          >
            <div className="logo-circle">
              <p>O</p>
            </div>
          </div>

          {/* Desktop Navigation - Visible on desktop only */}
          <nav className="nav-desktop">
            <button className="nav-link" onClick={() => scrollToSection("home")}>
              Home
            </button>
            <button className="nav-link" onClick={() => scrollToSection("projects")}>
              Projects
            </button>
            <button className="nav-link" onClick={() => scrollToSection("about")}>
              About
            </button>
            <button className="nav-link" onClick={() => scrollToSection("skills")}>
              Skills
            </button>
            <button className="contact-button" onClick={() => scrollToSection("contact")}>
              Contact Me
            </button>
            {themeToggleButton}
          </nav>

          {/* Hamburger - Visible on mobile only */}
          <div
            className={`hamburger ${open ? "active" : ""}`}
            onClick={toggleMenu}
            style={{ cursor: "pointer" }}
            role="button"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      {/* MOBILE DROPDOWN MENU - OUTSIDE navbar, independent element */}
      <nav className={`nav-mobile ${open ? "open" : ""}`}>
        <button className="nav-link" onClick={() => scrollToSection("home")}>
          Home
        </button>
        <button className="nav-link" onClick={() => scrollToSection("projects")}>
          Projects
        </button>
        <button className="nav-link" onClick={() => scrollToSection("about")}>
          About
        </button>
        <button className="nav-link" onClick={() => scrollToSection("skills")}>
          Skills
        </button>
        <button className="contact-button" onClick={() => scrollToSection("contact")}>
          Contact Me
        </button>
        {themeToggleButton}
      </nav>
    </>
  );
}
