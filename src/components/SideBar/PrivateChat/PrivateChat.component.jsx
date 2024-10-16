import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MenuItem, MenuList, IconButton, Typography } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import { ref, onChildAdded, off } from "firebase/database";
import { realTimeDb } from '../../../server/firebase';
import { setChannel } from '../../../store/actioncreater';

const PrivateChat = () => {
    const [usersState, setUsersState] = useState([]);
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser);
    const currentChannel = useSelector(state => state.channel.currentChannel);
    const usersRef = ref(realTimeDb, "users");
    const menuRef = useRef(null);

    useEffect(() => {
        const usersListener = onChildAdded(usersRef, (snap) => {
            const user = snap.val();
            user.id = snap.key;
            user.name = user.displayName;
            user.isPrivateChat = true;

            setUsersState((currentState) => {
                const isAlreadyAdded = currentState.some((usr) => usr.id === user.id);
                if (!isAlreadyAdded) {
                    return [...currentState, user];
                }
                return currentState;
            });
        });

        return () => off(usersRef, 'child_added', usersListener);
    }, [usersRef]);

    const handleMenuItemClick = (event, user) => {
        const privateChannelId = generatePrivateChannelId(user.id);
        const privateChannel = {
            id: privateChannelId,
            name: user.name,
            isPrivateChat: true,
        };

        dispatch(setChannel(privateChannel));
    };

    const generatePrivateChannelId = (userId) => {
        return currentUser.uid < userId ? `${currentUser.uid}/${userId}` : `${userId}/${currentUser.uid}`;
    };

    const displayUsers = () => {
        if (usersState.length > 0) {
            return usersState
                .filter((user) => user.id !== currentUser.uid)
                .map((user) => {
                    const isActive = currentChannel && currentChannel.id === generatePrivateChannelId(user.id);

                    return (
                        <MenuItem
                            key={user.id}
                            onClick={(event) => handleMenuItemClick(event, user)}
                            sx={{
                                color : 'white',
                                backgroundColor: isActive ? '#1164A3' : null,
                                fontWeight: isActive ? 'bold' : 'normal',
                                transition: 'background-color 0.3s ease',
                                '&:hover': {
                                    backgroundColor: isActive ? '#1164A3' : null
                                }
                            }}
                        >
                            <Typography variant="body1">{"@" + user.name}</Typography>
                        </MenuItem>
                    );
                });
        }
    };

    return (
        <>
            <MenuList style={{ marginTop: '35px' }} ref={menuRef}>
                <MenuItem style={{ fontSize: '17px' }}>
                    <IconButton style={{ color: 'white' }}>
                        <MailIcon />
                    </IconButton>
                    <Typography variant="body1" color={'white'}>Chat ({usersState.length - 1})</Typography>
                </MenuItem>
                {displayUsers()}
            </MenuList>
        </>
    );
};

export default PrivateChat;
