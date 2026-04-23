import "./faq.css";
import { useState } from "react";

const data = [
  {
    q: "What is Minte Space?",
    a: "Minte Space is an all-in-one platform to design, build and scale your digital products."
  },
  {
    q: "Can I use it for free?",
    a: "Yes, we offer a free plan with essential features to get started."
  },
  {
    q: "Do you support integrations?",
    a: "Yes, you can integrate with multiple tools and APIs easily."
  },
  {
    q: "Is it suitable for teams?",
    a: "Absolutely. Collaboration tools are built-in for teams of any size."
  }
];

export default function FAQ() {
  return (
    <section className="faq">
      <div className="faq-container">
        <h2>Frequently asked questions</h2>

        <div className="faq-list">
          {data.map((item, i) => (
            <FAQItem key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`faq-item ${open ? "open" : ""}`}>
      <div className="faq-question" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <div className="icon">{open ? "−" : "+"}</div>
      </div>

      <div className="faq-answer">
        <p>{a}</p>
      </div>
    </div>
  );
}