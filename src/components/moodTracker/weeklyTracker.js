import React, { Component } from "react";
import "./moodTracker";

export default class WeeklyTracker extends Component {
  render() {
    return (
      <div className="weekly-tracker-wrapper">
        <p>Weekly tracker</p>
        <div className="mood-lineChart">Line chart</div>
        <div className="mood-pieChar">Pie chart</div>
      </div>
    );
  }
}
