import { Button, Col, Form, Input, Layout, Typography, Row } from "antd";
import React, { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import reset from "../../assets/images/reset.png";
import jwt_decode from "jwt-decode";

const { Title } = Typography;
const { Content } = Layout;

function Reset() {
  const token = useLocation().search.slice(0, useLocation().search.length).split("=").pop();

  const navigate = useNavigate();

  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isTokenValid, setIsTokenValid] = React.useState(false);
  const [error, setError] = React.useState("");

  const onSubmit = (e) => {
    const { email } = jwt_decode(token);
    axios
      .post("https://fuentes-clinic.onrender.com/api/user/resetpassword", {
        email,
        newPassword: password,
        confirmNewPassword: confirmPassword,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      });
    navigate("/login");
  };

  useEffect(() => {
    if (token) {
      axios
        .get(`https://fuentes-clinic.onrender.com/api/user/verifyToken?token=${token}`)
        .then((res) => {
          console.log(res);
          setIsTokenValid(true);
        })
        .catch((err) => {
          console.log(err.response);
          toast.error(err.response.data.message);
          setError(err.response.data.message);
        });
    }
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  //add a 404 page
  if (!token && !error) {
    return <p>Invalid token</p>;
  }

  return (
    <div>
      <Layout className="layout-default layout-signin">
        {isTokenValid ? (
          <>
            <Content className="signin">
              <Row gutter={[24, 0]} justify="space-around" align="middle">
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
                  <img className="" src={reset} alt="" />
                </Col>
                <Col xs={{ span: 24, offset: 0 }} lg={{ span: 7, offset: 0 }} md={{ span: 12 }}>
                  <Title className="mb-15">Reset Password</Title>
                  <Title className="font-regular text-muted" level={5}>
                    Enter your new password
                  </Title>
                  <Form layout="vertical" onFinish={onSubmit} className="row-col">
                    <Form.Item
                      name="newPassword"
                      label="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item
                      name="confirmNewPassword"
                      label="Confirm Password"
                      dependencies={["newPassword"]}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("newPassword") === value) {
                              return Promise.resolve();
                            }

                            return Promise.reject(
                              new Error("The two passwords that you entered do not match!")
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" style={{ width: "100%" }} danger>
                        RESET PASSWORD
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </Content>
          </>
        ) : (
          <h1 className="fw-bolder text-center text-muted mt-5">Verifying token...</h1>
        )}
      </Layout>
    </div>
  );
}

export default Reset;
