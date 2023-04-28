import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  Row,
  Col,
  Breadcrumb,
  Badge,
  Dropdown,
  List,
  Avatar,
  Typography,
} from "antd";

import { NavLink, useNavigate } from "react-router-dom";

const bell = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      d="M10 2C6.68632 2 4.00003 4.68629 4.00003 8V11.5858L3.29292 12.2929C3.00692 12.5789 2.92137 13.009 3.07615 13.3827C3.23093 13.7564 3.59557 14 4.00003 14H16C16.4045 14 16.7691 13.7564 16.9239 13.3827C17.0787 13.009 16.9931 12.5789 16.7071 12.2929L16 11.5858V8C16 4.68629 13.3137 2 10 2Z"
      fill="#111827"
    ></path>
    <path
      d="M10 18C8.34315 18 7 16.6569 7 15H13C13 16.6569 11.6569 18 10 18Z"
      fill="#111827"
    ></path>
  </svg>,
];

const menu = (
  <List
    min-width="100%"
    className="header-notifications-dropdown "
    itemLayout="horizontal"
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar shape="square" src={item.avatar} />}
          title={item.title}
          description={item.description}
        />
      </List.Item>
    )}
  />
);

function Header({ name, subName }) {
  const { Title, Text } = Typography;

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const [visible, setVisible] = useState(false);
  // const [sidenavType, setSidenavType] = useState("transparent");

  useEffect(() => window.scrollTo(0, 0));

  // const showDrawer = () => setVisible(true);
  // const hideDrawer = () => setVisible(false);

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to="/">Pages</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ textTransform: "capitalize" }}>
              {name.replace("/", "")}
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="ant-page-header-heading">
            <span
              className="ant-page-header-heading-title"
              style={{ textTransform: "capitalize" }}
            >
              {subName.replace("/", "")}
            </span>
          </div>
        </Col>
        <Col span={24} md={18} className="header-control">
          <Badge size="small" count={user?.unseenNotifications.length}>
            <Dropdown menu={menu} trigger={["click"]}>
              <a
                href="#pablo"
                className="ant-dropdown-link"
                onClick={() => navigate("/notifications")}
              >
                {bell}
              </a>
            </Dropdown>
          </Badge>
        </Col>
      </Row>
    </>
  );
}

export default Header;
