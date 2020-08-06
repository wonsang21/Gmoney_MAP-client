import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import { GoogleLogin } from 'react-google-login';
import dotenv from 'dotenv';
/*
oauth 2.0을 통해서 구글로그인을 구현한다.
구글로그인 버튼을 클릭시 google객체를 실행한다. (완료)
서버에 저장할 회원정보를 state값을 저장한다. (완료)
서버에 회원정보가 담긴 state를 전송한다. (시작전)
구글로그인 성공후 메인화면에 로그인으로 상태변경을 한다. (완료)
access token이 만료가 되면 refresh token을 발급받아야한다. (미완료)
*/

dotenv.config();

const useStyles = makeStyles((theme) => ({
  loginbtn: {
    margin: theme.spacing(3, 0, 0),
    width: '100%',
    justifyContent: 'center',
  },
}));

const GoogleSingIn = (props) => {
  console.log('GoogleSignIn props', props);
  const { signInHandler } = props;
  const [userInfo, setUserInfo] = useState({
    userId: '',
    userName: '',
    provider: '',
  });

  const responseGoogle = (res) => {
    setUserInfo({
      userId: res.googleId,
      userName: res.profileObj.name,
      provider: 'google',
    });
    console.log('구글로그인 회원 정보', res);
    signInHandler(res.profileObj.email);
    props.history.push('/');
  };

  const classes = useStyles();

  return (
    <>
      <GoogleLogin
        className={classes.loginbtn}
        clientId={process.env.REACT_APP_Google}
        buttonText="구글 로그인"
        onSuccess={responseGoogle}
        onFailure={console.error}
        cookiePolicy="single_host_origin"
      />
    </>
  );
};

export default withRouter(GoogleSingIn);
