import { useEffect, useState } from "react";
import "./hero.css";

const images = [
  "https://images.unsplash.com/photo-1541625602330-2277a4c46182",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1492724441997-5dc865305da7"
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  // auto change
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">

      {/* background images */}
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          className={`hero-img ${i === index ? "active" : ""}`}
        />
      ))}

      {/* overlay */}
      <div className="hero-overlay"></div>

      {/* content */}
      <div className="hero-content">
        <h1>Build beautiful products faster</h1>
        <p>Design, develop and scale with one platform</p>

        <div className="buttons">
          <button className="btn-primary">Get Started</button>
          <button className="btn-primary">View Demo</button>
        </div>
      </div>

    </section>
  );
}