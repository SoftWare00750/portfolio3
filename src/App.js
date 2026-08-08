import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import useScrollAnimation from "./hooks/useScrollAnimation";
import useTheme from "./hooks/useTheme";

function App() {
  const [loaded, setLoaded] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Initialize scroll animations; entrance animation waits for `loaded`
  useScrollAnimation(loaded);

  return (
    <>
      <LoadingScreen onDone={() => setLoaded(true)} />
      <div className={`site${loaded ? " is-visible" : ""}`}>
        <Navbar loaded={loaded} theme={theme} toggleTheme={toggleTheme} />
        <main>
          <Hero />
          <Projects />
          <About />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
