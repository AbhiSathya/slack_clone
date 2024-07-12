import { useState } from "react";
import { Box, TextField, IconButton, InputAdornment } from "@mui/material";
import { Send as SendIcon, Upload as UploadIcon } from "@mui/icons-material";
import { realTimeDb } from "../../../server/firebase";
import { ref, push, set, serverTimestamp } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";

const MessageInput = () => {
    const [messageState, setMessageState] = useState("");

    // const dispatch = useDispatch();
    const user = useSelector(state => state.user.currentUser);
    const channel = useSelector(state => state.channel.currentChannel);

    const createMessageInfo = () => {
        return {
            user: {
                avatar: user.photoURL,
                name: user.displayName,
                id: user.uid,
            },
            content: messageState,
            timestamp: serverTimestamp()
        };
    };

    const onSubmit = async () => {
        if (messageState) {
            const messageRef = ref(realTimeDb, `messages/${channel.id}`);
            const newMessageRef = push(messageRef);

            try {
                await set(newMessageRef, createMessageInfo());
                console.log("Message sent");
                setMessageState("");
            } catch (error) {
                console.log(error);
            }
        }
    };

    const onMessageChange = (event) => {
        setMessageState(event.target.value);
    };

    const createActionBtns = () => (
        <>
            <IconButton onClick={onSubmit}>
                <SendIcon />
            </IconButton>
            <IconButton>
                <UploadIcon />
            </IconButton>
        </>
    );

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
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
        </Box>
    );
};

export default MessageInput;
