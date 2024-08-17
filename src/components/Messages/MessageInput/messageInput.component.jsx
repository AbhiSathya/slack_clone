import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Box, TextField, IconButton, InputAdornment } from "@mui/material";
import { Send as SendIcon, Upload as UploadIcon } from "@mui/icons-material";
import { realTimeDb } from "../../../server/firebase";
import { ref as dbRef, push, set, serverTimestamp } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSelector } from "react-redux";
import { ImageUpload } from "../ImageUpload/ImageUpload.component";
// import { mime } from "mime-types";

const storage = getStorage();

const MessageInput = () => {
  const [messageState, setMessageState] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [fileDialogState, setFileDialogState] = useState(false);

  const user = useSelector((state) => state.user.currentUser);
  const channel = useSelector((state) => state.channel.currentChannel);

  if (!channel || !channel.id) {
    console.warn("Channel is not defined or missing id.");
    return null;
  }

  const createMessageInfo = () => {
    return {
      id: uuidv4(),
      user: {
        avatar: user.photoURL,
        name: user.displayName,
        id: user.uid,
      },
      content: messageState,
      timestamp: serverTimestamp(),
    };
  };

  const sendMessage = async () => {
    if (messageState.trim() && !isSending) {
      setIsSending(true);

      const messageRef = dbRef(realTimeDb, `messages/${channel.id}`);
      const newMessageRef = push(messageRef);

      try {
        await set(newMessageRef, createMessageInfo());
        console.log("Message sent");
        setMessageState("");
      } catch (error) {
        console.error("Error sending message: ", error);
      } finally {
        setIsSending(false);
      }
    }
  };

  const onMessageChange = (event) => {
    setMessageState(event.target.value);
  };

  const createActionBtns = () => (
    <>
      <IconButton onClick={() => sendMessage()} disabled={isSending}>
        <SendIcon />
      </IconButton>
      <IconButton onClick={() => setFileDialogState(true)} >
        <UploadIcon />
      </IconButton>
    </>
  );

  const uploadImage = (file, contentType) => {
    const filePath = `chat/images/${uuidv4()}.jpg`;
    const storageReference = storageRef(storage, filePath);

    const uploadTask = uploadBytes(storageReference, file, { contentType: contentType });
    uploadTask
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((url) => {
        // Create a message with the image URL and send it
        const imageMessage = {
          ...createMessageInfo(),
          content: "", // You can also set some content if needed
          image: url,  // Add the image URL
        };
        const messageRef = dbRef(realTimeDb, `messages/${channel.id}`);
        const newMessageRef = push(messageRef);

        return set(newMessageRef, imageMessage);
      })
      .then(() => console.log("Image message sent"))
    //   .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };


  return (
    <>
      {/* Other content of the page goes here */}

      {/* The message input box */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: 2,
          position: "fixed", // Fixed positioning
          bottom: 0, // Sticks to the bottom of the screen
          left: 280,
          right: 0,
          backgroundColor: "white", // Background color to ensure visibility
          zIndex: 1000, // Ensure it's above other content
          boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)", // Optional shadow for better visual
        }}
      >
        <TextField
          name="message"
          value={messageState}
          placeholder="Type your message here..."
          variant="outlined"
          onChange={onMessageChange}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {createActionBtns()}
              </InputAdornment>
            ),
          }}
        />
        <ImageUpload
          uploadImage={uploadImage}
          open={fileDialogState}
          onClose={() => setFileDialogState(false)}
        />
      </Box>
    </>
  );
};

export default MessageInput;
