import { useEffect, useState, useRef } from "react";
import MessageHeader from "./MessageHeader/MessageHeader.component";
import MessageInput from "./MessageInput/messageInput.component";
import MessageContent from "./MessageContent/MessageContent.component";
import { ref, onChildAdded, off } from "firebase/database";
import { realTimeDb } from "../../server/firebase";
import { useSelector } from "react-redux";
import { Typography, Box } from "@mui/material";

const Messages = () => {
  const user = useSelector((state) => state.user.currentUser);
  const channel = useSelector((state) => state.channel.currentChannel);
  // console.log("Channel : ",  channel);
  // console.log("User : " ,user);
  const [messageState, setMessageState] = useState([]);
  const [searchTermState, setSearchTermState] = useState("");
  const lastMessageRef = useRef(null); // Reference to track the last message

  // Listen for new messages
  useEffect(() => {
    if (channel) {
      // Clear the message state when the channel changes
      setMessageState([]);

      // Define the message reference
      const messageRef = ref(realTimeDb, `messages/${channel.id}`);

      // Listen for new messages added to the channel
      const childAddedListener = onChildAdded(messageRef, (snap) => {
        const newMessage = snap.val();

        // Ensure that we don't add duplicate messages
        setMessageState((currentMessages) => {
          // Check if message with same ID already exists
          const isMessagePresent = currentMessages.some(
            (message) => message.id === newMessage.id
          );

          // If message isn't present, add it to the state
          if (!isMessagePresent) {
            return [...currentMessages, newMessage];
          }

          return currentMessages; // No change if duplicate is found
        });
      });

      // Cleanup the listener when the component unmounts or channel changes
      return () => {
        off(messageRef, "child_added", childAddedListener);
      };
    }
  }, [channel]); // Ensure that this effect re-runs when `channel` changes

  // Scroll to the last message when a new message is added
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageState]);

  const displayMessages = () => {
    const messageToDisplay = searchTermState ? filterMessageBySearchTerm() : messageState;
    if (messageToDisplay.length > 0) {
      return messageToDisplay.map((message, index) => (
        <MessageContent
          ownMessage={message.user.id === user.uid}
          key={message.id}
          message={message}
          // Attach the ref to the last message
          ref={index === messageToDisplay.length - 1 ? lastMessageRef : null}
        />
      ));
    }
    return <Typography>No messages yet</Typography>;
  };

  if (!channel) {
    return <Typography>Select a channel to view messages</Typography>;
  }

  const cntUniqueUsers = () => {
    const uniqueUsers = messageState.reduce((acc, message) => {
      if (!acc.includes(message.user.name)) acc.push(message.user.name);
      return acc;
    }, []);
    return uniqueUsers.length;
  };

  const searchTermChange = (event) => {
    const target = event.target;
    setSearchTermState(target.value);
  };

  const filterMessageBySearchTerm = () => {
    const regex = new RegExp(searchTermState, "gi");
    const messages = messageState.reduce((acc, message) => {
      if (
        (message.content && message.content.match(regex)) ||
        message.user.name.match(regex)
      ) {
        acc.push(message);
      }
      return acc;
    }, []);

    return messages;
  };
  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "space-between",
      }}
    >
      <MessageHeader
        channelName={channel?.name}
        uniqueUsers={cntUniqueUsers()}
        searchTermChange={searchTermChange}
        isPrivateChat = {channel.isPrivateChat}
      />
      <Box
        sx={{
          overflowY: "scroll", // Ensure this is a valid value
          flexGrow: 1,
          paddingBottom: "80px", // Adjust this to the height of your input box
        }}
      >
        {displayMessages()}
      </Box>
      <MessageInput />
    </Box>
  );
};

export default Messages;
