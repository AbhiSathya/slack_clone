import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MenuItem, MenuList, IconButton, Modal, Button, TextField, Typography, Box } from '@mui/material';
import { Add as AddIcon, SyncAlt as SyncAltIcon, Check as CheckIcon, Cancel as CancelIcon } from '@mui/icons-material';

import { ref, onChildAdded, off, push, set } from "firebase/database";
import { realTimeDb } from '../../../server/firebase';

import { setChannel } from '../../../store/actioncreater';
import './Channels.css';

const Channels = () => {
    const [modalOpenState, setModalOpenState] = useState(false);
    const [channelAddState, setChannelAddState] = useState({ name: '', description: '' });
    const [isLoadingState, setLoadingState] = useState(false);
    const [channelsState, setChannelsState] = useState([]);

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currentUser);
    const currentChannel = useSelector(state => state.channel.currentChannel);
    const channelsRef = ref(realTimeDb, "channels");

    const menuRef = useRef(null);

    useEffect(() => {
        const childAddedListener = onChildAdded(channelsRef, (snap) => {
            setChannelsState((currentState) => {
                const channel = snap.val();
                if (!currentState.find(ch => ch.id === channel.id)) {
                    return [...currentState, channel];
                }
                return currentState;
            });
        });

        return () => off(channelsRef, 'child_added', childAddedListener);
    }, [channelsRef]);

    useEffect(() => {
        if (channelsState.length > 0 && !currentChannel) {
            dispatch(setChannel(channelsState[0]));
        }
        // Update the active state of menu items
        if (menuRef.current) {
            const items = menuRef.current.querySelectorAll('.menu-item');
            items.forEach(item => item.classList.remove('active'));

            const activeChannelId = currentChannel?.id;
            const targetItem = Array.from(items).find(item => item.dataset.channelId === activeChannelId) || items[0];
            if (targetItem) {
                targetItem.classList.add('active');
            }
        }
    }, [channelsState, currentChannel, dispatch]);

    const handleMenuItemClick = (event, channel) => {
        dispatch(setChannel(channel));
    };

    const openModal = () => setModalOpenState(true);
    const closeModal = () => setModalOpenState(false);

    const checkIfFormValid = () => channelAddState && channelAddState.name && channelAddState.description;

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!checkIfFormValid()) return;

        const key = push(channelsRef).key;

        const newChannel = {
            id: key,
            name: channelAddState.name,
            description: channelAddState.description,
            isPrivateChat : false,
            created_by: {
                name: user.displayName,
                avatar: user.photoURL
            }
        };
        setLoadingState(true);
        try {
            await set(ref(realTimeDb, `channels/${key}`), newChannel);
            setChannelAddState({ name: '', description: '' });
            closeModal();
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingState(false);
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setChannelAddState((currentState) => ({
            ...currentState,
            [name]: value
        }));
    };

    return (
        <>
            <MenuList style={{ marginTop: '35px' }} className='color' ref={menuRef}>
                <MenuItem style={{ fontSize: '17px' }}>
                    <IconButton style={{ color: 'white' }}>
                        <SyncAltIcon />
                    </IconButton>
                    <Typography variant="body1">Channels ({channelsState.length})</Typography>
                </MenuItem>
                {/* Displaying Channels */}
                {channelsState.map((channel) => (
                    <MenuItem
                        key={channel.id}
                        data-channel-id={channel.id}
                        className={`menu-item ${currentChannel?.id === channel.id ? 'active' : ''}`}
                        onClick={(event) => handleMenuItemClick(event, channel)}
                    >
                        <Typography variant="body1">{"#" + channel.name}</Typography>
                    </MenuItem>
                ))}
                <MenuItem onClick={openModal}>
                    <IconButton style={{ color: 'white' }}>
                        <AddIcon />
                    </IconButton>
                    <Typography variant="body1">ADD</Typography>
                </MenuItem>
            </MenuList>
            <Modal open={modalOpenState} onClose={closeModal}>
                <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: 2, boxShadow: 24 }}>
                    <Typography variant="h6" component="h2">Create Channel</Typography>
                    <Box component="form" onSubmit={onSubmit} sx={{ mt: 2 }}>
                        <TextField
                            name="name"
                            value={channelAddState.name}
                            onChange={handleInput}
                            label="Channel Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            placeholder='Enter Channel Name'
                        />
                        <TextField
                            name="description"
                            value={channelAddState.description}
                            onChange={handleInput}
                            label="Channel Description"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            placeholder='Enter Channel Description'
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<CheckIcon />}
                                type="submit"
                                disabled={isLoadingState}
                            >
                                Save
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<CancelIcon />}
                                onClick={closeModal}
                                sx={{ ml: 2 }}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default Channels;
