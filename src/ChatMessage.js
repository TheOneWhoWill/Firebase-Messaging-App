import React from "react";

function Buttons(props) {
    return (
        <div>
            <button className="messageOptions" onClick={props.editMessage}>
                ✏️
            </button>
            <button className="messageOptions" onClick={props.deleteMessage}>
                ✖
            </button>
        </div>
    );
}

function ChatMessage(props) {
    const owner = props.currentUser.email === props.userName;
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
                {owner ? (
                    <Buttons
                        deleteMessage={props.deleteMessage}
                        editMessage={props.editMessage}
                    />
                ) : null}
            </div>
        </div>
    );
}

export default ChatMessage;
