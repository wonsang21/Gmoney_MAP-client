import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Header from './components/header/Header';
import SignIn from './pages/SignIn';
import MyPage from './pages/Mypage';
import Map from './pages/Map';
import StoreInfo from './components/store/StoreInfo';

/*
Header와 route들의 사이즈 조정한다. (완성)
Header를 연결한다. (완성)
localstoarge에 access token 있으면 로그인이 유지가 된다. (미완료)
Map을 연결한다. (완성)
Mypage를 연결한다. (미완성)
StoreInfo를 연결한다. (미완성)
*/

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    margin: '0px auto',
  },
  route: {
    width: '100%',
    flex: 1,
  },
}));

const App = () => {
  const classes = useStyles();
  const [isSignIn, setIsSignIn] = useState(false);
  const [user, setUser] = useState({
    userId: null,
  });

  const signInHandler = (id) => {
    if (!isSignIn) {
      setUser({
        userId: id,
      });
    }
    setIsSignIn(!isSignIn);
  };

  // 렌더링하자마자 실행해야 할 것들을 넣는다. (ex.서버와 통신)
  useEffect(() => {
    // 로그인유지를 위해 토큰을 서버에 보내서 해당유저의 정보를 받아온다.
  }, []);

  return (
    <Router>
      <div className={classes.root}>
        <div>
          <Header isSignIn={isSignIn} signInHandler={signInHandler} />
        </div>

        <div className={classes.route}>
          <Switch>
            <Route exact path="/" render={() => <Map />} />
            <Route
              path="/signin"
              render={() => <SignIn signInHandler={signInHandler} />}
            />
            <Route path="/mypage" render={() => <MyPage />} />
            <Route
              path="/storeinfo"
              render={() => (
                <StoreInfo
                  isSignIn={isSignIn}
                  user={user}
                  signInHandler={signInHandler}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
