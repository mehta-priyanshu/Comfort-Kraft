import React from "react";
import "../styles/Helpcenter.css";

const helpTopics = [
  {
    title: "Contacting Support",
    text: "If you have any questions or issues, reach out to us via the Contact page. Our team is here to help Mondays through Saturdays, 9am–7pm. We aim to reply within 24 hours.",
  },
  {
    title: "Understanding Chair Categories",
    text: "Browse our 'Office Chair', 'Dining Chair', 'Study Chair', and 'Boss Chair' pages to find the perfect fit. Each category offers unique features, styles, and ergonomic benefits.",
  },
  {
    title: "Editing or Cancelling an Order",
    text: "If you wish to modify or cancel your order, contact support as soon as possible. Provide your order reference number for fast tracking.",
  },
  {
    title: "Returns & Refunds",
    text: "We offer a 7-day return window for unused products. Visit the Returns & Refunds policy page or contact our team for step-by-step assistance.",
  }
];

function HelpCenter() {
  return (
    <div className="help-container">
      <h1 className="help-header">Help Center</h1>
      <p className="help-intro">
        Need assistance? Our Help Center covers the most common questions and support topics. Can’t find your answer? Reach us on the <span style={{ color: "#a87f54", fontWeight: 600 }}>Contact</span> page.
      </p>

      <div className="help-list">
        {helpTopics.map((topic, idx) => (
          <div className="help-card" key={idx}>
            <h3 className="help-question">{topic.title}</h3>
            <div className="help-answer">{topic.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HelpCenter;
