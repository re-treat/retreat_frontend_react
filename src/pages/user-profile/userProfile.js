import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router";

import WeeklyTracker from "../../components/moodTracker/weeklyTracker";
import MonthlyTracker from "../../components/moodTracker/monthlyTracker";

import { Button, ToggleButton,Modal} from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import {WEATHER_LST} from '../../components/constants'
import ToggleSlide from "../../components/toggleSlide/toggleSlide";

import { SettingOutlined, EditOutlined } from "@ant-design/icons";

import {
  login,
  register,
  getUserInfo,
  logout,
  getUserEmotionHistory,
  postEmotionHistory
} from "../../components/BackendProvider";

import "../user-profile/userProfile.less";

const DEFAULT_TEXT = "You have not entered your mood today."

export default class Profile extends React.Component {
  state = {
    userinfo: {},
    timeline: "week",
    current_emotion:0,
    selected_emotion:0,
    input_text:DEFAULT_TEXT,
    current_text:DEFAULT_TEXT,
    modalShow:false,
    full_list:[],
  };

  toggleModal = ()=>{
    this.setState(
      (prevState)=>({
        modalShow:!prevState.modalShow
      })
    )
  }
  toggleTimeline = (e) => {
    this.setState({ timeline: e.target.className });
    console.log(this);
  };

  slideTimeline = (e) => {
    if (e.target.checked) {
      this.setState({ timeline: "month" });
    } else {
      this.setState({ timeline: "week" });
    }
  };
  loadWeather = () =>{
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    console.log(date)
    getUserEmotionHistory().then(
      (response)=>{
        let lst = response.data;
        let lst_today = lst.filter(e=>e.date==date)
        console.log(lst)
        console.log(lst_today)
        console.log(3333)
        if ((lst_today.length || 0) > 0){
          this.setState({
            input_text:lst_today[0].text,
            current_text:lst_today[0].text,
            current_emotion:lst_today[0].emotion,
            selected_emotion:lst_today[0].emotion,
          })
        }
        this.setState(
         { full_list:lst}
        )
      }
    ).catch(
      err=>alert(err)
    )
  }

  componentDidMount() {
    window.debug_weather =   postEmotionHistory

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
      }).then(
        this.loadWeather()
      );
  }

  render() {
    return (
      
      <div className="user-profile">
        <Modal size="lg" show={this.state.modalShow} onHide={this.toggleModal}>
        <Modal.Header>
          <Modal.Title>Today's Mood</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>What are you up to today?</div>
          <div className='mood-modal-text'>

            <textarea value={this.state.input_text} onChange={e=>this.setState({input_text:e.target.value})}/>
          </div>
          <div className='mood-modal-frame'>
            {WEATHER_LST.map((e,idx)=>{
              return <div className={
                this.state.selected_emotion==idx?'mood-modal-card mood-modal-card-selected':'mood-modal-card'}
                onClick = {
                  ()=>this.setState({selected_emotion:idx})
                }
                >
              <img src={e[1]}/>
              <div> {e[0]}</div>
              </div>
            })}
          </div>
          <div>
            
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.toggleModal}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{
            postEmotionHistory(this.state.selected_emotion,this.state.input_text).then(
              this.loadWeather
            ).catch(err=>alert(err));
            this.toggleModal();
          }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
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
            <a>
              <SettingOutlined />
            </a>
          </div>

          <div className="dashboard-cards">
            {/* To be extracted as card element */}
            <div className="mood-journal card">
              <div className="card-head">
                <p>Today's Mood</p>
                <a>
                  <EditOutlined onClick={this.toggleModal}/>
                </a>
              </div>
              <div className="card-body">
                <div className="mood-pic"><img src={WEATHER_LST[this.state.current_emotion][1]}/></div>
                <div className="mood-state">I feel {WEATHER_LST[this.state.current_emotion][0]} today!</div>
                <div className="mood-details">
                  {this.state.current_text}
                </div>
              </div>
            </div>
            <div className="mood-tracker card">
              <div className="card-head">
                <p>Mood Tracker</p>
                <div className="toggle-switch">
                  {/* <ToggleSlide /> */}
                  {/* <div className="week-or-month">
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
                  </div> */}
{/* 
                  <div class="switch">
                    <input
                      type="checkbox"
                      onClick={this.slideTimeline}
                      checked={this.state.timeline === "month"}
                    />
                    <span class="slider round" />
                  </div> */}
                </div>
              </div>
              <div className="card-body">
                {this.state.timeline == "week" ? (
                  <WeeklyTracker data={this.state.full_list} />
                ) : (
                  <MonthlyTracker />
                )}
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
