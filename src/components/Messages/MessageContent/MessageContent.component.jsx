import React from "react";
import { Avatar, Typography, Box, Card, CardContent, Button } from "@mui/material";
import { Download as DownloadIcon, InsertDriveFile as FileIcon } from "@mui/icons-material";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import enIN from "javascript-time-ago/locale/en-IN";
import MediaContent from "./MediaContent";
import { isAudioFile, isImageFile, isVideoFile } from "./FileHandler";
import "./MessageContent.css";

// Configure TimeAgo
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(enIN);

const timeAgo = new TimeAgo("en-IN");

const MessageContent = React.forwardRef((props, ref) => {
  const { message, ownMessage, imageLoaded } = props;

  // Format the timestamp
  const formattedTime = message.timestamp ? timeAgo.format(new Date(message.timestamp)) : "";

  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", mb: 0.5, backgroundColor: "#FFFF" }} ref={ref}>
      <Avatar src={message.user.avatar} sx={{ mr: 1 }} />
      <Card sx={{ width: "700px" }}>
        <CardContent className={ownMessage ? "ownMessage" : ""}>
          <Typography variant="subtitle1" gutterBottom>
            {message.user.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
            {formattedTime}
          </Typography>
          <Typography variant="body1" sx={{ wordWrap: "break-word" }}>
            {message.content}
          </Typography>

          {/* Use the MediaContent component to handle image, audio, and video rendering */}
          <MediaContent message={message} imageLoaded={imageLoaded} />

          {/* Display file name and download button for non-media files */}
          {message.file && !isImageFile(message.file) && (
            <Box sx={{ mt: 1, display: "flex", alignItems: "center" }}>
              <FileIcon sx={{ marginRight: 1 }} />
              <Typography variant="body2" sx={{ mr: 1 }}>
                {message.file.name}
              </Typography>
              {(!isAudioFile(message.file) && !isVideoFile(message.file)) && <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<DownloadIcon />}
                onClick={() => window.open(message.file.url, "_blank")}
                aria-label={`Download ${message.file.name}`}
              >
                Download
              </Button>}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
});

MessageContent.displayName = "MessageContent";

export default MessageContent;
