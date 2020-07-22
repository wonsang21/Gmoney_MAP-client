import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  SignInBtn: {
    flexGrow: 1,
  },
}));

const Header = (props) => {
  console.log('Header props', props);
  const { isSignIn, signInHandler } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            GMONEY-MAP
          </Typography>
          {isSignIn ? (
            <div>
              <Button
                component={Link}
                to="/"
                size="large"
                className={classes.menuButton}
                color="inherit"
              >
                홈
              </Button>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Mypage</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <Button
                component={Link}
                to="/"
                size="large"
                className={classes.menuButton}
                color="inherit"
              >
                홈
              </Button>
              <Button
                component={Link}
                to="/signin"
                size="large"
                className={classes.menuButton}
                color="inherit"
              >
                로그인
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Header);
