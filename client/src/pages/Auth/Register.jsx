import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  Layout,
  Row,
  Col,
} from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertSlice";
import signupbg from "../../assets/images/signup.png";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

function Register() {
  const [form] = Form.useForm();
  const [setChecked] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const { Title } = Typography;
  const { Content } = Layout;

  const toggleDisable = () => {
    setDisabled(!disabled);
  };

  const onChange = (e) => {
    setChecked(e.target.checked);
  };

  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("https://fuentes-clinic.onrender.com/api/user/register", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong:", error);
    }
  };

  return (
    <Layout className="layout-default layout-signin">
      <Content className="signin mb-5">
        <Row gutter={[24, 0]} justify="space-around" align="middle">
          <Col
            xs={{ span: 24, offset: 0 }}
            lg={{ span: 7, offset: 0 }}
            md={{ span: 12 }}
          >
            <Title className="mb-15">Welcome to Fuentes Clinic!</Title>

            <Form
              {...formItemLayout}
              form={form}
              // layout="vertical"
              labelAlign="left"
              onFinish={onFinish}
            >
              <Form.Item label="Name" name="name">
                <Input placeholder="First Name" />
              </Form.Item>

              <Form.Item label="Email" name="email">
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              >
                <Input.Password
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  placeholder="Password"
                  type="password"
                />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                onChange={(e) => setPasswordAgain(e.target.value)}
              >
                <Input.Password
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  placeholder="Confirm Password"
                  type="password"
                />
              </Form.Item>

              <Form.Item
                name="agreement"
                wrapperCol={{ span: 24 }}
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(
                            "To proceed, you need to agree with our terms and conditions"
                          ),
                  },
                ]}
              >
                <Checkbox onClick={toggleDisable}>
                  {" "}
                  Agree to our{" "}
                  <a href="https://www.termsfeed.com/live/2c33ae8a-8d67-419a-8b95-a853d46b5fee">
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a href="https://www.termsfeed.com/live/2c33ae8a-8d67-419a-8b95-a853d46b5fee">
                    Privacy Policy
                  </a>
                </Checkbox>
              </Form.Item>

              <Button
                disabled={!disabled}
                onChange={onChange}
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                danger
              >
                SIGNUP
              </Button>
            </Form>
          </Col>
          <Col
            className="sign-img"
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
            <img className="" src={signupbg} alt="" />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default Register;
