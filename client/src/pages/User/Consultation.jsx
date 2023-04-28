import React, { useState } from "react";
import Main from "../../layouts/Main";
import AgoraUIKit, { layout } from "agora-react-uikit";
import "agora-react-uikit/dist/index.css";
import { useSelector } from "react-redux";
import "../../assets/styles/agora.css";

function Consultation() {
  const [videoCall, setVideoCall] = useState(false);
  const isHost = useState(true);
  const [isPinned, setPinned] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [enableVideo, setEnableVideo] = useState();

  return (
    //<Main>
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flex: 1,
        backgroundColor: "#FAFAFA",
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
                channel: "consult",
                token:
                "007eJxTYHjDEs3SEmjD/DxfcvOzDcoqm6+q8vjETO9fydayffJKRTcFBmNTi0QDA8tEozQDQ5NECwOLlGSzpLRUC2MjEDJJVDlZlNwQyMiQPCuVgREKQXx2huT8vOLSnBIGBgDSWx3s",
                role: isHost ? "host" : "audience",
                layout: isPinned ? layout.pin : layout.grid,
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
            <div className="ag-header"></div>
            <div className="ag-main">
              <section className="login-wrapper">
                <div className="login-header">
                  <img src={require("../../assets/images/logo-3.png")} alt="" />
                </div>
                <div className="login-body">
                  <div className="columns">
                    <div className="column is-12">
                      <form className="join">
                        {/* <input
                          className="text-danger"
                          type="text"
                          placeholder="Enter Channel Name"
                        /> */}
                        <button
                          className="text-danger"
                          onClick={() => setVideoCall(true)}
                        >
                          Start Call
                        </button>
                      </form>
                    </div>
                  </div>
                  {/* <div className="columns">
                    <div className="column">
                      <div id="attendeeMode" className="control">
                        <label className="radio">
                          <input
                            onChange={(e) =>
                              this.setState({ attendeeMode: e.target.value })
                            }
                            value="video"
                            type="radio"
                            name="attendee"
                            defaultChecked
                          />
                          <span className="radio-btn"></span>
                          <span className="radio-img video"></span>
                          <span className="radio-msg">
                            Video Call : join with video call
                          </span>
                        </label>
                        <br />
                        <label className="radio">
                          <input
                            onChange={(e) =>
                              this.setState({ attendeeMode: e.target.value })
                            }
                            value="audio-only"
                            type="radio"
                            name="attendee"
                          />
                          <span className="radio-btn"></span>
                          <span className="radio-img audio"></span>
                          <span className="radio-msg">
                            Audio-only : join with audio call
                          </span>
                        </label>
                        <br />
                        <label className="radio">
                          <input
                            onChange={(e) =>
                              this.setState({ attendeeMode: e.target.value })
                            }
                            value="audience"
                            type="radio"
                            name="attendee"
                          />
                          <span className="radio-btn"></span>
                          <span className="radio-img audience"></span>
                          <span className="radio-msg">
                            Audience : join as an audience
                          </span>
                        </label>
                      </div>
                    </div>
                  </div> */}
                </div>
                <div className="login-footer">
                  {/* <h3
                    style={{
                      backgroundColor: "#FF788E",
                      cursor: "pointer",
                      borderRadius: 5,
                      padding: "4px 8px",
                      color: "#ffffff",
                      fontSize: 20,
                    }}
                    onClick={() => setVideoCall(true)}
                  >
                    Start Call
                  </h3> */}
                </div>
              </section>
            </div>
            <div className="ag-footer">
              <a className="ag-href text-danger" href="https://www.agora.io">
                <span>Powered By Agora</span>
              </a>
            </div>
          </div>
          // <div
          //   style={{
          //     display: "flex",
          //     justifyContent: "center",
          //     alignItems: "center",
          //     height: "100vh",
          //   }}
          // >
          // <h3
          //   style={{
          //     backgroundColor: "#007bff",
          //     cursor: "pointer",
          //     borderRadius: 5,
          //     padding: "4px 8px",
          //     color: "#ffffff",
          //     fontSize: 20,
          //   }}
          //   onClick={() => setVideoCall(true)}
          // >
          //   Start Call
          // </h3>
          // </div>
        )}
      </div>
    </div>
    //</Main>
  );
}

export default Consultation;
