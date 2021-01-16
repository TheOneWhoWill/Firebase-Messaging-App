import React, { useRef, useState } from "react";
import ChatMessage from "./ChatMessage.js";
import firebase from "firebase/app";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

function ChatRoom(userInfo) {
  const dummy = useRef();
  const messagesRef = firebase.firestore().collection("messages");
  const currentUser = userInfo.userInfo.currentUser;
  const [formValue, setFormValue] = useState("");
  const query = messagesRef.orderBy("createdAt", "desc").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });

  const sendMessage = async (e) => {
    console.log(currentUser);
    e.preventDefault();
      await messagesRef.add({
        text: formValue,
        user: currentUser.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        photoURL: currentUser.photoURL,
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
      setFormValue("");
      dummy.current.scrollIntoView({ behavior: "smooth" });
  };
  
  function edit(msg) {
    const newVal = prompt("What would you like to change this message to?", msg.text);

    const DocRef = firebase.firestore().collection("messages").doc(msg.id);

    DocRef.get().then(function (doc) {if (doc.exists) {const saved = doc.data();if (newVal != null) {saved.text = newVal;}DocRef.set(saved);} else {console.log("No such document!");}}).catch(function (error) {console.log("Error getting document:", error);});
  }

  function deleteMessage(msg) {
    messagesRef.doc(msg.id).delete();
  }

  return (
    <div className="chatRoom">
      <div className="messagesContainer">
        {messages && messages.reverse().map((msg) => (
          <ChatMessage
            currentUser={currentUser}
            deleteMessage={() => deleteMessage(msg)}
            editMessage={() => edit(msg)}
            userName={msg.user}
            chatImg={msg.photoURL}
            messageText={msg.text}
            object={msg}
          />))}
        <span ref={dummy}></span>
      </div>
      <div className="formContainer">
        <form>
          <input className="inputBar" value={formValue} onChange={(e) => setFormValue(e.target.value)} type="text"/>
          <button className="sendButton" disabled={!formValue} onClick={sendMessage}>Send</button>
        </form>
      </div>
    </div>
  );
}

export default ChatRoom;
