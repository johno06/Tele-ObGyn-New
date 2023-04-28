import { Button, Col, Form, Input, Layout, Typography, Row } from "antd";
import React from "react";
import forgot from "../../assets/images/forgot.png";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertSlice";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Content } = Layout;

function Forgot() {
  const [email, setEmail] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
      // e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    dispatch(showLoading());
    axios
      .post("/api/user/forgotpassword", { email })
      .then((res) => {
        dispatch(hideLoading());
        toast.success(res.data.message);
        navigate("/login");
        console.log(res.data);
      })
      .catch((err) => {
        dispatch(hideLoading());
        console.log(err.response);
        toast.error("User does not exist");
      });
      
  };

  return (
    <div>
      <Layout className="layout-default layout-signin">
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around" align="middle">
            <Col xs={{ span: 24, offset: 0 }} lg={{ span: 7, offset: 0 }} md={{ span: 12 }}>
              <Title className="mb-15">Forgot Password</Title>
              <Title className="font-regular text-muted" level={5}>
                Enter your email to reset your password
              </Title>
              <Form layout="vertical" onFinish={onSubmit} className="row-col">
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                >
                  <Input placeholder="Email" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{ width: "100%" }} danger>
                    CONTINUE
                  </Button>
                </Form.Item>
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
              <img className="" src={forgot} alt="" />
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
}

export default Forgot;
