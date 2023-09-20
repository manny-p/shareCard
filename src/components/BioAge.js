import React from 'react';

function BioAge() {
  // Generate random data for the graph (you can replace this with your own data)
  const randomData = Array.from({ length: 6 }, () => Math.floor(Math.random() * 50));

  // Calculate SVG chart dimensions
  const svgWidth = 400;
  const svgHeight = 200;
  const margin = { top: 20, right: 20, bottom: 20, left: 40 };
  const chartWidth = svgWidth - margin.left - margin.right;
  const chartHeight = svgHeight - margin.top - margin.bottom;

  // Calculate x and y scales
  const xScale = (index) => (index / (randomData.length - 1)) * chartWidth;
  const yScale = (value) => (1 - value / 50) * chartHeight;

  return (
      <div className="bio-age-container">
        <h2>Biological Age</h2>
        <h3>Random Graph</h3>
        <svg width={svgWidth} height={svgHeight}>
          {/* Draw lines connecting data points */}
          {randomData.map((value, index) => (
              index < randomData.length - 1 && (
                  <line
                      key={`line-${index}`}
                      x1={margin.left + xScale(index)}
                      y1={margin.top + chartHeight - yScale(value)}
                      x2={margin.left + xScale(index + 1)}
                      y2={margin.top + chartHeight - yScale(randomData[index + 1])}
                      stroke="green"
                  />
              )
          ))}
          {/* Draw data points */}
          {randomData.map((value, index) => (
              <circle
                  key={`point-${index}`}
                  cx={margin.left + xScale(index)}
                  cy={margin.top + chartHeight - yScale(value)}
                  r={4}
                  fill="green"
              />
          ))}
        </svg>
      </div>
  );
}

export default BioAge;
