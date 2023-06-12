import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Typography,
} from "antd";

import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertSlice";

import signinbg from "../../assets/images/signin.png";

const { Title } = Typography;
const { Content } = Layout;

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("https://fuentes-clinic.onrender.com/api/utility/login", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        const token = response.data.token;
        const streamToken = response.data.streamToken;
        localStorage.setItem("token", token);
        localStorage.setItem("streamToken", streamToken);

        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong", error);
    }
  };

  return (
      <Layout className="layout-default layout-signin">
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around" align="middle">
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 7, offset: 0 }}
              md={{ span: 12 }}
            >
              <Title className="mb-15">Welcome back!</Title>
              <Title className="font-regular text-muted" level={5}>
                Enter your email and password to sign in
              </Title>
              <Form onFinish={onSubmit} layout="vertical" className="">
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                  noStyle
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Email"
                  />
                </Form.Item>

                <Form.Item
                  className="mt-3"
                  //label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>

                <Form.Item>
                  <Form.Item valuePropName="checked" noStyle>
                    {/* <Checkbox>Remember me</Checkbox> */}
                  </Form.Item>

                  <a className="login-form-forgot" href="/forgot">
                    Forgot password?
                  </a>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" className="login-form-button" htmlType="submit" danger>SIGN IN</Button>
                </Form.Item>
                <p className="font-semibold text-muted">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-dark font-bold">
                    Sign Up
                  </Link>
                </p>
              </Form>
            </Col>
            <Col
              className="sign-img "
              style={{
                padding: 12,
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              xs={{ span: 24 }}
              lg={{ span: 8 }}
              md={{ span: 12 }}
            >
              <img className="" src={signinbg} alt="" />
            </Col>
          </Row>
        </Content>
      </Layout>
  );
}

export default Login;
