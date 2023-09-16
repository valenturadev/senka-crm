import React from 'react';

const GizlilikSozlesmesi = () => {
    const pdfUrl = 'public/assets/docs/GizilikSozlesmesi.pdf'; // Replace with your PDF file URL

    return (
        <div>
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                Open PDF
            </a>
        </div>
    );
};

export default GizlilikSozlesmesi;
