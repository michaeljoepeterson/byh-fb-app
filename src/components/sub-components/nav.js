import React, {useState,useContext} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {AuthContext} from '../../contexts/auth-context';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {pageConfig} from '../../config';
import './styles/nav.css';

function Navbar(props){
    const navItems = pageConfig;
    const [navOpen,setNavOpen] = useState(false);
    const {isLoggedIn,logout,currentUser} = useContext(AuthContext);
    if(!isLoggedIn){
        return null;
    }

    const toggleNav = (open) => {
        setNavOpen(open);
    }

    let navList = (
        <div className="nav-drawer">
            <List>
                {navItems.map((page,i) => {
                    return (
                        <div key={page.name + i}>
                            <ListItemText className="nav-drawer-item">{page.name}</ListItemText>
                            <Divider />
                        </div>
                    );
                })}
            </List>
        </div>
    );

    return(
        <div className="nav-container">
            <AppBar position="fixed">
            <Toolbar>
                <IconButton onClick={(e) => toggleNav(true)} edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography className="nav-header" variant="h6">
                    BYH
                </Typography>
                <Button color="inherit" onClick={(e) => logout()}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={navOpen} onClose={(e) => toggleNav(false)}>
                {navList}
            </Drawer>
        </div>
    )
}

export default Navbar;