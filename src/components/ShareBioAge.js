import React, { useState } from 'react';
import BioAge from './BioAge';
import domtoimage from 'dom-to-image';

function ShareBioAge() {
  const [sharing, setSharing] = useState(false);
  const [shareError, setShareError] = useState(null);

  const handleShareChart = () => {
    setSharing(true);
    const bioAgeComponent = document.querySelector('.bio-age-container');

    if (bioAgeComponent) {
      domtoimage.toJpeg(bioAgeComponent, {
        bgcolor: 'white',
      })
          .then((dataUrl) => {
            if (navigator.share) {
              // Share the chart image using Web Share API
              navigator.share({
                text: 'Biological Age Chart',
                files: [new File([dataUrl], 'biological-age.jpeg', { type: 'image/jpeg' })],
              }).catch((error) => {
                console.error('Error sharing BioAge component:', error);
              });
            } else {
              // Fallback for browsers that don't support Web Share API
              // Create a temporary anchor element for downloading the image
              const downloadLink = document.createElement('a');
              downloadLink.href = dataUrl;
              downloadLink.download = 'biological-age-chart.jpeg';
              downloadLink.style.display = 'none';

              // Append the anchor element to the document body
              document.body.appendChild(downloadLink);

              // Trigger a click event on the anchor to initiate the download
              downloadLink.click();

              // Remove the anchor element from the DOM
              document.body.removeChild(downloadLink);

              alert('Chart image downloaded for manual sharing.');
            }
            setSharing(false);
          })
          .catch((error) => {
            console.error('Error capturing BioAge component:', error);
            setShareError('Error capturing the chart image.');
            setSharing(false);
          });
    } else {
      setShareError('Error: The BioAge component could not be found.');
      setSharing(false);
    }
  };

  return (
      <div>
        <div className="bio-age-container">
          <BioAge />
        </div>
        {shareError && <div className="error">{shareError}</div>}
        <button onClick={handleShareChart} disabled={sharing}>
          {sharing ? 'Sharing...' : 'Share Biological Age Chart'}
        </button>
        {shareError && <div className="error">{shareError}</div>}
      </div>
  );
}

export default ShareBioAge;
