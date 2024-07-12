import { useEffect, useState } from "react";
import MessageHeader from "./MessageHeader/MessageHeader.component";
import MessageInput from "./MessageInput/messageInput.component";
import MessageContent from "./MessageContent/MessageContent.component";
import { ref, onChildAdded, off } from "firebase/database";
import { realTimeDb } from "../../server/firebase";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

const Messages = () => {
  const channel = useSelector((state) => state.channel.currentChannel);
  const [messageState, setMessageState] = useState([]);

  useEffect(() => {
    if (channel) {
      const messageRef = ref(realTimeDb, `messages/${channel.id}`);
      const childAddedListener = onChildAdded(messageRef, (snap) => {
        setMessageState((currentMessage) => {
          let updatedMessageState = [...currentMessage];
          updatedMessageState.push(snap.val());
          return updatedMessageState;
        });
      });

      return () => off(messageRef, "child_added", childAddedListener);
    }
  }, [channel]);

  const displayMessages = () => {
    if (messageState.length > 0) {
      return messageState.map((message) => (
        <MessageContent key={message.timestamp} message={message} />
      ));
    }
    return <Typography>No messages yet</Typography>;
  };

  if (!channel) {
    return <Typography>Select a channel to view messages</Typography>;
  }

  return (
    <div>
      <MessageHeader />
      <div>
        {displayMessages()}
      </div>
      <MessageInput />
    </div>
  );
};

export default Messages;
