import React from 'react';
import ChatRoom from './ChatRoom';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

firebase.initializeApp({
  apiKey: "AIzaSyBSjsp5Lf1iNdIzqabsPwvXD9h2iduiTao",
  authDomain: "hackathon-f9508.firebaseapp.com",
  databaseURL: "https://hackathon-f9508.firebaseio.com",
  projectId: "hackathon-f9508",
  storageBucket: "hackathon-f9508.appspot.com",
  messagingSenderId: "904109010127",
  appId: "1:904109010127:web:574a246f36bcbc505c9bba"
})

const auth = firebase.auth();

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
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
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

export default App;
