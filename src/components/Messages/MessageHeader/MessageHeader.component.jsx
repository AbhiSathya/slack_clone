/* eslint-disable react/prop-types */
import { Box, Typography, TextField, IconButton } from "@mui/material";
import { Search as SearchIcon, StarBorder as StarBorderIcon } from "@mui/icons-material";

const MessageHeader = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        border: "2px solid grey",
        borderRadius: 1,
        margin: 2,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h4" component="div" sx={{ display: "flex", alignItems: "center" }}>
            {props.channelName}
          </Typography>
          <IconButton>
            <StarBorderIcon fontSize="large" />
          </IconButton>
        </Box>
        <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
          {props.uniqueUsers} {props.uniqueUsers > 1 ? "Users" : "User"}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          name="search"
          placeholder="Search Messages"
          size="small"
          variant="outlined"
          onChange = {props.searchTermChange}
          InputProps={{
            endAdornment: (
              <SearchIcon />
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default MessageHeader;
