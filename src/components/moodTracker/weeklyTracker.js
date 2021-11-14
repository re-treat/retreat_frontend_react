import React, { Component } from "react";

import "./moodTracker";
import "./weeklyTracker.less";
import LineChart from "../charts/lineChart";
import PieChart from "../charts/pieChart";

export default class WeeklyTracker extends Component {
  render() {
    return (
      <React.Fragment>
        <p>Weekly tracker</p>
        <div className="weekly-tracker-wrapper">
          <div className="mood-lineChart">
            <LineChart />
          </div>
          <div className="mood-pieChart">
            <PieChart />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
