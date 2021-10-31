import React, { Component } from "react";
import {Button} from 'react-bootstrap';
import { login, register,getUserInfo,logout} from "../../components/BackendProvider";
//place holder
export default class Profile extends React.Component {
    state = {
        userinfo:{}
    }
    componentDidMount () {
        getUserInfo().then(res=>{
            this.setState({userinfo:res.data})
        }).catch((err)=>{
            //alert(JSON.stringify(err?.response?.data || '') || err)
            if (err?.response.status == 401){
                alert("Please Login!")
                this.props.history.push('/login')
            }
        })
    }
    render (){
        return <div>
            {JSON.stringify(this.state.userinfo)}
            <Button onClick={
                ()=>{
                    logout();
                    this.props.history.push('/login')
                }
            }>
                Log Out
            </Button>
        </div>
    }
}