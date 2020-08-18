import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import GoogleSignIn from '../components/auth/GoogleSignIn';

/*
헤더의 로그인버튼을 클릭하면 바디에 구글로그인, 카카오로그인 버튼이 출력된다. (완료)
박스안에 로그인 버튼 2개를 만든다. (완료)
클릭시 각각 컴포넌트로 이동한다.(완료)
*/

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    paddingTop: theme.spacing(8),
    backgroundColor: 'white',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  loginbtn: {
    margin: theme.spacing(3, 0, 0),
  },
}));

const SignIn = (props) => {
  console.log('SignIn props', props);
  const { signInHandler } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <GoogleSignIn signInHandler={signInHandler}></GoogleSignIn>
          <Button
            className={classes.loginbtn}
            fullWidth
            variant="contained"
            color="primary"
          >
            카카오 로그인
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default withRouter(SignIn);
