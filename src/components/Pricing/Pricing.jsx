import "./pricing.css";

export default function Pricing() {
  return (
    <section className="pricing container">
      <h2>Simple Pricing</h2>

      <div className="pricing-grid">
        <Card title="Basic" price="$49.99" />
        <Card title="Pro" price="$99.99" highlight />
        <Card title="Enterprise" price="$179.99" />
      </div>
    </section>
  );
}

function Card({ title, price, highlight }) {
  return (
    <div className={`price-card ${highlight ? "highlight" : ""}`}>
      <h3>{title}</h3>
      <h1>{price}</h1>

      <ul>
        <li>✔ Feature one</li>
        <li>✔ Feature two</li>
        <li>✔ Feature three</li>
      </ul>

      <button className="btn-primary">Choose Plan</button>
    </div>
  );
}