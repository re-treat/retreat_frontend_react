import React, { Component } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import {
  login,
  register,
  getUserInfo,
  logout,
  hasLoggedIn,
} from "../../components/BackendProvider";
import Header from "../../components/header/header";

import "../login/login.less";

class Login extends React.Component {
  componentDidMount() {
    if (hasLoggedIn()) {
      this.props.history.push("/profile");
    }
  }
  onFinish = async (values) => {
    if (values) {
      const { email, password } = values;
      login(email, password)
        .then(() => {
          this.props.history.push("/profile");
        })
        .catch((err) => {
          alert(err);
        });
      console.log(values);
    } else {
      console.log("Validation failed");
    }
  };

  render() {
    return (
      <div className="login">
        {/* Header component */}
        <div className="header">
          <Header />
        </div>

        <div className="login-body">
          {/* Login texts */}
          <h1 className="form-title">Login</h1>
          <h4 className="form-subtitle">
            Login to see your mood report and exercise progress
          </h4>

          <div className="login-form">
            <Form onFinish={this.onFinish} className="login-antd-form">
              {/* Email */}
              <div className="login-email">
                <label className="required" htmlFor="email">
                  Email
                </label>
                <Form.Item
                  name="email"
                  /* validation: required, 4-12 digits, letter&number&underline */
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input your email!",
                    },
                    {
                      pattern:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Please enter your email in form ...",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>

              {/* Password */}
              <div className="login-password">
                <label className="required" htmlFor="password">
                  Password
                </label>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input your password!",
                    },
                    /* { min: 4, message: "Minimum 4 digits for password" },
                    { max: 12, message: "Maximum 12 digits for password" }, */
                    {
                      pattern: /^[a-zA-Z0-9_]+$/,
                      message:
                        "Must be constituted of letters, numbers, or underline",
                    },
                  ]}
                >
                  <Input type="password" />
                </Form.Item>
              </div>

              {/* Remember button */}
              <div className="login-remember">
                <label class="remember-label">
                  <input
                    type="checkbox"
                    name="remember"
                    className="remember-checkbox"
                  />
                  Remember me
                </label>

                <a className="login-form-forgot" href="">
                  Forgot password?
                </a>
              </div>

              {/* Login button */}
              <div className="login-submit">
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Login
                  </Button>
                </Form.Item>
              </div>
            </Form>

            {/* Jump to register */}
            <div className="to-register">
              <span>
                Don't have an account yet?{" "}
                <a
                  className="create-account"
                  onClick={() => {
                    this.props.history.push("/join");
                  }}
                >
                  Create an account
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
