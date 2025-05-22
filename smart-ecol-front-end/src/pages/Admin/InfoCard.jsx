import React from 'react';
import './css/dashboard.css';

const InfoCard = ({ title, count, color }) => {
    const borderStyle = {
        borderLeft: `6px solid ${color}`,
    };

    return (
        <div className="info-card" style={borderStyle}>
            <h3>{title}</h3>
            <p>{count}</p>
        </div>
    );
};

export default InfoCard;