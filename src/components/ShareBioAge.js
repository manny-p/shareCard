import React, { useRef } from 'react';
import BioAge from './BioAge'; // Import the BioAge component

function ShareBiologicalAge() {
  const canvasRef = useRef(null);

  const handleShareChart = async () => {
    if (navigator.share) {
      try {
        // Get the chart as an image data URL
        const canvas = canvasRef.current;
        const dataUrl = canvas.toDataURL();

        // Share the chart image using Web Share API
        await navigator.share({
          text: 'Biological Age Chart',
          files: [new File([dataUrl], 'biological-age-chart.png', { type: 'image/png' })],
        });
      } catch (error) {
        console.error('Error sharing chart:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      try {
        const canvas = canvasRef.current;
        const dataUrl = canvas.toDataURL();

        const tempInput = document.createElement('input');
        tempInput.setAttribute('type', 'text');
        tempInput.setAttribute('value', dataUrl);
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        alert('Chart image copied to clipboard for manual sharing.');
      } catch (error) {
        console.error('Error copying chart image to clipboard:', error);
      }
    }
  };

  return (
      <div>
        <BioAge />
        <button onClick={handleShareChart}>Share Biological Age Chart</button>
        <canvas
            ref={canvasRef}
            width={400}
            height={200}
            style={{ display: 'none' }} // Hide the canvas element
        />
      </div>
  );
}

export default ShareBiologicalAge;
