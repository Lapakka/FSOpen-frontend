import React from 'react';

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }
  if (type === 'success') {
    return ( 
      <div className="success">
        {message}
      </div>
    );
  } else if (type === 'error') {
    return ( 
      <div className="error">
        {message}
      </div>
    );
  } else {
    return ( 
      <div className="note">
        {message}
      </div>
    );
  }
}

export default Notification;