import React, { useState } from "react";
import { Layout } from "antd";
import { useLocation } from "react-router-dom";
import Sidenav from "./Sidenav";
import Header from "./Header";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import "../assets/styles/app.css";

const { Header: AntHeader, Content, Sider } = Layout;

function Main({ children }) {
  const { user } = useSelector((state) => state.user);
  const [sidenavType, setSidenavType] = useState("transparent");
  const [sidenavColor, setSidenavColor] = useState("#E3242B");
  let { pathname } = useLocation();
  
  pathname = pathname.replace("/", " ");
  

  return (
    <Layout className="layout-dashboard">
      <Sider
        breakpoint="lg"
        collapsedWidth={0}
        width={250}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        trigger={null}
        theme="light"
        className={`sider-primary ant-layout-sider-primary ${
          sidenavType === "#fff" ? "active-route" : ""
        }`}
        style={{ background: sidenavType }}
      >
        <Sidenav color={sidenavColor} />
      </Sider>
      <Layout>
        <AntHeader className="ant-header-fixed">
          <Header name={pathname} subName={pathname} />
        </AntHeader>
        <Content>{children}</Content>
        <Footer />
      </Layout>
    </Layout>
  );
}

export default Main;
