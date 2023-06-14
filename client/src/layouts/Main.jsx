import React, { useState } from "react";
import { Layout } from "antd";
import { useLocation } from "react-router-dom";
import Sidenav from "./Sidenav";
import Header from "./Header";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import "../assets/styles/app.css";

const { Header: AntHeader, Content, Sider } = Layout;

function removeNumbersAndLettersFromLastWord(pathname) {
  if (!pathname) return '';
  const updatedPathname = pathname.replace(/\//g, ' '); // Replace slashes with spaces
  const pathParts = updatedPathname.split(' ');
  const lastWord = pathParts[pathParts.length - 1];
  const updatedLastWord = lastWord.replace(/[a-zA-Z0-9]+$/, ''); // Remove alphanumeric characters
  pathParts[pathParts.length - 1] = updatedLastWord;
  return pathParts.join(' ');
}

function Main({ children }) {
  const { user } = useSelector((state) => state.user);
  const [sidenavType, setSidenavType] = useState("transparent");
  const [sidenavColor, setSidenavColor] = useState("#FC3053");

  const location = useLocation();

  const pathname = location ? location.pathname : '';

  const updatedPathname = removeNumbersAndLettersFromLastWord(pathname);



  // pathname = pathname.replace("/", " ");

  
 
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
          <Header name={updatedPathname} subName={""} />
        </AntHeader>
        <Content>{children}</Content>
        <Footer />
      </Layout>
    </Layout>
  );
}

export default Main;
