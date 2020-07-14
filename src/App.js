import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/utils/Header';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MyPage from './pages/Mypage';
import Map from './pages/Map';
import StoreInfo from './components/store/StoreInfo';

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
    //
  }, []);

  return (
    <div>
      <Switch>
        <Router>
          <Route
            path="/"
            render={() => (
              <Header isSignIn={isSignIn} signInHandler={signInHandler} />
            )}
          />
          <Route
            exact
            path="/signin"
            render={() => <SignIn signInHandler={signInHandler} />}
          />
          <Route exact path="/signup" render={() => <SignUp />} />
          <Route exact path="/mypage" render={() => <MyPage />} />
          <Route path="/" render={() => <Map />} />
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
        </Router>
      </Switch>
    </div>
  );
};

export default App;
