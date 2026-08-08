import React, { useEffect, useState } from "react";

const ROLES = ["Web Developer", "Frontend Developer", "Backend Developer"];
const INTERVAL_MS = 2000;

export default function RoleCycle({ className = "", as: Tag = "span" }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROLES.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <Tag className={`role-cycle ${className}`.trim()} key={index}>
      {ROLES[index]}
    </Tag>
  );
}