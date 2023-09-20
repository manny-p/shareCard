import React, { useState } from 'react';
import BioAge from './BioAge';
import html2canvas from 'html2canvas';

function ShareBiologicalAge() {
  const [sharing, setSharing] = useState(false);
  const [shareError, setShareError] = useState(null);

  const handleShareChart = async () => {
    setSharing(true);
    setShareError(null);

    try {
      const bioAgeComponent = document.querySelector('.bio-age-container');

      if (bioAgeComponent) {
        // Use html2canvas to capture the BioAge component as an image
        const canvasImage = await html2canvas(bioAgeComponent);

        // Convert the captured image to a data URL
        const dataUrl = canvasImage.toDataURL('image/png');

        // Check if Web Share API is available
        if (navigator.share) {
          // Share the chart image using Web Share API
          await navigator.share({
            text: 'Biological Age Chart',
            files: [new File([dataUrl], 'biological-age.png', { type: 'image/png' })],
          });
        } else {
          // Fallback for browsers that don't support Web Share API
          // Create a temporary anchor element for downloading the image
          const downloadLink = document.createElement('a');
          downloadLink.href = dataUrl;
          downloadLink.download = 'biological-age-chart.png';
          downloadLink.style.display = 'none';
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);

          alert('Chart image downloaded for manual sharing.');
        }
      } else {
        setShareError('Error: The BioAge component could not be found.');
      }
    } catch (error) {
      console.error('Error capturing BioAge component:', error);
      setShareError('Error capturing the chart image.');
    } finally {
      setSharing(false);
    }
  };

  return (
      <div>
        <button onClick={handleShareChart} disabled={sharing}>
          {sharing ? 'Sharing...' : 'Share Biological Age Chart'}
        </button>
        {shareError && <div className="error">{shareError}</div>}
        <div className="bio-age-container">
          <BioAge />
        </div>
      </div>
  );
}

export default ShareBiologicalAge;
