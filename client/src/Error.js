import React from 'react';

const Error = ({display, message}) => {
    return (
        <div className="error" style={{opacity:display?'100%':'0'}}>
            <h1 className="error-message">
                {message}
            </h1>
        </div>
    );
}



export default Error;
