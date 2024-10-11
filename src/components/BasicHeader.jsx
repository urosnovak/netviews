import React from 'react';
import "../css/BasicHeader.css";

const BasicHeader = (props) => {
    return (
        <div className="basic-header">
            <div className="basic-title__large">
                {props.text}
                <div className="basic-title__small">
                    {props.text}
                </div>
            </div>
        </div>
    )
}

export default BasicHeader;