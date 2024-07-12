import React from 'react';
import { Avatar, Typography, Box, Card, CardContent } from '@mui/material';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import enIN from 'javascript-time-ago/locale/en-IN';

import './MessageContent.css';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(enIN);

const timeAgo = new TimeAgo('en-IN');

const MessageContent = (props) => {
    const { message } = props;

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'flex-start',
                mb: 2,
                borderRadius: '8px',
                boxShadow: 1,
                padding: '10px',
                backgroundColor: '#fff',
            }}
        >
            <Avatar src={message.user.avatar} sx={{ mr: 2 }} />
            <Card sx={{ flexGrow: 1 }}>
                <CardContent>
                    <Typography variant="h6" component="div">
                        {message.user.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                        {timeAgo.format(new Date(message.timestamp))}
                    </Typography>
                    <Typography variant="body1">
                        {message.content}
                    </Typography>
                    {message.image && (
                        <Box sx={{ mt: 2 }}>
                            <img src={message.image} alt="Message content" style={{ maxWidth: '100%' }} onLoad={props.imageLoaded} />
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default MessageContent;
