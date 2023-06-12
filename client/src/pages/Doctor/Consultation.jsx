import AgoraUIKit, { layout } from "agora-react-uikit";
import "agora-react-uikit/dist/index.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../assets/styles/agora.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertSlice";
import toast from "react-hot-toast";
import { Button, Card, Col, Input, Row } from "antd";
import Main from "../../layouts/Main";

function Consultation() {
  // const [name, setName] = useState("");
  const [channelName, setChannelName] = useState("");
  const [channelN, setChannelN] = useState("");
  var [token, setToken] = useState("");
  // const dispatch = useDispatch();
  const [videoCall, setVideoCall] = useState(false);
  const isHost = useState(true);
  const [isPinned, setPinned] = useState(false);
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://fuentes-clinic.onrender.com/api/doctor/get-user-info-by-id",
        {
          _id: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());

      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setChannelName(e.target.value);
  };

  const handleValue = (e) => {
    setChannelN(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any actions with the input value here
    console.log("Input value:", channelName);
  };

  const onCreate = async () => {
    if (channelName.trim() === "") {
      // setValidateError (true);
      return;
    }

    try {
      const url = `https://token-server-20wg.onrender.com/rtc/${channelName}/publisher/uid/0`;
      const response = await axios.get(url);
      const data = response.data;
      const token = data.rtcToken;
      setToken(token);
      update(token);
      localStorage.setItem("rtcToken", token);

      console.log(token);

      // Display success message
      toast.success("Channel created!");
    } catch (error) {
      toast.error("Error creating channel", error);
    }
  };

  const update = async (token) => {
    try {
      const data = {
        rtcToken: token,
      };
      const id = "6332d5608231d41a72504a13";
      const response = await axios.patch(
        `https://fuentes-clinic.onrender.com/api/doctor/updateRtcToken/${user._id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error updating RTC token:", error);
    }
  };

  // console.log("asdasdsadsadas"+token);
  var dbToken = doctor?.rtcToken;
  // console.log("dbToken"+dbToken);
  if (token === "") {
    token = dbToken;
    //console.log("eto"+token);
  }
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flex: 1,
        backgroundColor: "#e0e0e0",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        {videoCall ? (
          <>
            <div
              style={{ display: "flex", justifyContent: "space-around" }}
            ></div>
            <AgoraUIKit
              rtcProps={{
                appId: process.env.REACT_APP_AGORA_APP_ID,
                channel: channelN,
                token: token, //add your token if using app in secured mode
                role: isHost ? "host" : "audience",
                layout: isPinned ? layout.pin : layout.grid,
                //...parseParams(),
              }}
              rtmProps={{
                username: user?.name || "user",
                displayUsername: true,
              }}
              callbacks={{
                EndCall: () => setVideoCall(false),
              }}
            />
          </>
        ) : (
          <div className="wrapper index">
            {/* <div className="ag-header"></div> */}
            <div className="ag-main">
              <section className="login-wrapper">
                <div className="login-header">
                  <img src={require("../../assets/images/logo-3.png")} alt="" />
                </div>
                {/* <Card bordered className="cricle-box h-full wider-card">
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Input
                        className="input-margin"
                        placeholder="Enter room name"
                        value={channelN}
                        onChange={handleValue}
                      />
                    </Col>
                    <Col span={12}>
                      <Input
                        className="input-margin"
                        placeholder="Create a room name"
                        value={channelName}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Button
                        className="agora-buttons"
                        type="primary"
                        danger
                        onClick={() => setVideoCall(true)}
                      >
                        Start Call
                      </Button>
                    </Col>
                    <Col span={12}>
                      <Button
                        className="agora-buttons"
                        type="primary"
                        danger
                        onClick={onCreate}
                      >
                        Create
                      </Button>
                    </Col>
                  </Row>
                </Card> */}

                <div className="login-body">
                  <div className="columns">
                    <div className="column is-12">
                      <div className="join">
                        <div className="row">
                          <div className="col">
                            <Input
                              className="input-margin"
                              placeholder="Enter room name"
                              value={channelN}
                              onChange={handleValue}
                            />
                            <Button
                              className="agora-button2"
                              // type="primary"
                              // danger
                              onClick={() => setVideoCall(true)}
                            >
                              Start Call
                            </Button>
                          </div>

                          <div className="col">
                            <Input
                              className="input-margin"
                              placeholder="Create a room name"
                              value={channelName}
                              onChange={handleChange}
                            />
                            <Button
                              className="agora-button2"
                              onClick={onCreate}
                            >
                              Create
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
          
        )}
      </div>
    </div>
  );
}

export default Consultation;
