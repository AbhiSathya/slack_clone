import { Drawer, List } from '@mui/material';
import UserInfoComponent from './UserInfo/UserInfo.component';
import Channels from './Channels/Channels.component';
import PrivateChat from './PrivateChat/PrivateChat.component';
const SideBar = () => {
    return (
        <Drawer
            sx={{
                '& .MuiDrawer-paper': {
                    width: 280,
                    border: 'none',
                    backgroundColor: '#4c3c4c',
                    fontSize: '1.2rem',
                    overflowY: 'scroll',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <List>
                <UserInfoComponent />
                <Channels />
                <PrivateChat />
            </List>
        </Drawer>
    );
};

export default SideBar;
