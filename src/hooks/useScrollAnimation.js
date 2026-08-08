import { useEffect } from "react";

export const useScrollAnimation = (ready = true) => {
  // Entrance animation for navbar + hero text, gated behind `ready`
  // so it plays right after the loading screen hides instead of
  // finishing invisibly underneath it.
  // NOTE: the navbar's entrance animation is intentionally NOT handled here.
  // Navbar.js re-renders on every scroll event (to toggle its "scrolled"
  // class), and React overwrites the DOM's className on every re-render.
  // Adding the "animate" class imperatively via the DOM (as this hook used
  // to do) got wiped out the moment the user scrolled, which made the
  // navbar appear to "slide back up". The navbar now manages its own
  // "animate" state internally via React (see Navbar.js) so it survives
  // re-renders.
  useEffect(() => {
    if (!ready) return;

    const animateHeroText = () => {
      const heroName = document.querySelector(".hero-name");
      const heroSubFixed = document.querySelector(".hero-sub-right-fixed");
      const heroSub2 = document.querySelector(".hero-sub-right2");

      if (heroName) {
        setTimeout(() => heroName.classList.add("animate"), 150);
      }
      if (heroSubFixed) {
        setTimeout(() => heroSubFixed.classList.add("animate"), 300);
      }
      if (heroSub2) {
        setTimeout(() => heroSub2.classList.add("animate"), 300);
      }
    };

    const timer = setTimeout(() => {
      animateHeroText();
    }, 50);

    return () => clearTimeout(timer);
  }, [ready]);

  // Scroll-triggered reveal animations. This part can be set up
  // immediately — elements simply won't animate until scrolled into view.
  useEffect(() => {
    const standardObserverOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    };

    const standardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("animate");
        standardObserver.unobserve(entry.target);

        if (entry.target.classList.contains("about-grid")) {
          const aboutText = entry.target.querySelector(".about-text");
          const aboutImage = entry.target.querySelector(".about-image");
          if (aboutText) aboutText.classList.add("animate");
          if (aboutImage) aboutImage.classList.add("animate");
        }

        if (entry.target.classList.contains("skills-grid")) {
          const skillItems = entry.target.querySelectorAll(".skill-item");
          skillItems.forEach((item) => item.classList.add("animate"));
        }

        if (entry.target.classList.contains("projects-grid")) {
          const projectCards = entry.target.querySelectorAll(".project-card");
          projectCards.forEach((card) => card.classList.add("animate"));
        }
      });
    }, standardObserverOptions);

    const heroImageObserverOptions = {
      threshold: 0.3,
      rootMargin: "0px 0px -200px 0px",
    };

    const heroImageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          heroImageObserver.unobserve(entry.target);
        }
      });
    }, heroImageObserverOptions);

    const sectionTitles = document.querySelectorAll(".section-title");
    sectionTitles.forEach((title) => standardObserver.observe(title));

    const projectsGrid = document.querySelector(".projects-grid");
    if (projectsGrid) standardObserver.observe(projectsGrid);

    const aboutGrid = document.querySelector(".about-grid");
    if (aboutGrid) standardObserver.observe(aboutGrid);

    const skillsGrid = document.querySelector(".skills-grid");
    if (skillsGrid) standardObserver.observe(skillsGrid);

    const contactContainer = document.querySelector(".contact-container");
    if (contactContainer) standardObserver.observe(contactContainer);

    const footer = document.querySelector(".footer");
    if (footer) standardObserver.observe(footer);

    const heroImage = document.querySelector(".hero-image");
    if (heroImage) heroImageObserver.observe(heroImage);

    return () => {
      standardObserver.disconnect();
      heroImageObserver.disconnect();
    };
  }, []);
};

export default useScrollAnimation;
