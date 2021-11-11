import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router";

import WeeklyTracker from "../../components/moodTracker/weeklyTracker";
import MonthlyTracker from "../../components/moodTracker/monthlyTracker";

import { Button, ToggleButton } from "react-bootstrap";
import logo from "../../assets/images/logo.png";

import ToggleSlide from "../../components/toggleSlide/toggleSlide";

import { SettingOutlined, EditOutlined } from "@ant-design/icons";

import {
  login,
  register,
  getUserInfo,
  logout,
} from "../../components/BackendProvider";

import "../user-profile/userProfile.less";

export default class Profile extends React.Component {
  state = {
    userinfo: {},
    timeline: "week",
  };

  toggleTimeline = (e) => {
    this.setState({ timeline: e.target.className });
  };

  slideTimeline = (e) => {
    if (e.target.checked) {
      this.setState({ timeline: "month" });
    } else {
      this.setState({ timeline: "week" });
    }
  };

  componentDidMount() {
    getUserInfo()
      .then((res) => {
        this.setState({ userinfo: res.data });
      })
      .catch((err) => {
        //alert(JSON.stringify(err?.response?.data || '') || err)
        if (err?.response.status == 401) {
          alert("Please Login!");
          this.props.history.push("/login");
        }
      });
  }

  render() {
    return (
      <div className="user-profile">
        <header>
          <div className="header-left">
            <img src={logo} className="logo" alt="logo" />
          </div>
          <div className="header-right">
            <p className="header-greet">Hi, {this.state.userinfo.nickname}!</p>
          </div>
        </header>

        <div className="dashboard-wrapper">
          <div className="dashboard-head">
            <p>Hey {this.state.userinfo.nickname}!</p>
            <SettingOutlined />
          </div>

          <div className="dashboard-cards">
            {/* To be extracted as card element */}
            <div className="mood-journal card">
              <div className="card-head">
                <p>Today's Mood</p>
                <EditOutlined />
              </div>
              <div className="card-body">
                <div className="mood-pic"></div>
                <p className="mood-state">I'm happy today!</p>
                <p className="mood-details">
                  I feel very happy today bc it’s Friday, and I’m done with
                  classes. My roomates and I are going to downtown and have
                  K-BBQ tonight!
                </p>
              </div>
            </div>
            <div className="mood-tracker card">
              <div className="card-head">
                <p>Mood Tracker</p>
                <div className="toggle-switch">
                  {/* <ToggleSlide /> */}
                  <div className="toggleSlide">
                    <div className="week-or-month">
                      <a
                        className="week"
                        onClick={this.toggleTimeline}
                        disabled={this.state.timeline === "week"}
                      >
                        Weekly
                      </a>
                      <span>/</span>
                      <a
                        className="month"
                        onClick={this.toggleTimeline}
                        disabled={this.state.timeline === "month"}
                      >
                        Monthly
                      </a>
                    </div>

                    <label class="switch">
                      <input
                        type="checkbox"
                        onClick={this.slideTimeline}
                        checked={this.state.timeline === "month"}
                      />
                      <span class="slider round" />
                    </label>
                  </div>
                </div>
                <div className="card-body">
                  {this.state.timeline == "week" ? (
                    <WeeklyTracker />
                  ) : (
                    <MonthlyTracker />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* place holder */}
        {/* {JSON.stringify(this.state.userinfo)}

        <Button
          onClick={() => {
            logout();
            this.props.history.push("/login");
          }}
        >
          Log Out
        </Button> */}
      </div>
    );
  }
}
