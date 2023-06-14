import { Button, Menu, Dropdown } from "antd";
import React from "react";
import { AiFillHome } from "react-icons/ai";
import {
  FaUserMd,
  FaUserPlus,
  FaUserFriends,
  FaUserCircle,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo-3.png";


function Sidenav({ color }) {
  const { user } = useSelector((state) => state.user);
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");
  const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";
  const navigate = useNavigate();

 

  function doctorMenu() {
    
    return (
      <>
        <div className="brand">
          <img src={logo} alt="" />
          <span>TELE-OBGYN</span>
        </div>
        <hr />
        <Menu defaultSelectedKeys={["1"]} theme="light" mode="inline">
          <Menu.Item key="1">
            <NavLink className="nav-link" to="/home">
              <span
                className="icon"
                style={{
                  background: page === "" ? color : "",
                }}
              >
                <AiFillHome />
              </span>
              <span className="label">Home</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="d-appointment">
            {/* <Dropdown overlay={menu} trigger={['click']}> */}
            <NavLink className="nav-link" to="/doctor/appointments">
              <span
                className="icon"
                style={{
                  background: page === "doctor/appointments" ? color : "",
                }}
              >
                <FaUserFriends />
              </span>
              <span className="label">Appointments</span>
            </NavLink>
            {/* </Dropdown> */}
          </Menu.Item>
          <Menu.Item key="d-profile">
            <NavLink className="nav-link" to={`/doctor/profile/${user?._id}`}>
              <span
                className="icon"
                style={{
                  background:
                    page === `doctor/profile/${user?._id}` ? color : "",
                }}
              >
                <FaUserCircle />
              </span>
              <span className="label">Profile</span>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="d-userlist">
            <NavLink className="nav-link" to="/doctor/userslist">
              <span
                className="icon"
                style={{
                  background: page === "doctor/userslist" ? color : "",
                }}
              >
                <FaUserFriends />
              </span>
              <span className="label">Patients</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="d-create">
            <NavLink className="nav-link" to="/doctor/addaccount">
              <span
                className="icon"
                style={{
                  background: page === "/doctor/addaccount" ? color : "",
                }}
              >
                <FaUserPlus />
              </span>
              <span className="label">Create Accounts</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="d-messenger">
            <NavLink className="nav-link" to={`/user/messenger/${user?._id}`}>
              <span
                className="icon"
                style={{
                  background:
                    page === `/user/messenger/${user?._id}` ? color : "",
                }}
              >
                <FaUserMd />
              </span>
              <span className="label">Messages</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="d-call">
            <NavLink className="nav-link" to={`/doctor/consultation`}>
              <span
                className="icon"
                style={{
                  background: page === `/doctor/consultation/` ? color : "",
                }}
              >
                <FaUserCircle />
              </span>
              <span className="label">Consultation</span>
            </NavLink>
          </Menu.Item>
        </Menu>

        <div className="aside-footer">
          <div
            className="footer-box"
            style={{
              background: color,
            }}
          >
            <NavLink to={`/doctor/profile/${user?._id}`}>
              <span className="icon" style={{ color }}>
                <FaUserMd />
              </span>
            </NavLink>
            <h6>
              Dr. {user?.name} {user?.surname}
            </h6>
            <p>{role}</p>
            <Button
              type="primary"
              className=" ant-btn-block"
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              LOGOUT
            </Button>
          </div>
        </div>
      </>
    );
  }

  function admin() {
    return (
      <>
        <div className="brand">
          <img src={logo} alt="" />
          <span>TELE-OBGYN</span>
        </div>
        <hr />
        <Menu defaultSelectedKeys={["a-dashboard"]} theme="light" mode="inline">
          <Menu.Item key="a-dashboard">
            <NavLink className="nav-link" to="/home">
              <span
                className="icon"
                style={{
                  background: page === "" ? color : "",
                }}
              >
                <AiFillHome />
              </span>
              <span className="label">Dashboard</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="a-profile">
            <NavLink className="nav-link" to={`/admin/profile/${user?._id}`}>
              <span
                className="icon"
                style={{
                  background:
                    page === `admin/profile/${user?._id}` ? color : "",
                }}
              >
                <FaUserCircle />
              </span>
              <span className="label">Profile</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="a-appointment">
            {/* <Dropdown overlay={menu} trigger={['click']}> */}
            <NavLink className="nav-link" to="/admin/appointments">
              <span
                className="icon"
                style={{
                  background: page === "admin/appointments" ? color : "",
                }}
              >
                <FaUserFriends />
              </span>
              <span className="label">Appointments</span>
            </NavLink>
          </Menu.Item>
          {/* </Dropdown> */}
          <Menu.Item key="a-messenger">
            <NavLink className="nav-link" to={`/admin/messenger3/${user?._id}`}>
              <span
                className="icon"
                style={{
                  background:
                    page === `/admin/messenger3/${user?._id}` ? color : "",
                }}
              >
                <FaUserMd />
              </span>
              <span className="label">Messages</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="a-userlist">
            <NavLink className="nav-link" to="/admin/userslist">
              <span
                className="icon"
                style={{
                  background: page === "admin/userslist" ? color : "",
                }}
              >
                <FaUserFriends />
              </span>
              <span className="label">Patients</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="a-doctorlist">
            <NavLink className="nav-link" to="/admin/doctorslist">
              <span
                className="icon"
                style={{
                  background: page === "admin/doctorslist" ? color : "",
                }}
              >
                <FaUserMd />
              </span>
              <span className="label">Doctors</span>
            </NavLink>
          </Menu.Item>
          {/* <Menu.Item key="a-create">
            <NavLink to="/admin/addadmin">
              <span
                className="icon"
                style={{
                  background: page === "admin/addadmin" ? color : "",
                }}
              >
                <FaUserPlus />
              </span>
              <span className="label">Create Accounts</span>
            </NavLink>
          </Menu.Item> */}
        </Menu>

        <div className="aside-footer">
          <div
            className="footer-box"
            style={{
              background: color,
            }}
          >
            <NavLink to="">
              <span className="icon" style={{ color }}>
                <FaUserCircle />
              </span>
            </NavLink>
            <h6>{user?.firstName}</h6>
            <p>{role}</p>
            <Button
              type="primary"
              className=" ant-btn-block"
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              LOGOUT
            </Button>
          </div>
        </div>
      </>
    );
  }

  // function adminMenu2() {
  //   return (
  //     <>
  //       <Menu
  //         onClick={(items) => {
  //           navigate(items.key);
  //         }}
  //         selectedKeys={selectedKeys}
  //         mode="inline"
  //         style={{
  //           width: 256,
  //         }}
  //         items={adminItems}
  //       ></Menu>
  //     </>
  //   );
  // }

  function activate() {
    return (
      <>
        <div className="brand">
          <img src={logo} alt="" />
          <span>TELE-OBGYN</span>
        </div>
        <hr />
        <Menu defaultSelectedKeys={["a-activate"]} theme="light" mode="inline">
          <Menu.Item key="a-dashboard">
            <NavLink className="nav-link" to="/apply-doctor">
              <span
                className="icon"
                style={{
                  background: page === "/apply-doctor" ? color : "",
                }}
              >
                <AiFillHome />
              </span>
              <span className="label">Activate Account</span>
            </NavLink>
          </Menu.Item>
        </Menu>

        <div className="aside-footer">
          <div
            className="footer-box"
            style={{
              background: color,
            }}
          >
            <NavLink to="">
              <span className="icon" style={{ color }}>
                <FaUserCircle />
              </span>
            </NavLink>
            <h6>{user?.firstName}</h6>
            <p>{role}</p>
            <Button
              type="primary"
              className=" ant-btn-block"
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              LOGOUT
            </Button>
          </div>
        </div>
      </>
    );
  }

  function render() {
    if (user?.isAdmin) {
      return admin();
    } else if (user?.isDoctor) {
      return doctorMenu();
    } else {
      return activate();
    }
  }
  return render();
}

export default Sidenav;
