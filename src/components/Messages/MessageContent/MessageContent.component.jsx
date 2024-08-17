/* eslint-disable react/prop-types */
import React from "react";
import { Avatar, Typography, Box, Card, CardContent } from "@mui/material";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import enIN from "javascript-time-ago/locale/en-IN";

import "./MessageContent.css";

// Configure TimeAgo
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(enIN);

const timeAgo = new TimeAgo("en-IN");

const MessageContent = React.forwardRef((props, ref) => {
  const { message, ownMessage, imageLoaded } = props;

  // Ensure timestamp is valid
  const formattedTime = message.timestamp
    ? timeAgo.format(new Date(message.timestamp))
    : "";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        mb: 0.5,
        backgroundColor: "#FFFF",
      }}
      ref={ref} // Attach ref here if needed
    >
      <Avatar src={message.user.avatar} sx={{ mr: 1 }} />
      <Card sx={{ width: "700px" }}>
        <CardContent className={ownMessage ? "ownMessage" : null}>
          <Typography variant="subtitle1" gutterBottom>
            {message.user.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
            {formattedTime}
          </Typography>
          <Typography variant="body1" sx={{ wordWrap: "break-word" }}>
            {message.content}
          </Typography>

          {message.image && (
            <Box sx={{ mt: 1, display: "flex", justifyContent: "left" }}>
              <img
                src={message.image}
                alt="Message content"
                style={{
                  maxWidth: "100%", // Adjust width as needed
                  maxHeight: "500px", // Adjust height as needed
                  objectFit:"cover", // Maintain aspect ratio
                  borderRadius: 4,
                }}
                onLoad={imageLoaded}
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
});

MessageContent.displayName = "MessageContent"; // Helpful for debugging

export default MessageContent;
