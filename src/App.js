import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/header/Header';
import SignIn from './pages/SignIn';
import MyPage from './pages/Mypage';
import Map from './pages/Map';
import StoreInfo from './components/store/StoreInfo';

/*
Header를 연결한다. (완성)
localstoarge에 access token 있으면 로그인이 유지가 된다. (미완료)
Map을 연결한다. (미완성)
Mypage를 연결한다. (미완성)
StoreInfo를 연결한다. (미완성)
*/

const App = () => {
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
    <div>
      <Router>
        <Header isSignIn={isSignIn} signInHandler={signInHandler} />
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
      </Router>
    </div>
  );
};

export default App;
