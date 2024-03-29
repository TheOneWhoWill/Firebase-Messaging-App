import React from 'react';
import ChatRoom from './ChatRoom';
import firebase from 'firebase/app';
import 'firebase/auth';
import './firebase.js';
import { useAuthState } from 'react-firebase-hooks/auth';

const auth = firebase.auth();

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="header">
        <h2>React Messaging App</h2>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom userInfo={auth}/> : <SignIn />}
      </section>

    </div>
  );
}

//Sign In and Out Fuctions

function SignIn() {

  const signInWithGoogle = () => {
    const GoogleProvider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(GoogleProvider);
  }

  return (
    <div className="socialLogin">
      <button type="button" onClick={signInWithGoogle} className="sign-in google">
        <img width="27" height="27" src="https://ai.devoteam.com/wp-content/uploads/sites/91/2018/05/google-logo-icon-png-transparent-background.png" alt="G"/>
        <p>Sign in with Google</p>
      </button>
    </div>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

export default App;