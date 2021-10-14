import React, { Component } from 'react';
import Header from '../../components/header/header'

import '../login/login.less'

class Login extends React.Component {
    render() { 
        return (
          <div className = "login">
              <header>
                <Header />
              </header>
            <div>This is the login page</div>
          </div>
        );
    }
}
 
export default Login;