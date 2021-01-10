import React, { useRef, useState } from 'react';
import ChatMessage from './ChatMessage.js';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function ChatRoom(userInfo) {
  const dummy = useRef();
  const messagesRef = firebase.firestore().collection('messages');
  const currentUser = userInfo.userInfo.currentUser;
  const [formValue, setFormValue] = useState('');
  const query = messagesRef.orderBy('createdAt', 'desc').limit(25);
  const [messages] = useCollectionData(query, { idField: 'id' });

  const sendMessage = async (e) => {
    e.preventDefault();
    await messagesRef.add({
      text: formValue,
      user: currentUser.email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      photoURL: currentUser.photoURL
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="chatRoom">
      <h3>User Email: {currentUser.email}</h3>
      <div className="messagesContainer">
        {messages && messages.reverse().map(msg => <ChatMessage userName={msg.user} chatImg={msg.photoURL} messageText={msg.text} />)}
        <span ref={dummy}></span>
      </div>
      <form>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} type="text"/>
        <button disabled={!formValue} onClick={sendMessage}>Send</button>
      </form>
    </div>
  );
}

export default ChatRoom;