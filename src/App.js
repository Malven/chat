import React, { useState } from 'react';
import Nav from './Nav';
import Channel from './Channel';
import { firebase } from './firebase';
import { useAuth } from './useAuth';
import { Router, Redirect } from '@reach/router';

function App() {
  const user = useAuth();

  return user ? (
    <div className="App">
      <Nav user={user} />
      <Router>
        <Channel path="channel/:channelId" user={user} />
        {/* <Redirect from="/" to="channel/general" /> */}
      </Router>
    </div>
  ) : (
    <Login />
  );
}

function Login() {
  const [authError, setAuthError] = useState(null);

  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      setAuthError(error);
    }
  };

  return (
    <div className="Login">
      <h1>Chat!</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>
      {authError && (
        <div>
          <p>Sorry, there was a problem</p>
          <p>{authError.message}</p>
          <p>Please try again</p>
        </div>
      )}
    </div>
  );
}

export default App;
