import React from 'react';

function ChatMessage(props) {
  return (
    <div className="Message">
      <img className="chatProfileImage" src={props.chatImg} alt="profile"/>
      <div className="messageText"><div className="userName">{props.userName}</div>{props.messageText}</div>
    </div>
  );
}

export default ChatMessage;