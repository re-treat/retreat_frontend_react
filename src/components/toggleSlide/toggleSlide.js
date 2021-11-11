import React, { Component, useState } from "react";

import "../toggleSlide/toggleSlide.less";

const ToggleSlide = () => {
  const [timeline, setTimeline] = useState("week");

  const toggleTimeline = (e) => {
    setTimeline(e.target.className);
  };

  const slideTimeline = (e) => {
    if (e.target.checked) {
      setTimeline("month");
    } else {
      setTimeline("week");
    }
  };

  return (
    <div className="toggleSlide">
      <div className="week-or-month">
        <a
          className="week"
          onClick={toggleTimeline}
          disabled={timeline === "week"}
        >
          Weekly
        </a>
        <span>/</span>
        <a
          className="month"
          onClick={toggleTimeline}
          disabled={timeline === "month"}
        >
          Monthly
        </a>
      </div>

      <label class="switch">
        <input
          type="checkbox"
          onClick={slideTimeline}
          checked={timeline === "month"}
        />
        <span class="slider round" />
      </label>
    </div>
  );
};

export default ToggleSlide;
