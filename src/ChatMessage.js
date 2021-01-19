import React from "react";

function ChatMessage(props) {
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
      <div>
        <button className="messageOptions" onClick={props.editMessage}>
          ✏️
        </button>
        <button className="messageOptions" onClick={props.deleteMessage}>
          ✖
        </button>
      </div>
    </div>
  );
}

export default ChatMessage;