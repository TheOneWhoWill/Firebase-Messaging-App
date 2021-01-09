import React from 'react';

function ChatRoom(userInfo) {
  const currentUser = userInfo.userInfo.currentUser;
  return (
    <div>
      <h2>ChatRoom</h2>
      <h3>User Email: {currentUser.email}</h3>
      <h3>User Display Name: {currentUser.displayName}</h3>
      <h3>User Picture: <img src={currentUser.photoURL} /></h3>
    </div>
  );
}

export default ChatRoom;