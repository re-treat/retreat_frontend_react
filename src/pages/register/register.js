import React, { Component } from "react";
import { Form, Input, Button, Checkbox } from "antd";

import Header from "../../components/header/header";

import "../register/register.less";

class Register extends React.Component {
  onFinish = async (values) => {
    if (values) {
      const { username, password } = values;
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
            <Form onFinish={this.onFinish} className="register-antd-form">
              {/* Email */}
              <div className="register-email">
                <label htmlFor="email">Email</label>
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
                      pattern: /^[a-zA-Z0-9_]+$/,
                      message:
                        "Must be constituted of letters, numbers, or underline",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>

              {/* Password */}
              <div className="register-password">
                <label htmlFor="password">Password</label>
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
                  <Input type="password" />
                </Form.Item>
              </div>

              {/* Repeat password */}
              <div className="register-repeat-pw">
                <label htmlFor="repeat-pw">Repeat password</label>
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
                <label htmlFor="alias">Alias</label>
                <Form.Item
                  name="alias"
                  required
                  tooltip="An alias is displayed on your profile page replacing your real name. When you are posting, you can choose to show your alias or use a randomly generated name for anonymity,"
                >
                  <Input />
                </Form.Item>
              </div>

              {/* Subscribe button */}
              <div className="register-subscribe">
                <Form.Item name="subscribe" valuePropName="checked" noStyle>
                  <input
                    type="checkbox"
                    name="subscribe"
                    className="subscribe-checkbox"
                  />
                  <label htmlFor="subscribe">
                    Receive your monthly mood summary and mental health
                    newsletter
                  </label>
                </Form.Item>
              </div>

              {/* Agree button */}
              <div className="register-agree">
                <Form.Item name="agree" valuePropName="checked" noStyle>
                  <input
                    type="checkbox"
                    name="agree"
                    className="agree-checkbox"
                  />
                  <label htmlFor="agree">
                    Agree to the{" "}
                    <a className="agree-terms" href="">
                      Terms of Service and Privacy Policy
                    </a>
                  </label>
                </Form.Item>
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
            </Form>

            {/* Jump to register */}
            <div className="to-sign-in-wrap">
              <span>
                Have an account already?{" "}
                <a className="to-sign-in" href="">
                  Sign in
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
