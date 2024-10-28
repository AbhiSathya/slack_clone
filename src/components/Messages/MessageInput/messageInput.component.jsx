import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Box, TextField, IconButton, InputAdornment, Stack } from "@mui/material";
import { Send as SendIcon, Upload as UploadIcon } from "@mui/icons-material";
import { realTimeDb } from "../../../server/firebase";
import { ref as dbRef, push, set, serverTimestamp } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSelector } from "react-redux";
import FileUpload from "../FileUpload/FileUpload.component"; // Use the updated FileUpload component
import Picker from '@emoji-mart/react';

const storage = getStorage();

const MessageInput = () => {
  const [messageState, setMessageState] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [fileDialogState, setFileDialogState] = useState(false);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

  const user = useSelector((state) => state.user.currentUser);
  const channel = useSelector((state) => state.channel.currentChannel);

  if (!channel || !channel.id) {
    console.warn("Channel is not defined or missing id.");
    return null;
  }

  const createMessageInfo = () => ({
    id: uuidv4(),
    user: {
      avatar: user.photoURL,
      name: user.displayName,
      id: user.uid,
    },
    content: messageState,
    timestamp: serverTimestamp(),
  });

  const sendMessage = async () => {
    if (messageState.trim() && !isSending) {
      setIsSending(true);

      const messageRef = dbRef(realTimeDb, `messages/${channel.id}`);
      const newMessageRef = push(messageRef);

      try {
        await set(newMessageRef, createMessageInfo());
        console.log("Message sent");
        setMessageState("");
        setEmojiPickerVisible(false);
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

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessageState((prev) => prev + emoji.native);
  };

  const toggleEmojiPicker = () => {
    setEmojiPickerVisible((prev) => !prev);
  }

  const createActionBtns = () => (
    <>
      <IconButton onClick={sendMessage} disabled={isSending}>
        <SendIcon />
      </IconButton>
      <IconButton onClick={() => setFileDialogState(true)}>
        <UploadIcon />
      </IconButton>
      <IconButton onClick={toggleEmojiPicker}>
        <span role="img" aria-label="emoji">😊</span>
      </IconButton>
    </>
  );

  const uploadFile = (file, contentType) => {
    const filePath = `chat/files/${uuidv4()}_${file.name}`;
    const storageReference = storageRef(storage, filePath);

    uploadBytes(storageReference, file, { contentType })
      .then((snapshot) => getDownloadURL(snapshot.ref))
      .then((url) => {
        const fileMessage = {
          ...createMessageInfo(),
          content: "", // Optional content
          file: { url, name: file.name },  // File details
        };
        const messageRef = dbRef(realTimeDb, `messages/${channel.id}`);
        const newMessageRef = push(messageRef);
        
        return set(newMessageRef, fileMessage);
      })
      .then(() => console.log("File message sent"))
      .catch((err) => console.error("Error uploading file:", err));
  };

  return (
    <Stack sx={{ position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          padding: 2,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          zIndex: 1000,
          boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
      >
        <TextField
          name="message"
          value={messageState}
          placeholder="Type your message here..."
          variant="outlined"
          onChange={onMessageChange}
          onKeyDown={handleKeyPress}
          fullWidth
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">{createActionBtns()}</InputAdornment>,
            }
          }}
        />
        
        <FileUpload
          uploadFile={uploadFile} // Updated to call uploadFile function
          open={fileDialogState}
          onClose={() => setFileDialogState(false)}
        />
      </Box>

      {emojiPickerVisible && (
        <Box sx={{ position: "absolute", bottom: "90px", right: "40px", zIndex: 1001 }}>
          <Picker onEmojiSelect={handleEmojiSelect} />
        </Box>
      )}
    </Stack>
  );
};

export default MessageInput;
