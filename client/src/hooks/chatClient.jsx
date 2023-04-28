import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StreamChat } from "stream-chat";

export const useClient = ({ apiKey, userData, tokenOrProvider }) => {
    const [chatClient, setChatClient] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {
    //   const client = new StreamChat(apiKey);
    const client = StreamChat.getInstance(apiKey, {
      enableInsights: true,
      enableWSFallback: true,
    });
      
    // prevents application from setting stale client (user changed, for example)
    let didUserConnectInterrupt = false;

    const connectionPromise = client.connectUser(userData, tokenOrProvider).then(() => {
      if (!didUserConnectInterrupt) setChatClient(client);
    });

    return () => {
      didUserConnectInterrupt = true;
      setChatClient(null);
      // wait for connection to finish before initiating closing sequence
      connectionPromise
          .then(() => client.disconnectUser())
          // .then(()=> navigate('/'))
        .then(() => {
          console.log("connection closed");
        });
        
    };
  }, [apiKey, userData.id, tokenOrProvider]);

  return chatClient;
};
