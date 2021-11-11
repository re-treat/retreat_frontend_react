import React, { Component } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { login, register, hasLoggedIn } from "../../components/BackendProvider";

import Header from "../../components/header/header";

import "../register/register.less";

class Register extends React.Component {
  state = {
    username: "",
    password: "",
    nickname: "",
  };
  componentDidMount() {
    if (hasLoggedIn()) {
      this.props.history.push("/profile");
    }
  }
  onFinish = async (values) => {
    if (values) {
      const { username, password, alias } = values;
      register(username, password, alias)
        .then(() => {
          alert("SUCCESS");
          login(username, password)
            .then(() => {
              this.props.history.push("/profile");
            })
            .catch((err) => {
              alert(err);
            });
        })
        .catch((err) => alert(err?.message));
    } else {
      console.log("Validation failed");
    }
  };

  render() {
    return (
      <div className="register">
        {/* Header component */}
        <div className="header">
          <Header />
        </div>

        <div className="register-body">
          {/* Register texts */}
          <h1 className="form-title">Sign up</h1>
          <h4 className="form-subtitle">
            Create an account to see your mood report and exercise progress
          </h4>

          <div className="register-form">
            <Form
              onFinish={this.onFinish}
              layout="vertical"
              className="register-antd-form"
            >
              {/* Email */}
              <div className="register-email">
                <label className="required" htmlFor="email">
                  Email
                </label>
                <Form.Item
                  name="username"
                  /* validation: required, 4-12 digits, letter&number&underline */
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input your email!",
                    },
                    {
                      type: "email",
                      message: "Must be a valid email",
                    },
                  ]}
                >
                  <Input
                    value={this.state.username}
                    onChange={(e) =>
                      this.setState({ username: e.target.value })
                    }
                  />
                </Form.Item>
              </div>

              {/* Password */}
              <div className="register-password">
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
                    { min: 4, message: "Minimum 4 digits for password" },
                    { max: 12, message: "Maximum 12 digits for password" },
                    {
                      pattern: /^[a-zA-Z0-9_]+$/,
                      message:
                        "Must be constituted of letters, numbers, or underline",
                    },
                  ]}
                >
                  <Input
                    type="password"
                    value={this.state.password}
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  />
                </Form.Item>
              </div>

              {/* Repeat password */}
              <div className="register-repeat-pw">
                <label className="required" htmlFor="repeat-pw">
                  Repeat password
                </label>
                <Form.Item
                  name="repeat-pw"
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please repeat your password!",
                    },
                    { min: 4, message: "Minimum 4 digits for password" },
                    { max: 12, message: "Maximum 12 digits for password" },
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

              {/* Alias */}
              <div className="alias">
                {/* <label htmlFor="alias">
                  Alias
                  <QuestionCircleOutlined className="alias-explain" />
                </label> */}
                <Form.Item
                  name="alias"
                  label="Alias"
                  tooltip="An alias is displayed on your profile page replacing your real name. When you are posting, you can choose to show your alias or use a randomly generated name for anonymity."
                >
                  <Input
                    value={this.state.nickname}
                    onChange={(e) =>
                      this.setState({ nickname: e.target.value })
                    }
                  />
                </Form.Item>
              </div>

              {/* Subscribe button */}
              <div className="register-subscribe">
                <div className="subscribe-left">
                  <input
                    type="checkbox"
                    name="subscribe"
                    className="subscribe-checkbox"
                  />
                </div>
                <div className="subscribe-right">
                  <label htmlFor="subscribe" class="subscribe-label">
                    Receive your monthly mood summary and mental health
                    newsletter
                  </label>
                </div>
              </div>

              {/* Agree button */}
              <div className="register-agree">
                <div className="agree-left">
                  <input
                    type="checkbox"
                    name="agree"
                    className="agree-checkbox"
                  />
                </div>

                <div className="agree-right">
                  <label htmlFor="agree" class="agreement-label required">
                    Agree to the{" "}
                    <a className="agree-terms" href="">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a className="agree-terms" href="">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>

              {/* Signup button */}
              <div className="register-signup">
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="register-form-button"
                  >
                    Sign up
                  </Button>
                </Form.Item>
              </div>

              {/* Jump to register */}
              <div className="to-sign-in-wrap">
                <span>
                  Have an account already?{" "}
                  <a className="to-sign-in" href="">
                    Sign in
                  </a>
                </span>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
