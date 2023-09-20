import React, { useState } from 'react';
import BioAge from './BioAge';
import domtoimage from 'dom-to-image';

function ShareBioAgeV2() {
  const [sharing, setSharing] = useState(false);
  const [shareError, setShareError] = useState(null);

  const handleShareChart = async () => {
    setSharing(true);
    try {
      const bioAgeComponent = document.querySelector('.bio-age-container');

      if (bioAgeComponent) {
        // Use domtoimage to capture the BioAge component as an image
        const dataUrl = await domtoimage.toJpeg(bioAgeComponent, { quality: 0.95, bgcolor: 'white' });

        // Convert the data URL to a blob
        const response = await fetch(dataUrl);
        const blob = await response.blob();

        // Check if Web Share API is available and supports sharing files
        if (navigator.canShare && navigator.canShare({ files: [blob] })) {
          await navigator.share({
            text: 'Biological Age Chart',
            files: [blob]
          });
        } else {
          // Fallback for browsers that don't support Web Share API with files
          const downloadLink = document.createElement('a');
          downloadLink.href = dataUrl;
          downloadLink.download = 'biological-age-chart.jpeg';
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
        <div className="bio-age-container">
          <BioAge />
        </div>
        {shareError && <div className="error">{shareError}</div>}
        <button onClick={handleShareChart} disabled={sharing}>
          {sharing ? 'Sharing...' : 'Share Biological Age Chart'}
        </button>
      </div>
  );
}

export default ShareBioAgeV2;
