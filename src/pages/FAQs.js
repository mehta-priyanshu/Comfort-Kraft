import React, { useState } from "react";
import "../styles/Faq.css";

const faqData = [
  {
    question: "What types of chairs do you offer?",
    answer:
      "ComfortKraft offers a range of chairs including Office Chairs, Study Chairs, Dining Chairs, Boss Chairs, and more. Each category is crafted for ergonomics and style.",
  },
  {
    question: "Can I see product details before purchasing?",
    answer:
      "Absolutely! Click ‘View Details’ on any product to see its features, description, images, and more before making a decision.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can reach out via our Contact page. Fill out the form, and our support team will get back to you within 24 hours.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 7-day return policy for all products in unused condition. For details, visit our Returns & Refunds section or contact support.",
  },
];

function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="faq-container">
      <h1 className="faq-header">Frequently Asked Questions</h1>
      <div className="faq-list">
        {faqData.map((item, idx) => (
          <div className="faq-item" key={idx}>
            <button
              className={`faq-question${openIndex === idx ? " open" : ""}`}
              onClick={() => toggleAnswer(idx)}
              aria-expanded={openIndex === idx}
            >
              {item.question}
              <span className="faq-arrow">{openIndex === idx ? "▲" : "▼"}</span>
            </button>
            {openIndex === idx && (
              <div className="faq-answer">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Faq;
