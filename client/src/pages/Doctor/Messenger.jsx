import "@stream-io/stream-chat-css/dist/css/index.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Channel, ChannelList, Chat, LoadingIndicator } from "stream-chat-react";
import { getRandomImage } from "../../assets";
import "../../assets/styles/social-messenger.css";
import {
  ChannelInner, CreateChannel,
  CustomMessage,
  MessagingChannelList,
  MessagingChannelPreview,
  MessagingInput,
  MessagingThreadHeader
} from "../../components";
import { useClient } from "../../hooks/chatClient";
import Main from "../../layouts/Main";

const urlParams = new URLSearchParams(window.location.search);
const apiKey = process.env.REACT_APP_API_KEY;
const userToken = localStorage.getItem("streamToken");

const skipNameImageSet = urlParams.get("skip_name_image_set") || false;

export const GiphyContext = React.createContext({});

const Messenger = () => {
  const [giphyState, setGiphyState] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isMobileNavVisible, setMobileNav] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [theme] = useState("light");


  const userToConnect = {
    id: user?._id,
    name: user?.name,
    image: getRandomImage(),
  };
  
  if (skipNameImageSet) {
    delete userToConnect.name;
    delete userToConnect.image;
  }


  const filters = { type: "messaging", members: { $in: [user?._id] } };

  const options = { state: true, watch: true, presence: true, limit: 8 };

  const sort = {
    last_message_at: -1,
    updated_at: -1,
  };



  // useEffect(() => {
  //   const initChat = async () => {
  //     const client = StreamChat.getInstance(apiKey, {
  //       enableInsights: true,
  //       enableWSFallback: true,
  //     });
  //     await client.connectUser(userToConnect, userToken);
  //     setChatClient(client);
  //   };

  //   initChat();

  //   return () => chatClient?.disconnectUser();
  // }, []); // eslint-disable-line

  useEffect(() => {
    const mobileChannelList = document.querySelector("#mobile-channel-list");
    if (isMobileNavVisible && mobileChannelList) {
      mobileChannelList.classList.add("show");
      document.body.style.overflow = "hidden";
    } else if (!isMobileNavVisible && mobileChannelList) {
      mobileChannelList.classList.remove("show");
      document.body.style.overflow = "auto";
    }
  }, [isMobileNavVisible]);

  useEffect(() => {
    /*
     * Get the actual rendered window height to set the container size properly.
     * In some browsers (like Safari) the nav bar can override the app.
     */
    const setAppHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty("--app-height", `${window.innerHeight}px`);
    };

    setAppHeight();

    window.addEventListener("resize", setAppHeight);
    return () => window.removeEventListener("resize", setAppHeight);
  }, []);

  const toggleMobile = () => setMobileNav(!isMobileNavVisible);
  const giphyContextValue = { giphyState, setGiphyState };

  const chatClient = useClient({
    apiKey: apiKey,
    userData: userToConnect,
    tokenOrProvider: userToken,
  });

  if (!chatClient) {
    return <LoadingIndicator />;
  }

  return (
    <Main>
      <Chat client={chatClient} theme={`messaging ${theme}`}>
        <div id="mobile-channel-list" onClick={toggleMobile}>
          <ChannelList
            filters={filters}
            sort={sort}
            options={options}
            List={(props) => (
              <MessagingChannelList {...props} onCreateChannel={() => setIsCreating(!isCreating)} />
            )}
            Preview={(props) => <MessagingChannelPreview {...props} {...{ setIsCreating }} />}
          />
        </div>
        <div>
          <Channel
            Input={MessagingInput}
            maxNumberOfFiles={10}
            Message={CustomMessage}
            multipleUploads={true}
            ThreadHeader={MessagingThreadHeader}
            TypingIndicator={() => null}
          >
            {isCreating && (
              <CreateChannel toggleMobile={toggleMobile} onClose={() => setIsCreating(false)} />
            )}
            <GiphyContext.Provider value={giphyContextValue}>
              <ChannelInner theme={theme} toggleMobile={toggleMobile} />
            </GiphyContext.Provider>
          </Channel>
        </div>
      </Chat>
    </Main>
  );
};

export default Messenger;
