import AgoraUIKit, { layout } from "agora-react-uikit";
import "agora-react-uikit/dist/index.css";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../../assets/styles/agora.css";

import toast from "react-hot-toast";

function Consultation() {
  // const [name, setName] = useState("");
  const [channelName, setChannelName] = useState("");
  const [token, setToken] = useState("");
  // const dispatch = useDispatch();
  // const getAgoraToken = async (channelName) => {
  //   try {
  //     dispatch(showLoading());
  //     const response = await axios.get(
  //       "https://generate-token-teleconsultatio.herokuapp.com/rtc/" +
  //         channelName +
  //         "/publisher/uid/0",
  //       // {
  //       //   // headers: {
  //       //   //   Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       //   // },
  //       // }
  //     );
  //     dispatch(hideLoading());
  //     if (response.success) {
  //       toast.success("Token generated successfully");
  //       setToken(response.rtcToken);
  //       console.log(response.rtcToken);
        
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     dispatch(hideLoading());
  //   }
  // };

  const [videoCall, setVideoCall] = useState(false);
  const isHost = useState(true);
  const [isPinned, setPinned] = useState(false);
  const { user } = useSelector((state) => state.user);

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
                token: "007eJxTYHjDEs3SEmjD/DxfcvOzDcoqm6+q8vjETO9fydayffJKRTcFBmNTi0QDA8tEozQDQ5NECwOLlGSzpLRUC2MjEDJJVDlZlNwQyMiQPCuVgREKQXx2huT8vOLSnBIGBgDSWx3s", //add your token if using app in secured mode
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
            <div className="ag-header"></div>
            <div className="ag-main">
              <section className="login-wrapper">
                <div className="login-header">
                  <img src={require("../../assets/images/logo-3.png")} alt="" />
                </div>
                <div className="login-body">
                  <div className="columns">
                    <div className="column is-12">
                      <div className="join">
                        <div className="row">
                          <div className="col">
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
                          </div>

                          {/* <div className="col">
                            <input
                              className="text-danger"
                              type="text"
                              placeholder="Create Channel"
                              onChange={handleInput}
                            />
                            <button
                              className="text-danger"
                              onClick={() => getAgoraToken(handleInput)}
                            >
                              Create Channel
                            </button>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="ag-footer">
              <a className="ag-href text-danger" href="https://www.agora.io">
                <span>Powered By Agora</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Consultation;
