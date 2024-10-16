import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import "./AppLoader.css";

export const AppLoader = (props) => {
    return (
        <Backdrop
            sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjusted to 0.5 for transparency
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={props.loading}
        >
            <CircularProgress size={80} />
        </Backdrop>
    );
};
