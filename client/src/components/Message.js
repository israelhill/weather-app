import React from 'react';
import './Message.css';

/**
 * Functional component representing a simple plain text success/failure message.
 * isError prop controls the text color of the message
 */
export default (props) => {
    const RED = '#c0392b';
    const GREEN = '#2ecc71';
    return (
        <div className="messageContainer">
            <p style={{color: props.isError ? RED : GREEN}}>{props.message}</p>
        </div>
    );
}