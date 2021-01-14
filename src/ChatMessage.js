import React from 'react';

function ChatMessage(props) {
  return (
    <div className="Message">
      <div class="leftMessage">
        <img className="chatProfileImage" src={props.chatImg} alt="profile"/>
        <div className="messageText"><div className="userName">{props.userName}</div>{props.messageText}</div>
      </div>
      <button className="deleteMessage" onClick={props.deleteMessage}>✖</button>
    </div>
  );
}

export default ChatMessage;