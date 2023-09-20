import React, { useState } from 'react';
import BioAge from './BioAge';
import domtoimage from 'dom-to-image';

function ShareBioAgeV2() {
  const [sharing, setSharing] = useState(false);
  const [shareError, setShareError] = useState(null);

  const handleShareChart = async () => {
    setSharing(true);
    const bioAgeComponent = document.querySelector('.bio-age-container');

    if (bioAgeComponent) {
      try {
        const dataUrl = await domtoimage.toJpeg(bioAgeComponent, { bgcolor: 'white' });

        // Convert data URI to blob
        const dataURItoBlob = (dataURI) => {
          const byteString = atob(dataURI.split(',')[1]);
          const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
          const uint8Array = new Uint8Array(byteString.length);
          for (let i = 0; i < byteString.length; i++) {
            uint8Array[i] = byteString.charCodeAt(i);
          }
          return new Blob([uint8Array], { type: mimeString });
        };

        const blob = dataURItoBlob(dataUrl);
        const shareFile = new File([blob], 'biological-age.jpeg', { type: 'image/jpeg' });

        const shareData = {
          title: 'Biological Age Test',
          text: 'This is a test of the Biological Age Chart component. Visit: https://example.com\ to find out yours.',
          files: [shareFile],
        };

        if (navigator.canShare && navigator.canShare(shareData)) {
          try {
            await navigator.share(shareData);
          } catch (shareError) {
            console.error('Error sharing BioAge component:', shareError);
          }
        } else {
          // Fallback for browsers that don't support Web Share API
          const downloadLink = document.createElement('a');
          downloadLink.href = dataUrl;
          downloadLink.download = 'biological-age.jpeg';
          downloadLink.style.display = 'none';
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          alert('Chart image downloaded for manual sharing.');
        }
      } catch (error) {
        console.error('Error capturing BioAge component:', error);
        setShareError('Error capturing the chart image.');
      } finally {
        setSharing(false);
      }
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

export default ShareBioAgeV2;
