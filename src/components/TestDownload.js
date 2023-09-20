// noinspection SpellCheckingInspection

import React from 'react';
import domtoimage from 'dom-to-image';
import html2canvas from 'html2canvas';

function TestDownload() {

  const handleDownload = () => {
    const container = document.querySelector('.test-container');
    if (container) {
      domtoimage.toPng(container)
          .then((dataUrl) => {
            const downloadLink = document.createElement('a');
            downloadLink.href = dataUrl;
            downloadLink.download = 'test-image.png';
            downloadLink.style.display = 'none';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
          })
          .catch((error) => {
            console.error('Error generating image:', error);
          });
    }
  };


  return (
      <div>
        <div className="test-container" style={{ backgroundColor: 'blue', padding: '20px' }}>
          <h2>Test Container</h2>
          <div style={{ backgroundColor: 'red', width: '100px', height: '100px' }}>
            Test Canvas
          </div>
        </div>
        <button onClick={handleDownload}>Download</button>
      </div>
  );
}

export default TestDownload;
