import React from "react";
import firebase from "firebase/app";

function ChatMessage(props) {
    function edit() {
        const newVal = prompt(
            "What would you like to change this message to?",
            props.messageText
        );

        const DocRef = firebase
            .firestore()
            .collection("messages")
            .doc(props.object.id);

        DocRef.get()
            .then(function (doc) {
                if (doc.exists) {
                    const saved = doc.data();
                    if (newVal != null) {
                        saved.text = newVal;
                    }
                    DocRef.set(saved);
                } else {
                    console.log("No such document!");
                }
            })
            .catch(function (error) {
                console.log("Error getting document:", error);
            });
    }
    return (
        <div className="Message">
            <div className="leftMessage">
                <img
                    className="chatProfileImage"
                    src={props.chatImg}
                    alt="profile"
                />
                <div className="messageText">
                    <div className="userName">{props.userName}</div>
                    {props.messageText}
                </div>
            </div>
            <button className="editMessage" onClick={edit}>
                <b> &lt; &gt;</b>
            </button>
            <button className="deleteMessage" onClick={props.deleteMessage}>
                ✖
            </button>
        </div>
    );
}

export default ChatMessage;
