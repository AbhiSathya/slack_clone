/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Box, Input, Modal, Button, Typography } from '@mui/material';
import { Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';

export const ImageUpload = (props) => {
  const [fileState, setFileState] = useState(null);

  const acceptedTypes = ['image/png', 'image/jpeg'];

  const onFileAdded = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileState(file);
    }
  };

  const submit = () => {
    if (fileState && acceptedTypes.includes(fileState.type)) {
      props.uploadImage(fileState, fileState.type);
      props.onClose();
      setFileState(null);
    } else {
      console.error('File type is not accepted');
    }
  };

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2">
          Select an image
        </Typography>
        <p>File Type(png, Jpeg)</p>
        <Input
          type="file"
          name="file"
          onChange={onFileAdded}
          fullWidth
          sx={{ mt: 2, mb: 2 }}
          inputProps={{ accept: '.png, .jpeg' }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="success"
            onClick={submit}
            startIcon={<CheckIcon />}
            sx={{ mr: 1 }}
          >
            Add
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={props.onClose}
            startIcon={<CloseIcon />}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
