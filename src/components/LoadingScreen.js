import React, { useEffect, useState } from "react";

const GREETINGS = [
  { word: "Hello", lang: "English" },
  { word: "Hola", lang: "Spanish" },
  { word: "Bonjour", lang: "French" },
  { word: "Ciao", lang: "Italian" },
  { word: "Hallo", lang: "German" },
  { word: "こんにちは", lang: "Japanese" },
  { word: "안녕하세요", lang: "Korean" },
  { word: "你好", lang: "Chinese" },
  { word: "Olá", lang: "Portuguese" },
  { word: "Привет", lang: "Russian" },
  { word: "مرحبا", lang: "Arabic" },
  { word: "नमस्ते", lang: "Hindi" },
  { word: "Sannu", lang: "Hausa" },
  { word: "Ẹ n lẹ", lang: "Yoruba" },
  { word: "Hallå", lang: "Swedish" },
  { word: "Hello", lang: "Welcome" },
];

const STEP_MS = 220;

export default function LoadingScreen({ onDone }) {
  const [step, setStep] = useState(0);
  const [hiding, setHiding] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    document.body.classList.add("no-scroll");

    if (step >= GREETINGS.length - 1) {
      const finishTimer = setTimeout(() => {
        setHiding(true);
        if (onDone) onDone();
        document.body.classList.remove("no-scroll");
      }, 350);
      return () => clearTimeout(finishTimer);
    }

    const timer = setTimeout(() => setStep((s) => s + 1), STEP_MS);
    return () => clearTimeout(timer);
  }, [step, onDone]);

  // Safety net: never block the site for more than ~4.5s
  useEffect(() => {
    const safety = setTimeout(() => {
      setHiding(true);
      document.body.classList.remove("no-scroll");
      if (onDone) onDone();
    }, 4500);
    return () => clearTimeout(safety);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hiding) return;
    const t = setTimeout(() => setRemoved(true), 700);
    return () => clearTimeout(t);
  }, [hiding]);

  if (removed) return null;

  const current = GREETINGS[Math.min(step, GREETINGS.length - 1)];
  const progress = Math.min(100, ((step + 1) / GREETINGS.length) * 100);

  return (
    <div
      className={`loading-screen${hiding ? " is-hidden" : ""}`}
      role="status"
      aria-live="polite"
    >
      <div className="loading-screen__word" key={step}>
        {current.word}
      </div>
      <div className="loading-screen__lang">{current.lang}</div>
      <div className="loading-screen__bar">
        <div
          className="loading-screen__bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
