import React from 'react';

const Loader = ({ isLoading }) => {
    if (!isLoading) return null;
    return (
        <div id="loader" className="d-flex justify-content-center align-items-center flex-column">
            <p>Loading...</p>
        </div>
    )
}

export default Loader
