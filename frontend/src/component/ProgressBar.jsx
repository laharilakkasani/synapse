import React from 'react';

const ProgressBar = ({ current, total }) => {
    const percentage = (current / total) * 100;
    return (
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;