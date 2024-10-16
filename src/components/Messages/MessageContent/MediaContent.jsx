import React from "react";
import { Box, Button } from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";
import { isImageFile, isAudioFile, isVideoFile } from "./FileHandler";

const MediaContent = ({ message, imageLoaded }) => {
  return (
    <>
      {message.file && (
        <Box sx={{ mt: 1, display: "flex", alignItems: "center" }}>
          {isImageFile(message.file) ? (
            <Box sx={{ display: "flex", justifyContent: "left" }}>
              <img
                src={message.file.url}
                alt="File attachment"
                style={{ maxWidth: "500px", maxHeight: "500px", objectFit: "cover", borderRadius: 4, marginRight: 8 }}
                onLoad={imageLoaded}
              />
            </Box>
          ) : isAudioFile(message.file) ? (
            <audio controls style={{ width: '100%' }}>
              <source src={message.file.url} type={`audio/${message.file.name.split('.').pop()}`} />
              Your browser does not support the audio element.
            </audio>
          ) : isVideoFile(message.file) ? (
            <video controls style={{ maxWidth: "100%", maxHeight: "300px" }}>
              <source src={message.file.url} type={`video/${message.file.name.split('.').pop()}`} />
              Your browser does not support the video element.
            </video>
          ) : null}
        </Box>
      )}
    </>
  );
};

export default MediaContent;
