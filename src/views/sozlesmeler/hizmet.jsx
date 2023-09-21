import React from 'react';

const HizmetSozlesmesi = () => {
    const pdfUrl = 'public/assets/docs/GizilikSozlesmesi.pdf'; // Replace with your PDF file URL

    return (
        <div>
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                Open PDF
            </a>
        </div>
    );
};

export default HizmetSozlesmesi;
